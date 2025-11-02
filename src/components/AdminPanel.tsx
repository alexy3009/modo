import React, { useState, useEffect, useRef } from 'react';
import {
  Home,
  Plus,
  Package,
  MessageSquare,
  Settings,
  LogOut,
  X,
  BarChart3,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Image as ImageIcon,
  Globe,
  Eye,
} from 'lucide-react';
import { AnalyticsService } from '../lib/analytics';
import {
  Product,
  ContactInquiry,
  SiteMetrics,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getContactInquiries,
  getSiteMetrics,
  updateInquiryStatus,
  updateSiteMetrics,
  signOut,
  uploadImage,
  deleteContactInquiry,
  getProductCoverImage,
  callTranslationApi,
} from '../lib/api'
import { useToast } from './ToastContainer';
import { Language, getTranslatedProductField } from '../lib/i18n';

/* ----------------------- helper за превод ----------------------- */
async function translateFields(
  lang: 'en' | 'el',
  fields: { name?: string | null; description?: string | null; dimensions?: string | null }
): Promise<{ name?: string; description?: string; dimensions?: string }> {
  // Използваме централизираната функция за извикване на Translation API
  const result = await callTranslationApi(lang, fields);
  return result;
}

/* ----------------------- типове за форма/БД ----------------------- */
type ProductFormState = Omit<Product, 'id' | 'created_at' | 'updated_at'> & {
  id?: string;              // за edit
  imageFiles: File[];       // нови файлове (UI-only)
  imagesToDelete: string[]; // за премахване (UI-only)
};

type DbProductPayload = {
  name: string;
  category: Product['category'];
  description: string | null;
  price: string;
  show_price: boolean;
  dimensions: string | null;
  image_urls: string[] | null;
  featured: boolean;
  translations: NonNullable<Product['translations']>;
};

/* Подготвя чист payload за БД (само реални колони) */
function toDbProductPayload(
  form: ProductFormState,
  finalImageUrls: string[],
  translations: NonNullable<Product['translations']>
): DbProductPayload {
  // пазим BG като основа в top-level колоните
  const bgName = translations.bg?.name || form.name || '';
  const bgDesc = (translations.bg?.description ?? form.description) ?? null;
  const bgDims = (translations.bg?.dimensions ?? form.dimensions) ?? null;

  return {
    name: bgName,
    category: form.category,
    description: bgDesc,
    price: form.price,
    show_price: form.show_price,
    dimensions: bgDims,
    image_urls: finalImageUrls.length ? finalImageUrls : null,
    featured: form.featured,
    translations
  };
}

interface AdminPanelProps {
  language: Language;
  onClose: () => void;
  onSignOut: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ language, onClose, onSignOut }) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'products' | 'inquiries' | 'metrics' | 'analytics'>('products');

  const [products, setProducts] = useState<Product[]>([]);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [siteMetrics, setSiteMetrics] = useState<SiteMetrics | null>(null);

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductFormState | null>(null);
  const [analyticsData, setAnalyticsData] = useState<any>(null);

  const [selectedTranslationLang, setSelectedTranslationLang] = useState<Language>(language || 'bg');
  const [currentImagePreviews, setCurrentImagePreviews] = useState<string[]>([]);

  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ type: 'product' | 'inquiry'; id: string } | null>(null);

  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);
  const [isViewInquiryModalOpen, setIsViewInquiryModalOpen] = useState(false);

  const [loading, setLoading] = useState(false);


  const initialNewProductState: ProductFormState = {
    name: '',
    category: 'divani',
    description: null,
    price: 'По запитване',
    show_price: false,
    dimensions: null,
    image_urls: [],
    featured: false,
    translations: { bg: {}, en: {}, el: {} },
    imageFiles: [],
    imagesToDelete: [],
  };

  const fetchAllData = async () => {
    setLoading(true);
    await Promise.all([loadProducts(), loadInquiries(), loadSiteMetrics(), loadAnalytics()]);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // превюта на изображения
  useEffect(() => {
    if (editingProduct) {
      const existingImageUrls = editingProduct.image_urls || [];
      const newFilePreviews = editingProduct.imageFiles.map(file => URL.createObjectURL(file));
      setCurrentImagePreviews([...existingImageUrls, ...newFilePreviews]);
    } else {
      setCurrentImagePreviews([]);
    }
  }, [editingProduct]);

  const loadProducts = async () => {
    const productsData = await getProducts();
    setProducts(productsData);
  };

  const loadInquiries = async () => {
    const inquiriesData = await getContactInquiries();
    setInquiries(inquiriesData);
  };

  const loadSiteMetrics = async () => {
    const metrics = await getSiteMetrics();
    setSiteMetrics(metrics);
  };

  const loadAnalytics = async () => {
    try {
      const analytics = await AnalyticsService.generateAnalyticsReport();
      setAnalyticsData(analytics);
    } catch (error) {
      console.error('Error loading analytics:', error);
    }
  };

  const handleAddProductClick = () => {
    setEditingProduct(initialNewProductState);
    setSelectedTranslationLang('bg');
    setIsProductModalOpen(true);
  };

  const handleEditProductClick = (product: Product) => {
    console.log('Editing product - original featured value:', product.featured, typeof product.featured);
    setEditingProduct({
      ...product,
      imageFiles: [],
      imagesToDelete: [],
      translations: {
        bg: product.translations?.bg || {},
        en: product.translations?.en || {},
        el: product.translations?.el || {},
      }
    });
    setSelectedTranslationLang('bg');
    setIsProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setIsProductModalOpen(false);
    setEditingProduct(null);
    setCurrentImagePreviews([]);
  };

  const handleProductFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (!editingProduct) return;

    if (name.startsWith('translation_')) {
      const [_, lang, field] = name.split('_'); // translation_bg_name
      // Позволяваме ръчно редактиране на всички езици

      setEditingProduct(prev => ({
        ...prev!,
        translations: {
          ...prev?.translations,
          [lang]: {
            ...prev?.translations?.[lang as Language],
            [field]: value,
          },
        },
      }));
    } else {
      setEditingProduct(prev => ({
        ...prev!,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingProduct) return;
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setEditingProduct(prev => ({
        ...prev!,
        imageFiles: [...(prev?.imageFiles || []), ...filesArray],
      }));
    }
  };

  const handleRemoveImage = (imageUrl: string, isNewFile: boolean) => {
    if (!editingProduct) return;

    if (isNewFile) {
      setEditingProduct(prev => ({
        ...prev!,
        imageFiles: prev!.imageFiles.filter(file => URL.createObjectURL(file) !== imageUrl),
      }));
    } else {
      setEditingProduct(prev => ({
        ...prev!,
        image_urls: prev!.image_urls?.filter(url => url !== imageUrl) || [],
        imagesToDelete: [...(prev?.imagesToDelete || []), imageUrl],
      }));
    }
  };

  /* ----------------- submit с авто-превод и чист payload ----------------- */
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    // Debug: Log the featured status before submission
    console.log('Submitting product with featured status:', editingProduct.featured);
    console.log('Full editing product data:', editingProduct);

    setLoading(true);
    try {
      // 1) Качване на нови изображения
      const uploadedImagePaths: string[] = [];
      for (const file of editingProduct.imageFiles) {
        const path = await uploadImage(file);
        if (path) uploadedImagePaths.push(path);
      }

      const finalImageUrls = [
        ...(editingProduct.image_urls || []),
        ...uploadedImagePaths,
      ].filter(url => !editingProduct.imagesToDelete.includes(url));

      // 2) Преводи от формата (ръчно въведени)
      const baseTranslations = {
        bg: {
          name: editingProduct.translations?.bg?.name || '',
          description: editingProduct.translations?.bg?.description || null,
          dimensions: editingProduct.translations?.bg?.dimensions || null,
        },
        en: {
          name: editingProduct.translations?.en?.name || '',
          description: editingProduct.translations?.en?.description || null,
          dimensions: editingProduct.translations?.en?.dimensions || null,
        },
        el: {
          name: editingProduct.translations?.el?.name || '',
          description: editingProduct.translations?.el?.description || null,
          dimensions: editingProduct.translations?.el?.dimensions || null,
        },
      } as NonNullable<Product['translations']>;

      const translations = baseTranslations;

      // 3) Чист payload само с БД колони
      const payload = toDbProductPayload(editingProduct, finalImageUrls, translations);

      // Debug: Log the final payload
      console.log('Final payload being sent to API:', payload);

      // 4) Запис
      let resultProduct: Product | null;
      if (editingProduct.id) {
        resultProduct = await updateProduct(editingProduct.id, payload);
        showToast(
          resultProduct ? 'success' : 'error',
          resultProduct ? 'Успех!' : 'Грешка!',
          resultProduct ? 'Продуктът е обновен успешно.' : 'Неуспешно обновяване на продукта.'
        );
      } else {
        resultProduct = await createProduct(payload as any);
        showToast(
          resultProduct ? 'success' : 'error',
          resultProduct ? 'Успех!' : 'Грешка!',
          resultProduct ? 'Продуктът е добавен успешно.' : 'Неуспешно добавяне на продукта.'
        );
      }

      if (resultProduct) {
        await loadProducts();
        handleCloseProductModal();
      }
    } catch (error) {
      console.error('Error saving product:', error);
      showToast('error', 'Грешка!', 'Възникна грешка при запазване на продукта.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewInquiry = (inquiry: ContactInquiry) => {
    setSelectedInquiry(inquiry);
    setIsViewInquiryModalOpen(true);
  };

  const handleCloseInquiryModal = () => {
    setIsViewInquiryModalOpen(false);
    setSelectedInquiry(null);
  };

  const confirmDeleteItem = (type: 'product' | 'inquiry', id: string) => {
    setItemToDelete({ type, id });
    setIsConfirmDeleteModalOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!itemToDelete) return;

    setLoading(true);
    try {
      if (itemToDelete.type === 'product') {
        const success = await deleteProduct(itemToDelete.id);
        showToast(
          success ? 'success' : 'error',
          success ? 'Успех!' : 'Грешка!',
          success ? 'Продуктът е изтрит успешно.' : 'Неуспешно изтриване на продукта.'
        );
        if (success) await loadProducts();
      } else if (itemToDelete.type === 'inquiry') {
        const success = await deleteContactInquiry(itemToDelete.id);
        showToast(
          success ? 'success' : 'error',
          success ? 'Успех!' : 'Грешка!',
          success ? 'Запитването е изтрито успешно.' : 'Неуспешно изтриване на запитването.'
        );
        if (success) await loadInquiries();
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      showToast('error', 'Грешка!', 'Възникна грешка при изтриване.');
    } finally {
      setLoading(false);
      setIsConfirmDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  const handleUpdateInquiryStatus = async (id: string, status: ContactInquiry['status']) => {
    setLoading(true);
    try {
      const updated = await updateInquiryStatus(id, status);
      showToast(
        updated ? 'success' : 'error',
        updated ? 'Успех!' : 'Грешка!',
        updated ? 'Статусът на запитването е обновен.' : 'Неуспешно обновяване на статуса.'
      );
      if (updated) await loadInquiries();
    } catch (error) {
      console.error('Error updating inquiry status:', error);
      showToast('error', 'Грешка!', 'Възникна грешка при обновяване на статуса.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSiteMetrics = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!siteMetrics) return;

    setLoading(true);
    try {
      const updated = await updateSiteMetrics({
        years_experience: siteMetrics.years_experience,
        satisfied_clients: siteMetrics.satisfied_clients,
        handmade_percentage: siteMetrics.handmade_percentage,
      });
      showToast(
        updated ? 'success' : 'error',
        updated ? 'Успех!' : 'Грешка!',
        updated ? 'Метриките са обновени успешно.' : 'Неуспешно обновяване на метриките.'
      );
      if (updated) await loadSiteMetrics();
    } catch (error) {
      console.error('Error updating site metrics:', error);
      showToast('error', 'Грешка!', 'Възникна грешка при обновяване на метриките.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      const { error } = await signOut();
      if (error) {
        showToast('error', 'Грешка!', 'Неуспешно излизане.');
      } else {
        onSignOut();
      }
    } catch (error) {
      console.error('Error signing out:', error);
      showToast('error', 'Грешка!', 'Възникна грешка при излизане.');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryName = (category: Product['category']) => {
    switch (category) {
      case 'divani': return 'Дивани';
      case 'spalni': return 'Спални';
      case 'stolove': return 'Столове';
      case 'masi': return 'Маси';
      default: return category;
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
        <div className="flex flex-col items-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
          <p className="text-lg">Зареждане...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-2xl font-semibold">Admin Panel</h2>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
              activeTab === 'products' ? 'bg-gray-700 text-blue-400' : 'hover:bg-gray-700'
            }`}
          >
            <Package className="mr-3" size={20} /> Продукти
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
              activeTab === 'inquiries' ? 'bg-gray-700 text-blue-400' : 'hover:bg-gray-700'
            }`}
          >
            <MessageSquare className="mr-3" size={20} /> Запитвания
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
              activeTab === 'metrics' ? 'bg-gray-700 text-blue-400' : 'hover:bg-gray-700'
            }`}
          >
            <Settings className="mr-3" size={20} /> Метрики на сайта
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
              activeTab === 'analytics' ? 'bg-gray-700 text-blue-400' : 'hover:bg-gray-700'
            }`}
          >
            <BarChart3 className="mr-3" size={20} /> Статистики
          </button>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center px-4 py-2 rounded-md text-red-400 hover:bg-gray-700 transition-colors"
          >
            <LogOut className="mr-3" size={20} /> Изход
          </button>
          <button
            onClick={onClose}
            className="w-full flex items-center px-4 py-2 mt-2 rounded-md text-gray-400 hover:bg-gray-700 transition-colors"
          >
            <Home className="mr-3" size={20} /> Към сайта
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {activeTab === 'products' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">Управление на продукти</h3>
              <button
                onClick={handleAddProductClick}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center"
              >
                <Plus size={20} className="mr-2" /> Добави нов продукт
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b text-left">Име</th>
                    <th className="py-2 px-4 border-b text-left">Категория</th>
                    <th className="py-2 px-4 border-b text-left">Цена</th>
                    <th className="py-2 px-4 border-b text-left">Препоръчан</th>
                    <th className="py-2 px-4 border-b text-left">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="py-2 px-4 border-b">
                        {getTranslatedProductField(product, 'name')}
                      </td>
                      <td className="py-2 px-4 border-b">{getCategoryName(product.category)}</td>
                      <td className="py-2 px-4 border-b">
                        {product.show_price ? `${product.price} лв.` : 'По запитване'}
                      </td>
                      <td className="py-2 px-4 border-b">
                        {product.featured === true || product.featured === 1 ? 
                          <CheckCircle size={18} className="text-green-500" /> : 
                          <X size={18} className="text-red-500" />
                        }
                      </td>
                      <td className="py-2 px-4 border-b">
                        <img 
                          src={getProductCoverImage(product)} 
                          alt={getTranslatedProductField(product, 'name')} 
                          className="w-16 h-12 object-contain bg-gray-50 rounded-lg mr-2 inline-block border"
                          loading="lazy"
                        />
                        <button
                          onClick={() => handleEditProductClick(product)}
                          className="text-blue-500 hover:text-blue-700 mr-2"
                          title="Редактирай"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => confirmDeleteItem('product', product.id)}
                          className="text-red-500 hover:text-red-700"
                          title="Изтрий"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'inquiries' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Управление на запитвания</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b text-left">Име</th>
                    <th className="py-2 px-4 border-b text-left">Имейл</th>
                    <th className="py-2 px-4 border-b text-left">Телефон</th>
                    <th className="py-2 px-4 border-b text-left">Продукт</th>
                    <th className="py-2 px-4 border-b text-left">Съобщение</th>
                    <th className="py-2 px-4 border-b text-left">Статус</th>
                    <th className="py-2 px-4 border-b text-left">Дата</th>
                    <th className="py-2 px-4 border-b text-left">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inquiry) => (
                    <tr key={inquiry.id}>
                      <td className="py-2 px-4 border-b">{inquiry.name}</td>
                      <td className="py-2 px-4 border-b">{inquiry.email}</td>
                      <td className="py-2 px-4 border-b">{inquiry.phone || 'N/A'}</td>
                      <td className="py-2 px-4 border-b">
                        {inquiry.products ? inquiry.products.name : 'Общо запитване'}
                      </td>
                      <td className="py-2 px-4 border-b max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                        {inquiry.message}
                      </td>
                      <td className="py-2 px-4 border-b">
                        <select
                          value={inquiry.status}
                          onChange={(e) => handleUpdateInquiryStatus(inquiry.id, e.target.value as ContactInquiry['status'])}
                          className="p-1 border rounded"
                        >
                          <option value="new">Ново</option>
                          <option value="in_progress">В процес</option>
                          <option value="completed">Завършено</option>
                        </select>
                      </td>
                      <td className="py-2 px-4 border-b">
                        {new Date(inquiry.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4 border-b">
                        <button
                          onClick={() => handleViewInquiry(inquiry)}
                          className="text-blue-500 hover:text-blue-700 mr-2"
                          title="Преглед"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => confirmDeleteItem('inquiry', inquiry.id)}
                          className="text-red-500 hover:text-red-700"
                          title="Изтрий"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Статистики на сайта</h3>
            {analyticsData ? (
              <div className="space-y-8">
                {/* Основни метрики */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-blue-800">Общо посетители</h4>
                    <p className="text-3xl font-bold text-blue-600">{analyticsData.total_visitors}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-green-800">Уникални посетители</h4>
                    <p className="text-3xl font-bold text-green-600">{analyticsData.unique_visitors}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-purple-800">Прегледи на страници</h4>
                    <p className="text-3xl font-bold text-purple-600">{analyticsData.page_views}</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold text-orange-800">Bounce Rate</h4>
                    <p className="text-3xl font-bold text-orange-600">{analyticsData.bounce_rate.toFixed(1)}%</p>
                  </div>
                </div>

                {/* Топ страници */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">Най-посещавани страници</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg">
                      <thead>
                        <tr>
                          <th className="py-2 px-4 border-b text-left">Страница</th>
                          <th className="py-2 px-4 border-b text-left">Посещения</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analyticsData.top_pages.slice(0, 5).map((page: any, index: number) => (
                          <tr key={index}>
                            <td className="py-2 px-4 border-b">{page.title}</td>
                            <td className="py-2 px-4 border-b">{page.views}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Устройства */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">Разпределение по устройства</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{analyticsData.device_breakdown.desktop}</p>
                      <p className="text-gray-600">Desktop</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{analyticsData.device_breakdown.mobile}</p>
                      <p className="text-gray-600">Mobile</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">{analyticsData.device_breakdown.tablet}</p>
                      <p className="text-gray-600">Tablet</p>
                    </div>
                  </div>
                </div>

                {/* Conversion Funnel */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">Conversion Funnel</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white rounded">
                      <span>Посещения на началната страница</span>
                      <span className="font-bold">{analyticsData.conversion_funnel.homepage_visits}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded">
                      <span>Прегледани продукти</span>
                      <span className="font-bold">{analyticsData.conversion_funnel.products_viewed}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded">
                      <span>Изпратени запитвания</span>
                      <span className="font-bold">{analyticsData.conversion_funnel.inquiries_sent}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-100 rounded">
                      <span className="font-semibold">Conversion Rate</span>
                      <span className="font-bold text-green-600">{analyticsData.conversion_funnel.conversion_rate.toFixed(2)}%</span>
                    </div>
                  </div>
                </div>

                {/* Refresh бутон */}
                <div className="text-center">
                  <button
                    onClick={loadAnalytics}
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Обнови статистиките
                  </button>
                </div>
              </div>
            ) : (
              <p>Зареждане на статистики...</p>
            )}
          </div>
        )}

        {activeTab === 'metrics' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Метрики на сайта</h3>
            {siteMetrics ? (
              <form onSubmit={handleUpdateSiteMetrics} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Години опит</label>
                  <input
                    type="number"
                    name="years_experience"
                    value={siteMetrics.years_experience}
                    onChange={(e) => setSiteMetrics({ ...siteMetrics, years_experience: parseInt(e.target.value) })}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Доволни клиенти</label>
                  <input
                    type="number"
                    name="satisfied_clients"
                    value={siteMetrics.satisfied_clients}
                    onChange={(e) => setSiteMetrics({ ...siteMetrics, satisfied_clients: parseInt(e.target.value) })}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Процент ръчна изработка</label>
                  <input
                    type="number"
                    name="handmade_percentage"
                    value={siteMetrics.handmade_percentage}
                    onChange={(e) => setSiteMetrics({ ...siteMetrics, handmade_percentage: parseInt(e.target.value) })}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Запази промените
                </button>
              </form>
            ) : (
              <p>Зареждане на метрики...</p>
            )}
          </div>
        )}
      </div>

      {/* Product Add/Edit Modal */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">
                {editingProduct.id ? 'Редактирай продукт' : 'Добави нов продукт'}
              </h3>
              <button onClick={handleCloseProductModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="space-y-6">
              {/* Основни полета */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Категория</label>
                  <select
                    name="category"
                    value={editingProduct.category}
                    onChange={handleProductFormChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="divani">Дивани</option>
                    <option value="spalni">Спални</option>
                    <option value="stolove">Столове</option>
                    <option value="masi">Маси</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Цена</label>
                  <input
                    type="text"
                    name="price"
                    value={editingProduct.price || ''}
                    onChange={handleProductFormChange}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="show_price"
                    checked={editingProduct.show_price}
                    onChange={handleProductFormChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm font-medium text-gray-700">Покажи цена</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={editingProduct.featured}
                    onChange={handleProductFormChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm font-medium text-gray-700">Препоръчан продукт</label>
                </div>
              </div>

              {/* Преводи */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <Globe size={20} className="mr-2" /> Преводи
                </h4>

                <div className="flex space-x-2 mb-4">
                  {['bg', 'en', 'el'].map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setSelectedTranslationLang(lang as Language)}
                      className={`px-4 py-2 rounded-md transition-colors ${
                        selectedTranslationLang === lang ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Име на продукта ({selectedTranslationLang.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      name={`translation_${selectedTranslationLang}_name`}
                      value={editingProduct.translations?.[selectedTranslationLang]?.name || ''}
                      onChange={handleProductFormChange}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      required={selectedTranslationLang === 'bg'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Описание ({selectedTranslationLang.toUpperCase()})
                    </label>
                    <textarea
                      name={`translation_${selectedTranslationLang}_description`}
                      value={editingProduct.translations?.[selectedTranslationLang]?.description || ''}
                      onChange={handleProductFormChange}
                      rows={3}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Размери ({selectedTranslationLang.toUpperCase()})
                    </label>
                    <input
                      type="text"
                      name={`translation_${selectedTranslationLang}_dimensions`}
                      value={editingProduct.translations?.[selectedTranslationLang]?.dimensions || ''}
                      onChange={handleProductFormChange}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>

              {/* Изображения */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <ImageIcon size={20} className="mr-2" /> Изображения
                </h4>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {currentImagePreviews.map((url, index) => (
                    <div key={index} className="relative w-full h-24 rounded-lg overflow-hidden shadow-md bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-1">
                      <img 
                        src={url} 
                        alt={`Product image ${index + 1}`} 
                        className="w-full h-full object-contain" 
                        loading="eager"
                        decoding="async"
                        fetchpriority="high"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(url, url.startsWith('blob:'))}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600"
                        title="Премахни изображение"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCloseProductModal}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Откажи
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2"></div>
                      Запазване...
                    </>
                  ) : (
                    'Запази'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Inquiry Modal */}
      {isViewInquiryModalOpen && selectedInquiry && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-gray-800">Детайли на запитването</h3>
              <button onClick={handleCloseInquiryModal} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Име</label>
                  <p className="text-lg text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedInquiry.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Имейл</label>
                  <p className="text-lg text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedInquiry.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                  <p className="text-lg text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedInquiry.phone || 'Не е посочен'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Дата</label>
                  <p className="text-lg text-gray-900 bg-gray-50 p-3 rounded-lg">
                    {new Date(selectedInquiry.created_at).toLocaleDateString('bg-BG', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Продукт</label>
                <p className="text-lg text-gray-900 bg-gray-50 p-3 rounded-lg">
                  {selectedInquiry.products ? selectedInquiry.products.name : 'Общо запитване'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => {
                    const newStatus = e.target.value as ContactInquiry['status'];
                    setSelectedInquiry({ ...selectedInquiry, status: newStatus });
                    handleUpdateInquiryStatus(selectedInquiry.id, newStatus);
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white"
                >
                  <option value="new">Ново</option>
                  <option value="in_progress">В процес</option>
                  <option value="completed">Завършено</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Съобщение</label>
                <div className="bg-gray-50 p-4 rounded-lg border max-h-40 overflow-y-auto">
                  <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">{selectedInquiry.message}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={handleCloseInquiryModal}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
              >
                Затвори
              </button>
              <button
                onClick={() => {
                  confirmDeleteItem('inquiry', selectedInquiry.id);
                  handleCloseInquiryModal();
                }}
                className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Изтрий запитването
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {isConfirmDeleteModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-sm text-center">
            <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Потвърдете изтриването</h3>
            <p className="text-gray-600 mb-6">
              Сигурни ли сте, че искате да изтриете този {itemToDelete?.type === 'product' ? 'продукт' : 'запитване'}? Това действие не може да бъде отменено.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setIsConfirmDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
              >
                Откажи
              </button>
              <button
                onClick={handleDeleteConfirmed}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                disabled={loading}
              >
                {loading ? 'Изтриване...' : 'Изтрий'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
const Modal = {
  currentImages: [],
  currentIndex: 0,
  show: (images, index = 0) => {
    Modal.currentImages = images;
    Modal.currentIndex = index;
    const modal = $('#image-modal');
    const img = $('#modal-image');
    if (modal && img) {
      img.src = images[index];
      modal.classList.add('active');
    }
  },
  hide: () => {
    const modal = $('#image-modal');
    if (modal) modal.classList.remove('active');
  },
  next: () => {
    Modal.currentIndex = (Modal.currentIndex + 1) % Modal.currentImages.length;
    $('#modal-image').src = Modal.currentImages[Modal.currentIndex];
  },
  prev: () => {
    Modal.currentIndex = (Modal.currentIndex - 1 + Modal.currentImages.length) % Modal.currentImages.length;
    $('#modal-image').src = Modal.currentImages[Modal.currentIndex];
  }
};

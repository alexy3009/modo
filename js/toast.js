const Toast = {
  show: (type, title, message) => {
    const container = $('#toast-container');
    if (!container) return;
    
    const toast = createElement('div', `toast ${type}`, `
      <div class="toast-content">
        <strong>${title}</strong>
        <p>${message}</p>
      </div>
    `);
    
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
  },
  success: (title, message) => Toast.show('success', title, message),
  error: (title, message) => Toast.show('error', title, message),
  warning: (title, message) => Toast.show('warning', title, message),
  info: (title, message) => Toast.show('info', title, message)
};

/* eslint-disable */

export const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
  console.log('Alert hidden');
};

// type is 'success' or 'error'
export const showAlert = (type, msg, time = 7) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  console.log(`Alert shown: ${type} - ${msg}`);
  window.setTimeout(hideAlert, time * 1000);
};

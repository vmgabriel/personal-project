(function($){
  $(window).scroll(function() {
    let scrollTop = $(window).scrollTop();
    let headerLogo = document.getElementById('contentLogo');

    headerLogo.style['display'] = (scrollTop < 285) ? 'none' : 'flex';
  });

})(jQuery);


// Global Variables
const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


// Functional
const concatValue = (acc, curr) => acc + curr;

const getValue = (e) => e.value;
const getValueHtml = (e) => e.innerHTML;
const isDataClear = (e) => getValue(e).trim() == "";
const isEmailValid = (e) => emailRegex.test(getValue(e));
const clearValue = (e) => e.value = "";
const getMailTo = (email) => (subject) => (message) =>
      `mailto:${'vmgabriel96@gmail.com' + ',' + getValue(email)}
          ?subject=${encodeURIComponent(getValue(subject))}
          &body=${encodeURIComponent('Message from: '+ getValue(email) + '\n' + getValue(message))}`;
const isProject = (e) => !!e.content_data && e.content_data == 'projects';

const generateErrorDom = (e) => `<div class="alert-content"><h1>${e.title}</h1><p>${e.message}</p></div>`;

const deleteElementsInsideDiv = (e) => (e.firstChild) ? !!e.removeChild(e.firstChild) && deleteElementsInsideDiv(e) :  true ;

// ---------------- events --------------------------------
function menuNav() {
  let linksDom = document.getElementById('links');
  const isVisible = linksDom.style.display == 'block';

  linksDom.style['display'] = (isVisible) ? 'none' : 'block';
}

function changeIconDark() {
  let iconDom = document.getElementById('iconStyle');
  if ( iconDom.classList.contains('fa-moon') ) {
    iconDom.classList.remove('fa-moon');
    iconDom.classList.add('fa-sun');
  } else {
    iconDom.classList.remove('fa-sun');
    iconDom.classList.add('fa-moon');
  }
}

function changeStyleDark() {
  changeIconDark();
  changeTheme();
}

function changeTheme() {
  document.body.classList.toggle('dark');
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('dark-mode', 'true');
  } else {
    localStorage.setItem('dark-mode', 'false');
  }
}

function putClass(classStyle) {
  for (let theme of classStyle.themes) {
    let itemDom = document.getElementById(classStyle.item);
    if ( itemDom.classList.contains(theme) ) {
      itemDom.classList.remove(theme);
    } else {
      itemDom.classList.remove(theme);
      itemDom.classList.add(theme);
    }
  };
}

function openUrl(data) {
  window.open(data,"_self");
}

function sendMail() {
  let email = document.getElementById('ofData');
  let subject = document.getElementById('subjectData');
  let body = document.getElementById('bodyData');

  let dataErrors = [];

  // Verify that not clear data
  if (isDataClear(email) || !isEmailValid(email)) {
    dataErrors.push({
      title: 'Email No Valido',
      message: 'El Correo Aportado debe ser un correo electronico valido.'
    });
  }
  if (isDataClear(subject)) {
    dataErrors.push({
      title: 'Asunto No Valido',
      message: 'El Asunto debe contener datos validos.'
    });
  }
  if (isDataClear(body)) {
    dataErrors.push({
      title: 'Mensaje No Valido',
      message: 'El mensaje debe contener datos validos.'
    });
  }

  if (dataErrors.length > 0) {
    showErrorsOfSendEmail(dataErrors);
  } else {
    const title = 'Enviando Correo Electronico';
    const message = 'En estos momentos nos estamos vinculando a tu Gestor de correo electronico para que se envie el mensaje.';
    const urlPath = window.location.protocol + '//' + window.location.host;
    showMessage(title, message, urlPath);
    document.location.href = getMailTo(email)(subject)(body);
    clearValue(email);
    clearValue(subject);
    clearValue(body);
  }

}

function showErrorsOfSendEmail(errors) {
  let alertsArea = document.getElementById('alerts');
  deleteElementsInsideDiv(alertsArea);

  const dataDomError = errors.map(generateErrorDom);
  const allErrorsDom = dataDomError.reduce(concatValue);

  alertsArea.insertAdjacentHTML('beforeend', allErrorsDom);
  alertsArea.classList.remove('hide-block');
  alertsArea.classList.add('show-block');
}

function showMessage(title, message, url) {
  let dialog = document.getElementById('dialog');
  let titleDialog = document.getElementById('title-dialog');
  let contentDialog = document.getElementById('content-dialog');
  let urlDialog = document.getElementById('url-dialog');

  titleDialog.innerHTML = title;
  contentDialog.innerHTML = message;
  urlDialog.innerHTML = url;

  dialog.classList.remove('hide-block');
  dialog.classList.add('show-block-flex');
}

function messageClose() {
  let dialog = document.getElementById('dialog');
  let urlDialog = document.getElementById('url-dialog');

  dialog.classList.remove('show-block-flex');
  dialog.classList.add('hide-block');
  window.location.replace(getValueHtml(urlDialog));
}

if (localStorage.getItem('dark-mode') === 'true') {
  changeIconDark();
  document.body.classList.add('dark');
} else {
  changeIconDark();
  document.body.classList.remove('dark');
}

let body = document.querySelector('body');
let windowWidth = document.documentElement.clientWidth;

let menuBox = document.querySelector('.head-menu-box');
let menuButton = document.querySelector('.mobile-menu');
menuButton.addEventListener('click', function (e) {
    menuBox.classList.toggle('active');
});

if(windowWidth <= 992) {
    let button = document.createElement('a');
    button.className = "mobile-phone-button";
    button.setAttribute('href', 'tel:8-928-428-72-50');
    button.innerHTML = "<ion-icon name='call-outline'></ion-icon>";
    body.append(button);
}
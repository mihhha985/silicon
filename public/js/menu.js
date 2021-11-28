let menuBox = document.querySelector('.head-menu-box');
let menuButton = document.querySelector('.mobile-menu');
menuButton.addEventListener('click', function (e) {
    menuBox.classList.toggle('active');
});
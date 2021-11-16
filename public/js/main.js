let menuBox = document.querySelector('.head-menu-box');
let menuButton = document.querySelector('.mobile-menu');
menuButton.addEventListener('click', function (e) {
    menuBox.classList.toggle('active');
})


if (document.documentElement.clientWidth < 992) {
    let elements = document.querySelectorAll('.delivery-item')

    window.addEventListener('scroll', function () {
        let coord1 = elements[0].getBoundingClientRect();
        let coord2 = elements[1].getBoundingClientRect();
        let coord3 = elements[2].getBoundingClientRect();

        console.log(coord2);
        if (coord1.top > 0 && coord1.top < 150) {
            elements[0].classList.add('active');
            elements[1].classList.remove('active');
            elements[2].classList.remove('active');
        }
        if (coord1.top > 350) {
            elements[0].classList.remove('active');
        }

        if (coord2.top > 0 && coord2.top < 150) {
            elements[1].classList.add('active');
            elements[0].classList.remove('active');
            elements[2].classList.remove('active');
        }

        if (coord3.top < 150) {
            elements[2].classList.add('active');
            elements[0].classList.remove('active');
            elements[1].classList.remove('active');
        }
    })
}
/*
let form = document.getElementById('question-form');
let inputText = form.querySelectorAll('input[type="text"]');
let inputNumber = form.querySelectorAll('input[type="number"]');
let inputCheckbox = form.querySelector('input[type="checkbox"]');

form.addEventListener('focus', function (e) {
    let target = e.target;
    if(target.nodeName === 'INPUT'){
        target.value = '';
    }
}, true);

inputCheckbox.addEventListener('change', function (e) {
    if(this.checked) {
        for(let item of inputNumber){
            item.value = '';
            item.disabled = true;
        }
    }else{
        for(let item of inputNumber){
            item.disabled = false;
        }
    }
})

 */

let sr = ScrollReveal({
    distance:'60px',
    duration:2000,
    delay:200,
    reset:false,
});

sr.reveal('.title-box, .delivery-item, .advantages-container, .catalog-item, .voice-item');
sr.reveal('.headline, .question-container', {origin:'top'});
sr.reveal('.description-box-right', {origin:'right'});
sr.reveal('.description-box-left', {origin:'left'});
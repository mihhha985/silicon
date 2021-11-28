import {Modal} from './classes/modal.js';
let modal = new Modal();
let form = document.getElementById('question-form');
let inputText = form.querySelectorAll('input[type="text"]');
let inputNumber = form.querySelectorAll('input[type="number"]');
let inputCheckbox = form.querySelector('input[type="checkbox"]');
let inputSubmit = form.querySelector('input[type="submit"]');

inputCheckbox.addEventListener('change', function (e) {
    if(this.checked) {
        for(let item of inputNumber){
            item.value = '';
            item.disabled = true;
        }
    }else{
        for(let item of inputNumber){
            item.disabled = false;
            if(item.name === 'timeafter'){
                item.value = '9';
            }else if(item.name === 'timebefore'){
                item.value = '23';
            }else{
                item.value = '';
            }
        }
    }
})

form.addEventListener('submit', function(e){
    e.preventDefault();
    inputSubmit.disabled = true;
    let post = null;
    let name = inputText[0].value;
    let phone = inputText[1].value;
    let timeafter, timebefore;
    if(inputCheckbox.checked === true){
        timeafter = "9";
        timebefore = "23";
    }else{
        timeafter = inputNumber[0].value;
        timebefore = inputNumber[1].value;
    }
    post = {
        name:name,
        phone:phone,
        timeafter: timeafter,
        timebefore:timebefore
    }

    fetch('/question-send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(post)
    }).then(() => {
        modal.openVoiceForm('DIV');
    });
})

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
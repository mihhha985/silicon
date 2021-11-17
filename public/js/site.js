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
        let $body = $('body');
        let $box = $('<div class="full-item-box" />');
        let $close = $('<ion-icon class="full-item-close" name="close-circle-outline"></ion-icon>');
        let $modal = $('<div class="full-item" />');
        $modal.html('<ion-icon name="checkmark-circle-outline"></ion-icon><p>Ваше сообщение успешно отправленно!!!</p>');
        $body.append($modal, $box, $close);
        $body.css('overflow', 'hidden');
        if ($(window).width() > 480) {
            $modal.css({
                'width': '380px',
                'height': '280px'
            });
        } else {
            $modal.css({
                'width': '320px',
                'height': '200px'
            });
        }

        $close.on('click', function () {
            $(this).remove();
            $box.remove();
            $modal.remove();
            $body.css('overflow', '');
        });

        return false;
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
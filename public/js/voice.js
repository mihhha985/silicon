$('.voice-item').on('click', function(e){
    let $this = $(this);
    let $body = $('body')
    let $clone = $this.clone();
    let text = $this.data('text');
    let $box = $('<div class="full-item-box" />');
    let $close = $('<ion-icon class="full-item-close" name="close-circle-outline"></ion-icon>');
    $clone.find('p').text(text);
    $clone.addClass('full-item');
    $clone.removeClass('voice-item');
    $body.css('overflow', 'hidden');
    $body.append($clone, $box,  $close);
    if($(window).width() > 480){
        $clone.css({
            'width': '380px',
            'height': '480px'
        });
    }else{
        $clone.css({
            'width': '320px',
            'height': '420px'
        });
    }

    $close.on('click', function (){
        $(this).remove();
        $box.remove();
        $clone.remove();
        $body.css('overflow', '');
    })
});

$('#voice-form').on('submit', function (e){
    e.preventDefault();
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
})
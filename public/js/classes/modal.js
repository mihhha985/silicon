export class Modal{

   static clientWidth;
   static body;

   constructor() {
      Modal.clientWidth = document.documentElement.clientWidth;
      Modal.body  = document.querySelector('body');
   }

   static create(width, height, callback) {
      let box = document.createElement('div');
      let clone = document.createElement('div');
      let close = document.createElement('ion-icon');
      close.setAttribute('name', 'close-circle-outline');
      close.className = 'full-item-close';
      box.className = 'full-item-box';
      clone.classList.add('full-item');
      Modal.body.style.overflow = 'hidden';
      box.append(clone, close);
      Modal.body.append(box);

      setTimeout(() => {
         clone.style.width = width + 'px';
         clone.style.height = height + 'px';

         clone.addEventListener('transitionend', function handler() {
            clone.removeEventListener('transitionend', handler);
            callback(clone);
         });

         close.addEventListener('click', function(){
            this.remove();
            box.remove();
            clone.remove();
            Modal.body.style.overflow = '';
         });
      },10);
   }

   openVoiceItem() {
      let text = this.dataset.text;
      let name = this.dataset.name;
      let age = this.dataset.age;
      let width, height;

      let msg = `<span class="quote">"</span>
        <p>${text}</p>
        <ion-icon name="person-circle-outline" role="img" className="md hydrated" aria-label="person circle outline"></ion-icon>
        <h4>${name}, ${age} года</h4>`;

      if(Modal.clientWidth < 480){
         width = 320;
         height = 640;
      }else if(Modal.clientWidth > 480 && Modal.clientWidth < 992){
         width = 420;
         height = 600;
      }else{
         width = 680;
         height = 420;
      }

      Modal.create( width, height, clone => {
         clone.style.height = 'auto';
         clone.innerHTML = msg;
      });
   }

   openVoiceForm(e){
      if(typeof e === 'object') {
         e.preventDefault();
      }
      let msg = `<ion-icon name="checkmark-circle-outline"></ion-icon><p>Ваше сообщение успешно отправленно!!!</p>`;
      let width, height;
      if(Modal.clientWidth < 480){
         width = 300;
         height = 280;
      }else{
         width = 380;
         height = 320;
      }

      Modal.create( width, height, clone => {
         clone.innerHTML = msg;
      });

      return false;
   }
}
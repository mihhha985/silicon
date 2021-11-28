import {Modal} from './classes/modal.js';

let voiceItems  = document.querySelectorAll('.voice-item');
let form = document.getElementById('voice-form');
let modal = new Modal();
voiceItems.forEach(item => item.addEventListener('click', modal.openVoiceItem));
form.addEventListener('submit', modal.openVoiceForm);
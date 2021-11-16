const nodemailer = require("nodemailer");

class Mailer{
    constructor(desk, name, phone, message, model, ip) {
       this.desk = desk;
       this.name = name;
       this.phone = phone;
       this.message = message;
       this.model = model;
       this.ip = ip;
       this.transporter =  nodemailer.createTransport({
           host: "smtp.yandex.ua",
           port: 465,
           secure: true, // true for 465, false for other ports
           auth: {
               user: 'silicondollls', // generated ethereal user
               pass: 'xmbrjsghxjhmieyk', // generated ethereal password
           },
       });
    }

    getSubject(){
        if(this.desk == 1){
            return 'Предоплата';
        }else if(this.desk == 2){
            return 'Наложка';
        }else{
            return 'Без оплаты';
        }
    }

    getMessage(){
        return `<h3>Новая заявка</h3>
            <p>ФИО: ${this.name}<br />
            Телефон: ${this.phone}<br />
            Адрес: ${this.message}<br />
            Модель: ${this.model}<br />
            IP: ${this.ip}
            </p>`;
    }

    send() {
        this.transporter.sendMail({
            from: "silicondollls@yandex.ru",
            to: "barbie-gl@yandex.ru",
            subject: this.getSubject(),
            html: this.getMessage()
        });
    }
}

module.exports = Mailer;


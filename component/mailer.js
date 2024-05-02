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
				host: 'smtp.yandex.ru',
				port: 465,
				secure: true,
				auth: {
					user: 'mihhha985',
					pass: 'mxqpwejraivtwjcu',
				},
       });
    }

    getSubject(){
        if(this.desk == 1){
            return 'Предоплата';
        }else if(this.desk == 2){
            return 'Наложка';
        }else if(this.desk == 3){
            return 'Без оплаты';
        }else{
            return 'Вопрос'
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

    getQustionMessage(timeafter, timebefore){
        return `<h3>Новая заявка</h3>
            <p>ФИО: ${this.name}<br />
            Телефон: ${this.phone}<br />
            Время: с ${timeafter} до ${timebefore}
            </p>`;
    }

    send() {
        this.transporter.sendMail({
            from: "mihhha985@yandex.ru",
            to: "biketoff.m@yandex.ru",
            subject: this.getSubject(),
            html: this.getMessage()
        });
    }

    questionSend(timeafter, timebefore){
        this.transporter.sendMail({
            from: "mihhha985@yandex.ru",
            to: "biketoff.m@yandex.ru",
            subject: "Перезвони",
            html: this.getQustionMessage(timeafter, timebefore)
        });
    }


}

module.exports = Mailer;


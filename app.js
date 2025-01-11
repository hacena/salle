const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true })); // لتمكين استقبال بيانات النموذج
app.use(bodyParser.json());

// إعداد الـ SMTP لإرسال البريد
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your email.com', // استبدل بهذا بريدك الإلكتروني الفعلي
        pass: 'const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true })); // لتمكين استقبال بيانات النموذج
app.use(bodyParser.json());

// إعداد الـ SMTP لإرسال البريد
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ha2502ha@gmail.com', // استبدل بهذا بريدك الإلكتروني الفعلي
        pass: 'your-HA4141ha@'      // استبدل بهذا كلمة مرور البريد الإلكتروني الفعلي
    }
});

// مسار التسجيل
app.post('/signup', (req, res) => {
    const { email, password } = req.body;

    // إنشاء رابط التفعيل
    const verificationLink = `http://localhost:3000/verify?email=${email}`;

    // إعداد البريد الإلكتروني
    const mailOptions = {
        from: 'example-email@gmail.com',
        to: email,
        subject: 'تفعيل حسابك',
        text: `يرجى تفعيل حسابك باستخدام الرابط التالي: ${verificationLink}`
    };

    // إرسال البريد
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
        res.json({ success: true, message: 'تم إرسال رابط التفعيل بنجاح!' });
    });
});

// بدء السيرفر على المنفذ 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
HA4141ha@'      // استبدل بهذا كلمة مرور البريد الإلكتروني الفعلي
    }
});

// مسار التسجيل
app.post('/signup', (req, res) => {
    const { email, password } = req.body;

    // إنشاء رابط التفعيل
    const verificationLink = `http://localhost:3000/verify?email=${email}`;

    // إعداد البريد الإلكتروني
    const mailOptions = {
        from: 'example-email@gmail.com',
        to: email,
        subject: 'تفعيل حسابك',
        text: `يرجى تفعيل حسابك باستخدام الرابط التالي: ${verificationLink}`
    };

    // إرسال البريد
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
        res.json({ success: true, message: 'تم إرسال رابط التفعيل بنجاح!' });
    });
});

// بدء السيرفر على المنفذ 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

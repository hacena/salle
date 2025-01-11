const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// إعداد الـ SMTP لإرسال البريد
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ha2502ha@gmail.com', // بريدك الإلكتروني الفعلي
        pass: 'HA4141ha@'      // كلمة المرور الفعلية
    }
});

// إرسال رابط التفعيل
app.post('/sendVerificationEmail', (req, res) => {
    const { email } = req.body;
    const verificationLink = `http://localhost:3000/verify?email=${email}`;

    const mailOptions = {
        from: 'example-email@gmail.com',  // نفس البريد الفعلي
        to: email,
        subject: 'تفعيل حسابك',
        text: `يرجى تفعيل حسابك باستخدام الرابط التالي: ${verificationLink}`
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
        res.json({ success: true, message: 'تم إرسال الرابط بنجاح!' });
    });
});

// بدء السيرفر على المنفذ 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

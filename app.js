require('dotenv').config(); // لتحميل المتغيرات من .env
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
app.use(express.json());  // استخدم express.json بدلاً من body-parser

// تخزين المستخدمين في الذاكرة (يمكنك استبدال هذا بقاعدة بيانات مثل MongoDB لاحقًا)
const users = [];

// إعداد الـ SMTP لإرسال البريد
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,  // استخدام البريد من .env
        pass: process.env.EMAIL_PASS   // استخدام كلمة المرور من .env
    }
});

// صفحة التسجيل
app.post('/signup', (req, res) => {
    const { email, password } = req.body;

    // التأكد من أن البريد الإلكتروني غير مسجل مسبقًا
    if (users.find(user => user.email === email)) {
        return res.status(400).json({ message: 'البريد الإلكتروني مسجل مسبقًا!' });
    }

    // إضافة المستخدم إلى قاعدة البيانات (أو الذاكرة هنا)
    const newUser = { email, password, activated: false };
    users.push(newUser);

    // إرسال رابط التفعيل عبر البريد
    const verificationLink = `http://localhost:3000/verify?email=${email}`;

    const mailOptions = {
        from: process.env.EMAIL_USER,  // استخدام البريد من .env
        to: email,
        subject: 'تفعيل حسابك',
        text: `يرجى تفعيل حسابك باستخدام الرابط التالي: ${verificationLink}`
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
        res.json({ success: true, message: 'تم إرسال رابط التفعيل إلى بريدك الإلكتروني!' });
    });
});

// صفحة التفعيل
app.get('/verify', (req, res) => {
    const { email } = req.query;
    
    // العثور على المستخدم في الذاكرة (أو قاعدة البيانات)
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(404).json({ message: 'المستخدم غير موجود.' });
    }

    // تفعيل الحساب
    user.activated = true;

    res.json({ message: 'تم تفعيل حسابك بنجاح!' });
});

// بدء السيرفر على المنفذ 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

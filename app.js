const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
app.use(express.json());  // استخدم express.json بدلاً من body-parser
app.use(express.urlencoded({ extended: true }));  // لتعامل مع البيانات عبر form-data

// تخزين المستخدمين في الذاكرة (يمكنك استبدالها بقاعدة بيانات)
const users = [
    { name: 'أحمد', email: 'ahmed@example.com', password: '1234' },
    { name: 'محمد', email: 'mohamed@example.com', password: 'abcd' }
];

// إعداد الـ SMTP لإرسال البريد
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password'
    }
});

// إرسال رابط التفعيل
app.post('/sendVerificationEmail', (req, res) => {
    const { name, email, password } = req.body;

    // رابط التفعيل
    const verificationLink = `http://localhost:3000/verify?email=${email}`;

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'تفعيل حسابك',
        text: `مرحبًا ${name}،\n\nيرجى تفعيل حسابك باستخدام الرابط التالي: ${verificationLink}`
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
        res.json({ success: true, message: 'تم إرسال الرابط بنجاح!' });
    });
});

// تسجيل الدخول
app.post('/login', (req, res) => {
    const { identifier, password } = req.body;

    // البحث عن المستخدم باستخدام البريد الإلكتروني أو الاسم
    const user = users.find(u => (u.email === identifier || u.name === identifier) && u.password === password);

    if (user) {
        res.json({ success: true, message: 'تم تسجيل الدخول بنجاح!' });
    } else {
        res.status(400).json({ success: false, message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة!' });
    }
});

// بدء السيرفر على المنفذ 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

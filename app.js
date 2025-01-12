const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const PORT = 3000;

// إعداد Express لتقديم الملفات من مجلد 'public'
app.use(express.static('public'));

// إضافة middleware لمعالجة بيانات النموذج
app.use(express.urlencoded({ extended: true }));

// إعداد nodemailer لإرسال البريد
const transporter = nodemailer.createTransport({
    service: 'gmail', // يمكنك استخدام خدمة بريد أخرى مثل Outlook أو Yahoo
    auth: {
        user: 'ha2502ha@gmail.com', // بريدك الإلكتروني
        pass: 'ha2502HA@'   // كلمة المرور الخاصة ببريدك أو App Password
    }
});

// التعامل مع POST من التسجيل
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    // تحقق من البيانات المُدخلة
    if (!username || !email || !password) {
        return res.status(400).send('تأكد من ملء جميع الحقول.');
    }

    // إعداد محتوى رسالة البريد الإلكتروني
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'تأكيد تسجيلك',
        text: `مرحبًا ${username}!\n\nشكرًا لتسجيلك. هذه رسالة تأكيد للتسجيل.\n\nتحياتنا، فريق الدعم.`
    };

    try {
        // إرسال البريد الإلكتروني
        await transporter.sendMail(mailOptions);
        res.send(`تم التسجيل بنجاح! وتم إرسال بريد إلكتروني إلى: ${email}`);
    } catch (err) {
        console.error('خطأ في إرسال البريد:', err);
        res.status(500).send('حدث خطأ أثناء إرسال البريد الإلكتروني. يرجى المحاولة لاحقًا.');
    }
});

// بدء الخادم
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

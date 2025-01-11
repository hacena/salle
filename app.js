const express = require('express');
const app = express();
const PORT = 3000;

// إعداد Express لتقديم الملفات من مجلد 'public'
app.use(express.static('public'));

// إرسال الصفحة الرئيسية أو أي صفحة أخرى
app.get('/', (req, res) => {
    res.send('مرحبًا! الخادم يعمل الآن.');
});

// التعامل مع POST من التسجيل
app.post('/signup', (req, res) => {
    const { email, password } = req.body;
    // معالجة بيانات التسجيل
    res.send(`تم التسجيل بنجاح. البريد: ${email}`);
});

// بدء الخادم
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

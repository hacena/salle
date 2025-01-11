const express = require('express');
const bodyParser = require('body-parser'); // إضافة body-parser
const app = express();
const PORT = 3000;

// إعداد Express لتقديم الملفات من مجلد 'public'
app.use(express.static('public'));

// استخدام body-parser لتحليل البيانات الواردة من نموذج التسجيل
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// إرسال الصفحة الرئيسية أو أي صفحة أخرى
app.get('/', (req, res) => {
    res.send('مرحبًا! الخادم يعمل الآن.');
});

// التعامل مع POST من التسجيل
app.post('/signup', (req, res) => {
    const { email, password } = req.body;
    // معالجة بيانات التسجيل
    res.send(`تم التسجيل بنجاح. البريد: ${email} وكلمة المرور: ${password}`);
});

// بدء الخادم
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

# 💚 چلیں دیں - Donation Website

ایک مکمل donation website جہاں لوگ اپنا صدقہ و خیرات کر سکیں اور admin تمام donations کو دیکھ سکے۔

## 🌟 Features

### User Side (index.html)
- ✅ **Donation Form** - نام، ای میل، رقم، دعا، اور تبصرہ
- 📸 **Screenshot Upload** - Payment proof کے لیے
- 👀 **View Donations** - دوسروں کے صدقات دیکھیں
- 🔐 **Admin Icon** - Admin panel کے لیے

### Admin Side (admin-dashboard.html)
- 🔓 **Secure Login** - Email اور Password کے ساتھ
- 📊 **Statistics** - کل صدقات، رقم، اور عطا کنندگان
- 🔍 **Search Feature** - نام یا ای میل سے تلاش کریں
- ↕️ **Sort Options** - تازہ ترین، پرانے، اور رقم کے لحاظ سے
- 🖼️ **View Screenshots** - Modal میں payment screenshot دیکھیں
- 🗑️ **Delete Donations** - غلط entries حذف کریں

## 📁 Files

```
Let-s-donate/
├── index.html              # Home page - User donations
├── admin-login.html        # Admin login page (optional)
├── admin-dashboard.html    # Admin panel - View all donations
├── style.css              # Complete styling
├── script.js              # All functionality
└── README.md              # This file
```

## 🔐 Admin Credentials

```
Email: f598387k@gmail.com
Password: @3230342552435farooq
```

## 🚀 How to Use

### 1️⃣ User Side
- **Home page** پر جائیں (index.html)
- **Donation Form** بھریں:
  - نام
  - ای میل
  - رقم (روپے میں)
  - کس کی خیر کے لیے دعا
  - اپنا پیغام/تبصرہ
  - Payment screenshot
- **صدقہ جمع کریں** بٹن دبائیں
- ✅ صدقہ ریکارڈ ہو جائے گا

### 2️⃣ Admin Side
- **Home page** پر admin icon (🔐) دیکھیں
- Admin icon پر کلک کریں
- Email: `f598387k@gmail.com`
- Password: `@3230342552435farooq`
- **Admin Dashboard** میں تمام donations دیکھیں
- ✓ Statistics دیکھیں
- ✓ Donations تلاش اور sort کریں
- ✓ Payment screenshots دیکھیں
- ✓ غلط entries حذف کریں

## 💾 Data Storage

**Local Storage** میں data save ہوتا ہے (browser میں)

```javascript
- Donations array
- Admin login status
```

## 🎨 Design Features

- 🌈 **Gradient Backgrounds** - Beautiful colors
- 📱 **Responsive Design** - Mobile, tablet, desktop
- ⚡ **Fast Loading** - Optimized code
- 🎭 **User Friendly** - آسان اور سادہ interface
- 🌍 **Urdu Support** - اردو زبان میں

## 🔄 How It Works

### User Donation Flow
```
User fills form → Selects screenshot → Submits
     ↓
Data saved in Local Storage
     ↓
Appears on home page immediately
     ↓
Admin can see it in dashboard
```

### Admin Login Flow
```
Admin clicks icon → Enters credentials
     ↓
If correct → Redirect to admin-dashboard.html
     ↓
Can view all donations in table format
     ↓
Search, sort, view images, delete
```

## 🛠️ Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling (Gradients, Flexbox, Grid)
- **JavaScript (ES6)** - Functionality
- **Local Storage API** - Data persistence
- **File API** - Image upload

## 📝 Code Structure

### JavaScript Functions

**User Functions:**
```javascript
loadDonations()           // Load data from storage
saveDonations()           // Save data to storage
displayDonations()        // Show donations on page
openAdminLogin()          // Open admin modal
```

**Admin Functions:**
```javascript
checkAdminDashboardAccess()  // Verify admin access
displayAdminDashboard()      // Show all donations
viewImage()                  // Display screenshot
deleteDonation()             // Remove donation
logoutAdmin()                // Logout
```

## 🔒 Security Notes

⚠️ **Important:**
- Local Storage میں data browser میں save ہے
- Production کے لیے backend/database use کریں
- Password کو ہمیشہ محفوظ رکھیں
- HTTPS استعمال کریں

## 📱 Browser Support

- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## 🎯 Future Enhancements

- [ ] Backend database integration
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Export to Excel/PDF
- [ ] Multiple admin accounts
- [ ] Donation categories
- [ ] Analytics dashboard

## 📧 Contact

اگر کوئی مسئلہ ہو تو contact کریں:
**Email:** f598387k@gmail.com

---

**Made with ❤️ for Charity**

## 📄 License

This project is open source and free to use.

---

## 🎓 Learning Resources

اگر آپ یہ code سیکھنا چاہتے ہیں:

1. **HTML** - Form structure سمجھیں
2. **CSS** - Styling اور responsiveness
3. **JavaScript** - 
   - DOM manipulation
   - Event listeners
   - Local Storage API
   - File reading (FileReader API)

## ⭐ Credits

Created for: **Farooq Ahmad**
Website: Let's Donate - صدقہ کی ترغیب دیں

---

**Happy Donating! 🤝💚**

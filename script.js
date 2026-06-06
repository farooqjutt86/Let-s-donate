// Admin Credentials
const ADMIN_EMAIL = 'f598387k@gmail.com';
const ADMIN_PASSWORD = '@3230342552435farooq';

// Load donations from localStorage
function loadDonations() {
    const donations = localStorage.getItem('donations');
    return donations ? JSON.parse(donations) : [];
}

// Save donations to localStorage
function saveDonations(donations) {
    localStorage.setItem('donations', JSON.stringify(donations));
}

// Get admin auth status
function isAdminLoggedIn() {
    return localStorage.getItem('adminLoggedIn') === 'true';
}

// Check if admin is logged in on page load
function checkAdminAccess() {
    const adminIcon = document.querySelector('.admin-icon');
    if (!adminIcon) return;

    if (isAdminLoggedIn()) {
        // Redirect to admin dashboard
        window.location.href = 'admin-dashboard.html';
    }
}

// ===== INDEX PAGE FUNCTIONALITY =====

// Open Admin Login Modal
function openAdminLogin() {
    const modal = document.getElementById('adminLoginModal');
    if (modal) {
        modal.classList.add('show');
    }
}

// Close Admin Login Modal
function closeAdminLogin() {
    const modal = document.getElementById('adminLoginModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Admin Login Handler
if (document.getElementById('adminLoginForm')) {
    document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('adminEmail').value;
        const password = document.getElementById('adminPassword').value;

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            localStorage.setItem('adminLoggedIn', 'true');
            alert('✅ Login successful! Redirecting to Admin Panel...');
            window.location.href = 'admin-dashboard.html';
        } else {
            alert('❌ Invalid email or password!');
        }
    });
}

// Donation Form Handler
if (document.getElementById('donationForm')) {
    document.getElementById('donationForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const donorName = document.getElementById('donorName').value;
        const donorEmail = document.getElementById('donorEmail').value;
        const amount = document.getElementById('amount').value;
        const duaFor = document.getElementById('duaFor').value;
        const comment = document.getElementById('comment').value;
        const screenshotFile = document.getElementById('screenshot').files[0];

        if (!screenshotFile) {
            alert('❌ براہ کرم اسکرین شاٹ اپ لوڈ کریں');
            return;
        }

        // Convert image to base64
        const reader = new FileReader();
        reader.onload = function(e) {
            const donation = {
                id: Date.now(),
                donorName,
                donorEmail,
                amount,
                duaFor,
                comment,
                screenshot: e.target.result, // base64 image
                timestamp: new Date().toLocaleString('ur-PK'),
                date: new Date()
            };

            let donations = loadDonations();
            donations.unshift(donation); // Add to beginning
            saveDonations(donations);

            alert('✅ شکریہ! آپ کا صدقہ ریکارڈ ہو گیا۔');
            document.getElementById('donationForm').reset();
            displayDonations();
        };
        reader.readAsDataURL(screenshotFile);
    });
}

// Display Donations on Index Page
function displayDonations() {
    const donationsList = document.getElementById('donationsList');
    if (!donationsList) return;

    const donations = loadDonations();

    if (donations.length === 0) {
        donationsList.innerHTML = '<p style="text-align: center; color: #95a5a6;">ابھی کوئی صدقہ نہیں ہوا</p>';
        return;
    }

    donationsList.innerHTML = donations.map(donation => `
        <div class="donation-card">
            <div class="donation-header">
                <span class="donation-name">👤 ${donation.donorName}</span>
                <span class="donation-amount">Rs. ${donation.amount}</span>
            </div>
            <div class="donation-info">📧 ${donation.donorEmail}</div>
            <div class="donation-info">📅 ${donation.timestamp}</div>
            <div class="donation-dua">🤲 دعا کے لیے: ${donation.duaFor}</div>
            ${donation.comment ? `<div class="donation-comment">💬 "${donation.comment}"</div>` : ''}
        </div>
    `).join('');
}

// ===== ADMIN LOGIN PAGE FUNCTIONALITY =====

// Admin Login on separate page
if (document.getElementById('adminLoginForm') && window.location.pathname.includes('admin-login')) {
    document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('adminEmail').value;
        const password = document.getElementById('adminPassword').value;
        const messageDiv = document.getElementById('loginMessage');

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            localStorage.setItem('adminLoggedIn', 'true');
            messageDiv.textContent = '✅ Login successful! Redirecting...';
            messageDiv.classList.add('success');
            setTimeout(() => {
                window.location.href = 'admin-dashboard.html';
            }, 1500);
        } else {
            messageDiv.textContent = '❌ Invalid email or password!';
            messageDiv.classList.add('error');
            messageDiv.classList.remove('success');
        }
    });
}

// ===== ADMIN DASHBOARD FUNCTIONALITY =====

// Check admin access on dashboard
function checkAdminDashboardAccess() {
    if (!isAdminLoggedIn()) {
        alert('⛔ براہ کرم پہلے لاگ ان کریں');
        window.location.href = 'index.html';
    }
}

// Logout Admin
function logoutAdmin() {
    localStorage.removeItem('adminLoggedIn');
    alert('👋 آپ لاگ آؤٹ ہو گئے');
    window.location.href = 'index.html';
}

// Display Admin Dashboard
function displayAdminDashboard() {
    const donations = loadDonations();

    // Update Stats
    document.getElementById('totalDonations').textContent = donations.length;
    
    let totalAmount = 0;
    donations.forEach(d => {
        totalAmount += parseInt(d.amount);
    });
    document.getElementById('totalAmount').textContent = 'Rs. ' + totalAmount.toLocaleString();
    
    const uniqueDonors = new Set(donations.map(d => d.donorEmail)).size;
    document.getElementById('totalDonors').textContent = uniqueDonors;

    // Display Donations Table
    const tableBody = document.getElementById('donationsTableBody');
    const noDonations = document.getElementById('noDonations');

    if (donations.length === 0) {
        tableBody.innerHTML = '';
        noDonations.style.display = 'block';
        return;
    }

    noDonations.style.display = 'none';
    tableBody.innerHTML = donations.map((donation, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${donation.donorName}</td>
            <td>${donation.donorEmail}</td>
            <td><strong>Rs. ${donation.amount}</strong></td>
            <td>${donation.duaFor}</td>
            <td>${donation.comment || '-'}</td>
            <td>
                <button class="view-img-btn" onclick="viewImage('${donation.id}')">
                    📸 دیکھیں
                </button>
            </td>
            <td>${donation.timestamp}</td>
            <td>
                <button class="delete-btn" onclick="deleteDonation(${donation.id})">
                    🗑️ حذف کریں
                </button>
            </td>
        </tr>
    `).join('');
}

// View Image in Modal
function viewImage(donationId) {
    const donations = loadDonations();
    const donation = donations.find(d => d.id == donationId);

    if (donation) {
        const modal = document.getElementById('imageModal');
        const img = document.getElementById('modalImage');
        img.src = donation.screenshot;
        modal.classList.add('show');
    }
}

// Close Image Modal
function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('show');
}

// Delete Donation
function deleteDonation(donationId) {
    if (confirm('کیا آپ یہ صدقہ ریکارڈ حذف کرنا چاہتے ہیں?')) {
        let donations = loadDonations();
        donations = donations.filter(d => d.id !== donationId);
        saveDonations(donations);
        displayAdminDashboard();
        alert('✅ حذف کر دیا گیا');
    }
}

// Search Functionality
if (document.getElementById('searchInput')) {
    document.getElementById('searchInput').addEventListener('keyup', function() {
        const searchTerm = this.value.toLowerCase();
        const donations = loadDonations();
        
        const filtered = donations.filter(d => 
            d.donorName.toLowerCase().includes(searchTerm) ||
            d.donorEmail.toLowerCase().includes(searchTerm)
        );

        displayFilteredDonations(filtered);
    });
}

// Sort Functionality
if (document.getElementById('sortBy')) {
    document.getElementById('sortBy').addEventListener('change', function() {
        let donations = loadDonations();

        if (this.value === 'latest') {
            donations.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (this.value === 'oldest') {
            donations.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else if (this.value === 'highest') {
            donations.sort((a, b) => parseInt(b.amount) - parseInt(a.amount));
        } else if (this.value === 'lowest') {
            donations.sort((a, b) => parseInt(a.amount) - parseInt(b.amount));
        }

        displayFilteredDonations(donations);
    });
}

// Display Filtered Donations
function displayFilteredDonations(filtered) {
    const tableBody = document.getElementById('donationsTableBody');
    const noDonations = document.getElementById('noDonations');

    if (filtered.length === 0) {
        tableBody.innerHTML = '';
        noDonations.style.display = 'block';
        return;
    }

    noDonations.style.display = 'none';
    tableBody.innerHTML = filtered.map((donation, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${donation.donorName}</td>
            <td>${donation.donorEmail}</td>
            <td><strong>Rs. ${donation.amount}</strong></td>
            <td>${donation.duaFor}</td>
            <td>${donation.comment || '-'}</td>
            <td>
                <button class="view-img-btn" onclick="viewImage('${donation.id}')">
                    📸 دیکھیں
                </button>
            </td>
            <td>${donation.timestamp}</td>
            <td>
                <button class="delete-btn" onclick="deleteDonation(${donation.id})">
                    🗑️ حذف کریں
                </button>
            </td>
        </tr>
    `).join('');
}

// Close modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById('adminLoginModal');
    if (event.target === modal) {
        modal.classList.remove('show');
    }

    const imageModal = document.getElementById('imageModal');
    if (event.target === imageModal) {
        imageModal.classList.remove('show');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
        displayDonations();
        checkAdminAccess();
    } else if (window.location.pathname.includes('admin-dashboard')) {
        checkAdminDashboardAccess();
        displayAdminDashboard();
        
        // Refresh data every 5 seconds
        setInterval(displayAdminDashboard, 5000);
    }
});

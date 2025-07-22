
// Global variables
let donors = [];
let camps = [];
let campRegistrations = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    loadDonors();
    loadDummyData();
    displayDonors();
    
    // Setup event listeners
    setupEventListeners();
    
    // Mobile menu toggle
    setupMobileMenu();
}

function setupEventListeners() {
    // Donor form submission
    const donorForm = document.getElementById('donorForm');
    if (donorForm) {
        donorForm.addEventListener('submit', handleDonorRegistration);
    }
    
    // Camp registration form submission
    const campForm = document.getElementById('campRegistrationForm');
    if (campForm) {
        campForm.addEventListener('submit', handleCampRegistration);
    }
    
    // Modal close on outside click
    const modal = document.getElementById('donorModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeDonorModal();
            }
        });
    }
    
    // Form validation
    setupFormValidation();
}

function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
}

function setupFormValidation() {
    // Phone number validation
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            const value = this.value.replace(/\D/g, '');
            this.value = value;
            
            if (value.length === 10) {
                this.style.borderColor = '#2e7d32';
            } else if (value.length > 0) {
                this.style.borderColor = '#e53935';
            } else {
                this.style.borderColor = '#ddd';
            }
        });
    });
    
    // Age validation
    const ageInputs = document.querySelectorAll('input[type="number"]');
    ageInputs.forEach(input => {
        if (input.name === 'age' || input.name === 'campAge') {
            input.addEventListener('input', function() {
                const age = parseInt(this.value);
                if (age >= 18 && age <= 65) {
                    this.style.borderColor = '#2e7d32';
                } else if (this.value !== '') {
                    this.style.borderColor = '#e53935';
                } else {
                    this.style.borderColor = '#ddd';
                }
            });
        }
    });
}

// Donor Management Functions
function loadDonors() {
    const savedDonors = localStorage.getItem('bloodDonors');
    if (savedDonors) {
        donors = JSON.parse(savedDonors);
    }
}

function saveDonors() {
    localStorage.setItem('bloodDonors', JSON.stringify(donors));
}

function loadDummyData() {
    if (donors.length === 0) {
        donors = [
            {
                id: generateId(),
                fullName: 'Rajesh Kumar Sharma',
                age: 28,
                bloodGroup: 'O+',
                contactNumber: '9876543210',
                city: 'New Delhi',
                lastDonation: '2024-10-15',
                registrationDate: new Date().toISOString()
            },
            {
                id: generateId(),
                fullName: 'Priya Singh',
                age: 25,
                bloodGroup: 'A+',
                contactNumber: '9865432109',
                city: 'Mumbai',
                lastDonation: '2024-09-20',
                registrationDate: new Date().toISOString()
            },
            {
                id: generateId(),
                fullName: 'Amit Patel',
                age: 32,
                bloodGroup: 'B+',
                contactNumber: '9754321098',
                city: 'Ahmedabad',
                lastDonation: '2024-11-01',
                registrationDate: new Date().toISOString()
            },
            {
                id: generateId(),
                fullName: 'Sneha Gupta',
                age: 29,
                bloodGroup: 'AB+',
                contactNumber: '9643210987',
                city: 'Bangalore',
                lastDonation: '2024-08-10',
                registrationDate: new Date().toISOString()
            },
            {
                id: generateId(),
                fullName: 'Vikram Singh Rathore',
                age: 35,
                bloodGroup: 'O-',
                contactNumber: '9532109876',
                city: 'Jaipur',
                lastDonation: '2024-12-05',
                registrationDate: new Date().toISOString()
            },
            {
                id: generateId(),
                fullName: 'Ananya Iyer',
                age: 26,
                bloodGroup: 'A-',
                contactNumber: '9421087659',
                city: 'Chennai',
                lastDonation: '2024-11-20',
                registrationDate: new Date().toISOString()
            },
            {
                id: generateId(),
                fullName: 'Rohit Agarwal',
                age: 31,
                bloodGroup: 'B-',
                contactNumber: '9310976548',
                city: 'Kolkata',
                lastDonation: '2024-09-30',
                registrationDate: new Date().toISOString()
            },
            {
                id: generateId(),
                fullName: 'Kavya Reddy',
                age: 24,
                bloodGroup: 'AB-',
                contactNumber: '9209865437',
                city: 'Hyderabad',
                lastDonation: '2024-10-25',
                registrationDate: new Date().toISOString()
            },
            {
                id: generateId(),
                fullName: 'Arjun Verma',
                age: 33,
                bloodGroup: 'O+',
                contactNumber: '9098754326',
                city: 'Lucknow',
                lastDonation: '2024-11-10',
                registrationDate: new Date().toISOString()
            },
            {
                id: generateId(),
                fullName: 'Meera Joshi',
                age: 27,
                bloodGroup: 'A+',
                contactNumber: '8987643215',
                city: 'Pune',
                lastDonation: '2024-08-15',
                registrationDate: new Date().toISOString()
            }
        ];
        saveDonors();
    }
}

function displayDonors() {
    const donorsGrid = document.getElementById('donorsGrid');
    const noDonorsMessage = document.getElementById('noDonorsMessage');
    
    if (!donorsGrid) return;
    
    if (donors.length === 0) {
        donorsGrid.innerHTML = '';
        if (noDonorsMessage) noDonorsMessage.style.display = 'block';
        return;
    }
    
    if (noDonorsMessage) noDonorsMessage.style.display = 'none';
    
    donorsGrid.innerHTML = donors.map(donor => `
        <div class="donor-card">
            <div class="donor-header">
                <div class="donor-name">${donor.fullName}</div>
                <div class="blood-group">${donor.bloodGroup}</div>
            </div>
            <div class="donor-info">
                <div>
                    <i class="fas fa-birthday-cake"></i>
                    <span>${donor.age} years old</span>
                </div>
                <div>
                    <i class="fas fa-phone"></i>
                    <span>${donor.contactNumber}</span>
                </div>
                <div>
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${donor.city}</span>
                </div>
                ${donor.lastDonation ? `
                <div>
                    <i class="fas fa-calendar"></i>
                    <span>Last donation: ${formatDate(donor.lastDonation)}</span>
                </div>
                ` : ''}
            </div>
        </div>
    `).join('');
}

function filterDonors() {
    const bloodGroupFilter = document.getElementById('bloodGroupFilter').value;
    const cityFilter = document.getElementById('cityFilter').value.toLowerCase();
    
    let filteredDonors = donors;
    
    if (bloodGroupFilter) {
        filteredDonors = filteredDonors.filter(donor => 
            donor.bloodGroup === bloodGroupFilter
        );
    }
    
    if (cityFilter) {
        filteredDonors = filteredDonors.filter(donor => 
            donor.city.toLowerCase().includes(cityFilter)
        );
    }
    
    const donorsGrid = document.getElementById('donorsGrid');
    const noDonorsMessage = document.getElementById('noDonorsMessage');
    
    if (filteredDonors.length === 0) {
        donorsGrid.innerHTML = '';
        if (noDonorsMessage) noDonorsMessage.style.display = 'block';
        return;
    }
    
    if (noDonorsMessage) noDonorsMessage.style.display = 'none';
    
    donorsGrid.innerHTML = filteredDonors.map(donor => `
        <div class="donor-card">
            <div class="donor-header">
                <div class="donor-name">${donor.fullName}</div>
                <div class="blood-group">${donor.bloodGroup}</div>
            </div>
            <div class="donor-info">
                <div>
                    <i class="fas fa-birthday-cake"></i>
                    <span>${donor.age} years old</span>
                </div>
                <div>
                    <i class="fas fa-phone"></i>
                    <span>${donor.contactNumber}</span>
                </div>
                <div>
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${donor.city}</span>
                </div>
                ${donor.lastDonation ? `
                <div>
                    <i class="fas fa-calendar"></i>
                    <span>Last donation: ${formatDate(donor.lastDonation)}</span>
                </div>
                ` : ''}
            </div>
        </div>
    `).join('');
}

// Modal Functions
function openDonorModal() {
    const modal = document.getElementById('donorModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeDonorModal() {
    const modal = document.getElementById('donorModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        // Reset form
        const form = document.getElementById('donorForm');
        if (form) form.reset();
    }
}

// Form Handlers
function handleDonorRegistration(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const donorData = {
        id: generateId(),
        fullName: formData.get('fullName'),
        age: parseInt(formData.get('age')),
        bloodGroup: formData.get('bloodGroup'),
        contactNumber: formData.get('contactNumber'),
        city: formData.get('city'),
        lastDonation: formData.get('lastDonation') || null,
        registrationDate: new Date().toISOString()
    };
    
    // Validation
    if (!validateDonorData(donorData)) {
        return;
    }
    
    // Check for duplicate phone numbers
    const existingDonor = donors.find(donor => 
        donor.contactNumber === donorData.contactNumber
    );
    
    if (existingDonor) {
        showToast('This phone number is already registered!', 'error');
        return;
    }
    
    // Add donor to the beginning of the array to show newest first
    donors.unshift(donorData);
    saveDonors();
    displayDonors();
    closeDonorModal();
    
    showToast('Thank you for registering as a donor! Your profile has been added to our database.');
    
    console.log('New donor registered:', donorData);
}

function validateDonorData(data) {
    if (!data.fullName.trim()) {
        showToast('Please enter your full name', 'error');
        return false;
    }
    
    if (data.age < 18 || data.age > 65) {
        showToast('Age must be between 18 and 65 years', 'error');
        return false;
    }
    
    if (!data.bloodGroup) {
        showToast('Please select your blood group', 'error');
        return false;
    }
    
    if (!/^\d{10}$/.test(data.contactNumber)) {
        showToast('Please enter a valid 10-digit phone number', 'error');
        return false;
    }
    
    if (!data.city.trim()) {
        showToast('Please enter your city', 'error');
        return false;
    }
    
    return true;
}

// Camp Management Functions
function loadCamps() {
    camps = [
        {
            id: generateId(),
            title: 'AIIMS Delhi Blood Donation Drive',
            location: 'AIIMS Hospital, New Delhi',
            hospital: 'AIIMS Delhi',
            city: 'Delhi',
            date: '2025-01-15',
            time: '10:00 AM - 4:00 PM',
            organizer: 'Red Cross India',
            status: 'Active'
        },
        {
            id: generateId(),
            title: 'Mumbai Blood Heroes Campaign',
            location: 'Tata Memorial Hospital, Mumbai',
            hospital: 'Tata Memorial Hospital',
            city: 'Mumbai',
            date: '2025-01-20',
            time: '9:00 AM - 3:00 PM',
            organizer: 'Lions Club Mumbai',
            status: 'Active'
        },
        {
            id: generateId(),
            title: 'Bangalore IT Community Drive',
            location: 'Narayana Health, Electronic City',
            hospital: 'Narayana Health',
            city: 'Bangalore',
            date: '2025-01-25',
            time: '11:00 AM - 5:00 PM',
            organizer: 'Karnataka Blood Bank',
            status: 'Active'
        },
        {
            id: generateId(),
            title: 'Chennai Medical College Camp',
            location: 'Apollo Hospital, Chennai',
            hospital: 'Apollo Hospital',
            city: 'Chennai',
            date: '2025-01-30',
            time: '8:00 AM - 2:00 PM',
            organizer: 'Tamil Nadu Blood Bank',
            status: 'Active'
        }
    ];
    
    const campsGrid = document.getElementById('campsGrid');
    if (campsGrid) {
        campsGrid.innerHTML = camps.map(camp => `
            <div class="camp-card">
                <div class="camp-header">
                    <div class="camp-title">${camp.title}</div>
                    <div class="camp-status">${camp.status}</div>
                </div>
                <div class="camp-info">
                    <div>
                        <i class="fas fa-hospital"></i>
                        <span>${camp.hospital}</span>
                    </div>
                    <div>
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${camp.location}</span>
                    </div>
                    <div>
                        <i class="fas fa-calendar"></i>
                        <span>${formatDate(camp.date)}</span>
                    </div>
                    <div>
                        <i class="fas fa-clock"></i>
                        <span>${camp.time}</span>
                    </div>
                    <div>
                        <i class="fas fa-users"></i>
                        <span>Organized by ${camp.organizer}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function populateCampDropdown() {
    const dropdown = document.getElementById('selectedCamp');
    if (dropdown && camps.length > 0) {
        dropdown.innerHTML = '<option value="">Choose a camp</option>' + 
            camps.map(camp => `
                <option value="${camp.id}">${camp.title} - ${formatDate(camp.date)}</option>
            `).join('');
    }
}

function handleCampRegistration(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const registrationData = {
        id: generateId(),
        name: formData.get('campName'),
        age: parseInt(formData.get('campAge')),
        bloodGroup: formData.get('campBloodGroup'),
        phone: formData.get('campPhone'),
        email: formData.get('campEmail'),
        selectedCamp: formData.get('selectedCamp'),
        allergies: formData.get('allergies') || '',
        termsAccept: formData.get('termsAccept') === 'on',
        registrationDate: new Date().toISOString()
    };
    
    // Validation
    if (!validateCampRegistration(registrationData)) {
        return;
    }
    
    // Save registration
    if (!campRegistrations) campRegistrations = [];
    campRegistrations.push(registrationData);
    localStorage.setItem('campRegistrations', JSON.stringify(campRegistrations));
    
    // Reset form
    e.target.reset();
    
    // Show success message
    showToast('Successfully registered for blood donation camp!');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    console.log('Camp registration:', registrationData);
}

function validateCampRegistration(data) {
    if (!data.name.trim()) {
        showToast('Please enter your full name', 'error');
        return false;
    }
    
    if (data.age < 18 || data.age > 65) {
        showToast('Age must be between 18 and 65 years', 'error');
        return false;
    }
    
    if (!data.bloodGroup) {
        showToast('Please select your blood group', 'error');
        return false;
    }
    
    if (!/^\d{10}$/.test(data.phone)) {
        showToast('Please enter a valid 10-digit phone number', 'error');
        return false;
    }
    
    if (!data.email.includes('@')) {
        showToast('Please enter a valid email address', 'error');
        return false;
    }
    
    if (!data.selectedCamp) {
        showToast('Please select a camp', 'error');
        return false;
    }
    
    if (!data.termsAccept) {
        showToast('Please accept the terms and conditions', 'error');
        return false;
    }
    
    return true;
}

// Utility Functions
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-IN', options);
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('successToast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        
        // Set color based on type
        if (type === 'error') {
            toast.style.background = '#e53935';
        } else {
            toast.style.background = '#2e7d32';
        }
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Search functionality with Enter key
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement && (activeElement.id === 'bloodGroupFilter' || activeElement.id === 'cityFilter')) {
            filterDonors();
        }
    }
});

// Auto-hide mobile menu when clicking on links
document.addEventListener('click', function(e) {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (e.target.matches('.nav-menu a')) {
        if (navMenu) navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    }
});

// Smooth scroll for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        scrollToSection(targetId);
    }
});

// Console logs for debugging
console.log('BloodConnect application initialized');
console.log('Available blood groups: A+, A-, B+, B-, AB+, AB-, O+, O-');
console.log('Emergency helpline: 1800-108-108');

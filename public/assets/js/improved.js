// Enhanced JavaScript for improved user experience

// Announcement banner functionality
function initAnnouncementBanner() {
    const announcement = document.getElementById('rush-announcement');
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero');
    
    if (!announcement) return;
    
    // Add close button to announcement
    const closeBtn = document.createElement('button');
    closeBtn.className = 'announcement-close';
    closeBtn.innerHTML = '×';
    closeBtn.setAttribute('aria-label', 'Close announcement');
    announcement.appendChild(closeBtn);
    
    // Handle close button click
    closeBtn.addEventListener('click', function() {
        announcement.style.display = 'none';
        if (header) header.classList.add('no-banner');
        if (hero) hero.classList.add('no-banner');
        localStorage.setItem('announcementClosed', 'true');
    });
    
    // Check if announcement was previously closed
    if (localStorage.getItem('announcementClosed') === 'true') {
        announcement.style.display = 'none';
        if (header) header.classList.add('no-banner');
        if (hero) hero.classList.add('no-banner');
    }
}

// Enhanced popup message system
function showPopupMessage(message, type = 'success', duration = 4000) {
    // Remove existing popups
    const existingPopups = document.querySelectorAll('.popup-overlay');
    existingPopups.forEach(popup => popup.remove());
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    
    // Create popup
    const popup = document.createElement('div');
    popup.className = `message-popup ${type}`;
    popup.textContent = message;
    
    // Add to document
    document.body.appendChild(overlay);
    document.body.appendChild(popup);
    
    // Auto-remove after duration
    setTimeout(() => {
        overlay.style.animation = 'fadeOut 0.3s ease';
        popup.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            overlay.remove();
            popup.remove();
        }, 300);
    }, duration);
    
    // Click overlay to close
    overlay.addEventListener('click', () => {
        overlay.remove();
        popup.remove();
    });
    
    // Prevent popup click from closing
    popup.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Enhanced form submission for contact page
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const originalBtnText = submitBtn.innerText;
        submitBtn.disabled = true;
        submitBtn.innerText = 'Sending...';
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        data.formType = 'contact';
        
        if (!data.name || !data.email || !data.subject || !data.message) {
            showPopupMessage('Please fill out all fields.', 'error');
            resetSubmitButton(submitBtn, originalBtnText);
            return;
        }
        
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            
            if (response.ok) {
                showPopupMessage('Message sent successfully! We\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.innerText = 'Message Sent!';
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Something went wrong.');
            }
        } catch (error) {
            showPopupMessage('Error sending message: ' + error.message, 'error');
            console.error('Form submission error:', error);
        } finally {
            setTimeout(() => resetSubmitButton(submitBtn, originalBtnText), 3000);
        }
    });
}

// Enhanced form submission for donation page
function initDonationForm() {
    const donationForm = document.getElementById('donationForm');
    const submitBtn = document.getElementById('submitBtn');
    const paymentMethodSelect = document.getElementById('paymentMethod');
    const addressDisplay = document.getElementById('addressDisplay');
    
    if (!donationForm) return;
    
    donationForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const originalBtnText = submitBtn.innerText;
        submitBtn.disabled = true;
        submitBtn.innerText = 'Processing...';
        
        const selectedNetwork = paymentMethodSelect?.value;
        if (!selectedNetwork) {
            showPopupMessage('Please select a payment method.', 'error');
            resetSubmitButton(submitBtn, originalBtnText);
            return;
        }
        
        const formData = {
            name: document.getElementById('name')?.value || 'Anonymous',
            email: document.getElementById('email')?.value?.trim() || '',
            amount: document.getElementById('amount')?.value?.trim() || '',
            network: selectedNetwork,
            txHash: document.getElementById('txHash')?.value?.trim() || '',
            pastDonor: document.getElementById('pastDonor')?.checked || false,
            formType: 'license'
        };
        
        // Validation
        if (!formData.email) {
            showPopupMessage('Email is required for license delivery.', 'error');
            resetSubmitButton(submitBtn, originalBtnText);
            return;
        }
        
        if (!formData.pastDonor && (!formData.amount || !formData.txHash)) {
            showPopupMessage('Amount and transaction hash are required (or check "past donor").', 'error');
            resetSubmitButton(submitBtn, originalBtnText);
            return;
        }
        
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                showPopupMessage('🎉 License request submitted! You\'ll receive your license key via email within 24-48 hours.', 'success', 6000);
                donationForm.reset();
                paymentMethodSelect.selectedIndex = 0;
                addressDisplay.style.display = 'none';
                submitBtn.innerText = 'License Request Sent!';
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Something went wrong.');
            }
        } catch (error) {
            showPopupMessage('Problem submitting: ' + error.message, 'error');
            console.error('Form submission error:', error);
        } finally {
            setTimeout(() => resetSubmitButton(submitBtn, originalBtnText), 3000);
        }
    });
}

// Helper function to reset submit button
function resetSubmitButton(button, originalText) {
    button.disabled = false;
    button.innerText = originalText;
}

// Enhanced payment method selector
function initPaymentSelector() {
    const paymentMethodSelect = document.getElementById('paymentMethod');
    const addressDisplay = document.getElementById('addressDisplay');
    const paymentIcon = document.getElementById('paymentIcon');
    const paymentName = document.getElementById('paymentName');
    const paymentAddress = document.getElementById('paymentAddress');
    const copyAddressBtn = document.getElementById('copyAddressBtn');
    
    if (!paymentMethodSelect) return;
    
    const paymentMethods = {
        BTC: { name: "Bitcoin (BTC)", address: "bc1q0ck0a6tw968jgxq0wyhtj4hh9x40uwr58pxkk2", icon: '<img src="assets/images/bitcoin-btc-logo.svg" alt="Bitcoin BTC Logo" class="crypto-logo">' },
        ETH: { name: "Ethereum (ETH)", address: "0x4Fb2F4832B73317Fd40CaAa239E4bbe372e0B785", icon: '<img src="assets/images/ethereum-eth-logo.svg" alt="Ethereum ETH Logo" class="crypto-logo">' },
        HNS: { name: "Handshake (HNS)", address: "hs1qec7f67exw4zzfhshka442gtscpcumr5s4x647q", icon: '<img src="assets/images/hns.svg" alt="Handshake HNS Logo" class="crypto-logo">' },
        USDT: { name: "USDT (TRC20)", address: "TDsyTq1HCCT4Spqmf9hD1qwGVkyNiShLrN", icon: '<img src="assets/images/tether-usdt-logo.svg" alt="Tether USDT Logo" class="crypto-logo">' },
        USDC: { name: "USDC (TRC20)", address: "TDsyTq1HCCT4Spqmf9hD1qwGVkyNiShLrN", icon: '<img src="assets/images/usd-coin-usdc-logo.svg" alt="USD Coin USDC Logo" class="crypto-logo">' },
        XMR: { name: "Monero (XMR)", address: "467PfMrBzSmdhzqQSYqyXKYaSQLS2MDUDShxtcQxTFvUTTxL1UJf54eecTueXwA68DFPUNu3HEZwSQxWh2FthUTR8FrMeSd", icon: '<img src="assets/images/monero-xmr-logo.svg" alt="Monero XMR Logo" class="crypto-logo">' },
        SOL: { name: "Solana (SOL)", address: "4epfhUwLaqRWPvRX13HZwghRnpohb2aHpnTVWEWPELTk", icon: '<img src="assets/images/solana-sol-logo.svg" alt="Solana SOL Logo" class="crypto-logo">' },
        LTC: { name: "Litecoin (LTC)", address: "ltc1qhal7j2j7tw3hq0klp7enh6txnypchamdcau8pm", icon: '<img src="assets/images/litecoin-ltc-logo.svg" alt="Litecoin LTC Logo" class="crypto-logo">' },
        BNB: { name: "BNB Smart Chain", address: "0x4Fb2F4832B73317Fd40CaAa239E4bbe372e0B785", icon: '<img src="assets/images/bnb-bnb-logo.svg" alt="BNB BNB Logo" class="crypto-logo">' },
        PAYPAL: { name: "PayPal", address: "sutariyar@gmail.com", icon: '<img src="assets/images/paypal-logo.svg" alt="PayPal Logo" class="crypto-logo">' }
    };
    
    paymentMethodSelect.addEventListener('change', function() {
        const selectedMethod = this.value;
        if (selectedMethod && paymentMethods[selectedMethod]) {
            const method = paymentMethods[selectedMethod];
            paymentName.textContent = method.name;
            paymentAddress.textContent = method.address;
            paymentIcon.innerHTML = method.icon;
            addressDisplay.style.display = 'block';
        } else {
            addressDisplay.style.display = 'none';
        }
    });
    
    if (copyAddressBtn) {
        copyAddressBtn.addEventListener('click', function() {
            const address = paymentAddress.textContent;
            navigator.clipboard.writeText(address).then(() => {
                const original = this.innerText;
                this.innerText = 'COPIED!';
                showPopupMessage('Address copied to clipboard!', 'success', 2000);
                setTimeout(() => this.innerText = original, 2000);
            }).catch(err => {
                showPopupMessage('Failed to copy: ' + err.message, 'error');
            });
        });
    }
}

// Countdown timer functionality
function initCountdownTimer() {
    // Fixed end date: 9 days after September 28, 2025 → October 7, 2025 at 23:59:59.999 UTC
    const offerEnd = new Date('2025-10-07T23:59:59.999Z');

    function updateCountdown() {
        const textEl = document.getElementById("countdown-text");
        const timerEl = document.getElementById("countdown-timer");
        
        if (!textEl || !timerEl) return;
        
        const now = new Date().getTime();
        const distance = offerEnd.getTime() - now;
        
        if (distance < 0) {
            textEl.textContent = "Offer expired! RushBrowser is now available via paid license only.";
            timerEl.textContent = "";
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        
        timerEl.textContent = `(${days}d ${hours}h ${minutes}m left)`;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 60000); // Update every minute
}

// FAQ functionality
function toggleFaq(button) {
    const faqItem = button.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
            item.querySelector('.faq-answer').classList.remove('active');
        }
    });
    
    // Toggle current item
    faqItem.classList.toggle('active');
    answer.classList.toggle('active');
}

// Mobile navigation functionality
function initMobileNavigation() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (!mobileMenuToggle || !navLinks) return;
    
    mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
    
    // Close menu when clicking nav links on mobile
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks?.classList.remove('active');
                mobileMenuToggle?.classList.remove('active');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            if (navLinks?.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuToggle?.classList.remove('active');
            }
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('header')?.offsetHeight || 80;
                const bannerHeight = document.getElementById('rush-announcement')?.offsetHeight || 0;
                const offset = headerHeight + bannerHeight;
                window.scrollTo({ 
                    top: target.offsetTop - offset, 
                    behavior: 'smooth' 
                });
            }
        });
    });
    
    // Close menu when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 &&
            !e.target.closest('.nav-links') &&
            !e.target.closest('.menu-toggle') &&
            navLinks?.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileMenuToggle?.classList.remove('active');
        }
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initAnnouncementBanner();
    initContactForm();
    initDonationForm();
    initPaymentSelector();
    initCountdownTimer();
    initMobileNavigation();
    
    // Make toggleFaq globally available for inline onclick handlers
    window.toggleFaq = toggleFaq;
    
    // Add fade-out animation keyframes to CSS if not already present
    if (!document.querySelector('style[data-fade-animations]')) {
        const style = document.createElement('style');
        style.setAttribute('data-fade-animations', 'true');
        style.textContent = `
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
});
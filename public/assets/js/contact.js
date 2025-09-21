const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const originalBtnText = submitBtn.innerText;
    submitBtn.disabled = true;
    submitBtn.innerText = 'Sending...';

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    data.formType = 'contact'; // Add form identifier

    try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            submitBtn.innerText = 'Message Sent!';
            contactForm.reset();
        } else {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Something went wrong.');
        }

    } catch (error) {
        submitBtn.innerText = 'Send Failed';
        console.error('Form submission error:', error);
        alert('There was an error sending your message. Please try again.');
    } finally {
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerText = originalBtnText;
        }, 3000);
    }
});
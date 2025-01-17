// Modal oynani ochish va yopish
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('booking-modal');
    const closeBtn = document.querySelector('.close');
    const bookButtons = document.querySelectorAll('.cta-button');

    bookButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); // Havolani bosilishini oldini olish
            modal.style.display = 'block';
        });
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Initialize Stripe
const stripe = Stripe('YOUR_PUBLISHABLE_KEY'); // Replace with your Stripe Publishable Key
const elements = stripe.elements();
const cardElement = elements.create('card');
cardElement.mount('#card-element');

// Handle Form Submission
document.getElementById('booking-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Get Form Data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const spaceType = document.getElementById('space-type').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const notes = document.getElementById('notes').value;

    // Validate Form Data
    if (!name || !email || !phone || !spaceType || !date || !time) {
        alert('Please fill out all required fields.');
        return;
    }

    // Create Payment Method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
            name: name,
            email: email,
            phone: phone,
        },
    });

    if (error) {
        // Display Card Errors
        const errorElement = document.getElementById('card-errors');
        errorElement.textContent = error.message;
        return;
    }

    // Simulate Server-Side Payment Processing
    try {
        // Here you would send the paymentMethod.id to your server for further processing
        // For now, we'll just simulate a successful payment
        alert('Payment Successful! Your booking has been confirmed.');

        // Log Booking Details (for testing)
        console.log('Booking Details:');
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Phone:', phone);
        console.log('Workspace:', spaceType);
        console.log('Date:', date);
        console.log('Time:', time);
        console.log('Notes:', notes);

        // Close Modal
        document.getElementById('booking-modal').style.display = 'none';

        // Clear Form Fields
        document.getElementById('booking-form').reset();
    } catch (error) {
        alert('Payment failed. Please try again.');
        console.error('Payment Error:', error);
    }
});
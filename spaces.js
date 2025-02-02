document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('booking-modal');
    const closeBtn = document.querySelector('.close');
    const bookButtons = document.querySelectorAll('.cta-button');

    bookButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault(); 
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

const stripe = Stripe('YOUR_PUBLISHABLE_KEY'); 
const elements = stripe.elements();
const cardElement = elements.create('card');
cardElement.mount('#card-element');
document.getElementById('booking-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const spaceType = document.getElementById('space-type').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const notes = document.getElementById('notes').value;

    if (!name || !email || !phone || !spaceType || !date || !time) {
        alert('Please fill out all required fields.');
        return;
    }


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
        const errorElement = document.getElementById('card-errors');
        errorElement.textContent = error.message;
        return;
    }

    try {
        alert('Payment Successful! Your booking has been confirmed.');

        console.log('Booking Details:');
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Phone:', phone);
        console.log('Workspace:', spaceType);
        console.log('Date:', date);
        console.log('Time:', time);
        console.log('Notes:', notes);

        document.getElementById('booking-modal').style.display = 'none';

        document.getElementById('booking-form').reset();
    } catch (error) {
        alert('Payment failed. Please try again.');
        console.error('Payment Error:', error);
    }
});
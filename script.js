document.addEventListener('DOMContentLoaded', function() {
    const goalAmount = 150000;
    const currentAmount = 48750;
    const donationButtons = document.querySelectorAll('.donation-amount-btn');
    const customAmountInput = document.getElementById('custom-amount-input');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    let currentTestimonialIndex = 0;

    function formatCurrency(value) {
        return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
    }

    function clearActiveButtonState() {
         donationButtons.forEach(btn => {
            btn.classList.remove('bg-amber-600', 'text-white', 'border-amber-600');
            btn.classList.add('bg-white', 'text-stone-700', 'border-stone-300');
        });
    }

    donationButtons.forEach(button => {
        button.addEventListener('click', () => {
            clearActiveButtonState();
            button.classList.add('bg-amber-600', 'text-white', 'border-amber-600');
            button.classList.remove('bg-white', 'text-stone-700', 'border-stone-300');
            customAmountInput.value = ''; 
        });
    });

    customAmountInput.addEventListener('input', () => {
        clearActiveButtonState();
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
             if (mobileMenu.classList.contains('hidden') === false) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    function showTestimonial(index) {
        testimonialItems.forEach((item, i) => {
            if (i === index) {
                item.classList.remove('opacity-0');
                item.classList.add('opacity-100');
                item.style.zIndex = '10';
            } else {
                item.classList.add('opacity-0');
                item.classList.remove('opacity-100');
                item.style.zIndex = '1';
            }
        });
        
        testimonialDots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('bg-amber-600');
                dot.classList.remove('bg-stone-300');
            } else {
                dot.classList.remove('bg-amber-600');
                dot.classList.add('bg-stone-300');
            }
        });
        currentTestimonialIndex = index;
    }

    function nextTestimonial() {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonialItems.length;
        showTestimonial(currentTestimonialIndex);
    }

    testimonialDots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            showTestimonial(index);
        });
    });

    // Initialize testimonial slider
    if (testimonialItems.length > 0) {
        showTestimonial(0);
        setInterval(nextTestimonial, 1000000);
    }

});
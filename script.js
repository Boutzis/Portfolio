document.addEventListener("DOMContentLoaded", function () {
    
    // Particles Background Configuration
    if (document.getElementById("particles-js")) {
        particlesJS("particles-js", {
            particles: {
                number: { value: 60, density: { enable: true, value_area: 800 } },
                color: { value: "#ffffff" },
                shape: { type: "circle" },
                opacity: { value: 0.2, random: false },
                size: { value: 2, random: true },
                line_linked: { 
                    enable: true, 
                    distance: 150, 
                    color: "#00ccff", 
                    opacity: 0.1, 
                    width: 1 
                },
                move: { 
                    enable: true, 
                    speed: 1.5, 
                    direction: "none", 
                    random: false, 
                    straight: false, 
                    out_mode: "out", 
                    bounce: false 
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                }
            },
            retina_detect: true
        });
    }

    // Scroll Animation (ScrollReveal)
    const sr = ScrollReveal({
        duration: 1200,
        distance: '50px',
        origin: 'bottom',
        opacity: 0,
        delay: 200,
        reset: false 
    });

    sr.reveal('.reveal');
    sr.reveal('.hero-title', { delay: 300, origin: 'left' });
    sr.reveal('.hero-subtitle-minimal', { delay: 400, origin: 'left' });
    sr.reveal('.new-skill-card', { interval: 100 });

    // EmailJS Form Handling με reCAPTCHA
    emailjs.init("mtyDpmG-yrqPZzk47"); // Το Public Key σου

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const btn = this.querySelector('button');
            const statusDiv = document.getElementById('form-status');
            const originalText = btn.innerHTML;

            // --- ΕΛΕΓΧΟΣ RECAPTCHA ---
            const captchaResponse = grecaptcha.getResponse();
            if (captchaResponse.length === 0) {
                statusDiv.innerHTML = '<i class="fas fa-robot"></i> Please verify you are not a robot.';
                statusDiv.className = "mt-3 text-danger fw-bold"; // Κόκκινο κείμενο για σφάλμα
                return; // Σταματάει την αποστολή εδώ
            }

            // Κατάσταση "Αποστολή..."
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            emailjs.sendForm('service_68w9359', 'template_uctivi1', this)
                .then(() => {
                    // Επιτυχία
                    statusDiv.innerHTML = '<i class="fas fa-check-circle"></i> Success! Your message has been sent.';
                    statusDiv.className = "mt-3 text-success fw-bold";
                    
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    this.reset(); // Καθαρισμός φόρμας
                    grecaptcha.reset(); // Επαναφορά του reCAPTCHA

                    // Εξαφάνιση μηνύματος μετά από 5 δευτερόλεπτα
                    setTimeout(() => {
                        statusDiv.style.opacity = "0";
                        setTimeout(() => {
                            statusDiv.className = "mt-3";
                            statusDiv.innerHTML = "";
                            statusDiv.style.opacity = "1";
                        }, 400);
                    }, 5000);

                }, (error) => {
                    // Αποτυχία
                    statusDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Failed to send. Please try again.';
                    statusDiv.className = "mt-3 text-danger fw-bold";
                    
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    grecaptcha.reset(); // Επαναφορά για νέα προσπάθεια
                    console.error("EmailJS Error:", error);
                });
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    
    // 1. Particles Background Configuration
    // Αυτό δημιουργεί τα σωματίδια που κινούνται στο υπόβαθρο
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

    // 2. Scroll Animation (ScrollReveal)
    // Κάνει τα στοιχεία να εμφανίζονται ομαλά καθώς σκρολάρεις
    const sr = ScrollReveal({
        duration: 1200,
        distance: '50px',
        origin: 'bottom',
        opacity: 0,
        delay: 200,
        reset: false // Το αφήνουμε false για να μην ξανακάνει το animation κάθε φορά
    });

    sr.reveal('.reveal');
    sr.reveal('.hero-title', { delay: 300, origin: 'left' });
    sr.reveal('.hero-subtitle-minimal', { delay: 400, origin: 'left' });
    sr.reveal('.new-skill-card', { interval: 100 }); // Εμφανίζει τα skills ένα-ένα

    // 3. EmailJS Form Handling
    // Λογική για την αποστολή email και εμφάνιση μηνύματος κατάστασης (status message)
    emailjs.init("mtyDpmG-yrqPZzk47"); // Το Public Key σου

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const btn = this.querySelector('button');
            const statusDiv = document.getElementById('form-status');
            const originalText = btn.innerHTML;

            // Κατάσταση "Αποστολή..."
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;

            emailjs.sendForm('service_68w9359', 'template_uctivi1', this)
                .then(() => {
                    // Επιτυχία - Εμφάνιση μηνύματος στο div
                    statusDiv.innerHTML = '<i class="fas fa-check-circle"></i> Success! Your message has been sent.';
                    statusDiv.className = "mt-3 status-success";
                    
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    this.reset(); // Καθαρισμός φόρμας

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
                    statusDiv.className = "mt-3 status-error";
                    
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    console.error("EmailJS Error:", error);

                    // Εξαφάνιση μηνύματος μετά από 5 δευτερόλεπτα
                    setTimeout(() => {
                        statusDiv.style.opacity = "0";
                        setTimeout(() => {
                            statusDiv.className = "mt-3";
                            statusDiv.innerHTML = "";
                            statusDiv.style.opacity = "1";
                        }, 400);
                    }, 5000);
                });
        });
    }
});
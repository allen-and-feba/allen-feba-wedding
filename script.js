// --- 0. Premium Preloader Logic ---
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    
    // Kept at 2000ms. The loading bar melts away, leaving the initials, 
    // and seamlessly transitioning to the landing screen.
    setTimeout(function() {
        preloader.classList.add('fade-out');
    }, 2000); 
});

// --- 1. Dynamic Event & Countdown Logic ---
// REAL Target 1: Holy Matrimony (April 27, 2026 at 3:00 PM)
const ceremonyDate = new Date(2026, 3, 27, 15, 0, 0).getTime();

// REAL Target 2: Wedding Reception (April 27, 2026 at 6:00 PM)
const receptionDate = new Date(2026, 3, 27, 18, 0, 0).getTime();

// "Locks" to make sure the confetti only fires exactly once per event
let ceremonyTriggered = false;
let receptionTriggered = false;

// The Party Popper Function!
function popConfetti() {
    const defaults = { 
        origin: { y: 0.7 }, 
        colors: ['#c5a059', '#ffffff', '#1a1a1a'] // Champagne Gold, White, Charcoal
    };
    
    // Left side cannon
    confetti({
        ...defaults,
        particleCount: 150,
        spread: 70,
        origin: { x: 0 }
    });
    
    // Right side cannon
    confetti({
        ...defaults,
        particleCount: 150,
        spread: 70,
        origin: { x: 1 }
    });
}

const timer = setInterval(function() {
    const now = new Date().getTime();
    const distanceToCeremony = ceremonyDate - now;

    if (distanceToCeremony > 0) {
        // Phase 1: Counting down
        const days = Math.floor(distanceToCeremony / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distanceToCeremony % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distanceToCeremony % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distanceToCeremony % (1000 * 60)) / 1000);

        document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
        document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;
        
    } else {
        // The countdown has reached zero
        if (now >= receptionDate) {
            // Phase 3: Reception Time!
            clearInterval(timer);
            if (!receptionTriggered) {
                document.getElementById("countdown").innerHTML = "<h2 class='pop-out show'>Celebration mood on 🎉</h2>";
                popConfetti();
                receptionTriggered = true;
            }
        } else {
            // Phase 2: Ceremony Time!
            if (!ceremonyTriggered) {
                document.getElementById("countdown").innerHTML = "<h2 class='pop-out show'>It's Happening Right Now ✨</h2>";
                popConfetti();
                ceremonyTriggered = true;
            }
        }
    }
}, 1000);

// --- 2. Scroll Animation Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // We unobserve so the animation only happens the first time they scroll down
                observer.unobserve(entry.target); 
            }
        });
    }, { 
        threshold: 0.1 
    });
    
    // This will now catch the new hidden elements in your hero section!
    document.querySelectorAll('.hidden').forEach((el) => observer.observe(el));
});

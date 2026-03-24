// --- 1. Countdown Logic ---
// Target: April 27, 2026 at 3:00 PM (15:00:00)
// Note: JavaScript months are 0-indexed (0 = Jan, 1 = Feb, 2 = Mar, 3 = Apr)
const weddingDate = new Date(2026, 3, 27, 15, 0, 0).getTime();

const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update the HTML
    document.getElementById("days").innerHTML = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerHTML = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerHTML = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerHTML = seconds < 10 ? "0" + seconds : seconds;

    // Stop timer when it hits zero
    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("countdown").innerHTML = "<h2>It's the Big Day!</h2>";
    }
}, 1000);

// --- 2. Scroll Animation Logic ---
document.addEventListener('DOMContentLoaded', () => {
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.05 
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));
});

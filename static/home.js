// JavaScript to change background every 30 seconds
let backgrounds = ['bg1', 'bg2', 'bg3'];
let currentIndex = 0;

function changeBackground() {
    document.body.classList.remove(...backgrounds);  // Remove all existing background classes
    document.body.classList.add(backgrounds[currentIndex]);  // Add new background class
    currentIndex = (currentIndex + 1) % backgrounds.length;  // Update index for the next cycle
}

// Initial background change on page load
changeBackground();

// Change background every 30 seconds
setInterval(changeBackground, 30000);

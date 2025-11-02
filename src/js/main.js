// This file contains JavaScript functionality for the birthday celebration website.

document.addEventListener('DOMContentLoaded', function() {
    const giftBox = document.getElementById('gift-box');
    const audio = document.getElementById('birthday-audio');

    // Function to play the birthday song
    function playBirthdaySong() {
        audio.play();
    }

    // Event listener for the gift box click
    giftBox.addEventListener('click', function() {
        window.location.href = 'MyLove.html';
    });

    // Function to animate images around the screen
    function animateImages() {
        const images = document.querySelectorAll('.animated-image');
        images.forEach(image => {
            const randomX = Math.random() * window.innerWidth;
            const randomY = Math.random() * window.innerHeight;
            image.style.transform = `translate(${randomX}px, ${randomY}px)`;
        });
    }

    // Start the animation and play the song
    animateImages();
    playBirthdaySong();
});
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const carouselInner = document.querySelector('.carousel-inner');
    const images = document.querySelectorAll('.carousel-inner img');
    const totalImages = images.length;
    let currentIndex = 0;

    if (carouselInner) {
        // Clone images for seamless loop
        carouselInner.innerHTML += carouselInner.innerHTML;

        // Function to move the carousel to the next image
        function moveCarousel() {
            currentIndex++;
            carouselInner.style.transition = 'transform 1s ease';
            carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;

            // Reset to the first set of images seamlessly
            if (currentIndex === totalImages) {
                setTimeout(() => {
                    carouselInner.style.transition = 'none'; // Disable transition for reset
                    carouselInner.style.transform = 'translateX(0)';
                    currentIndex = 0;
                }, 1000); // Match this delay with the transition duration
            }
        }

        // Set interval to change images automatically every 3 seconds
        setInterval(moveCarousel, 3000);
    }

    // Handle menu toggle
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('show');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', function(event) {
        if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
            sidebar.classList.remove('show');
        }
    });
});

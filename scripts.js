document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const carouselInner = document.querySelector('.carousel-inner');
    const images = document.querySelectorAll('.carousel-inner img');
    const totalImages = images.length;
    let currentIndex = 0;

    // Clone all images to create a seamless infinite loop
    if (carouselInner) {
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

        // Drag and swipe functionality for carousel
        let startX, endX;
        let isDragging = false;
        let startTranslateX;

        function onTouchStart(event) {
            isDragging = true;
            startX = event.touches ? event.touches[0].clientX : event.clientX;
            startTranslateX = -currentIndex * carouselInner.offsetWidth;
            carouselInner.style.transition = 'none'; // Disable transition during drag
        }

        function onTouchMove(event) {
            if (!isDragging) return;
            endX = event.touches ? event.touches[0].clientX : event.clientX;
            const moveX = endX - startX;
            carouselInner.style.transform = `translateX(${startTranslateX + moveX}px)`;
        }

        function onTouchEnd(event) {
            if (!isDragging) return;
            isDragging = false;
            const moveX = endX - startX;
            const threshold = carouselInner.offsetWidth / 3; // Adjust swipe sensitivity here
            if (Math.abs(moveX) > threshold) {
                if (moveX < 0) {
                    currentIndex = (currentIndex + 1) % totalImages; // Move to the next image
                } else {
                    currentIndex = (currentIndex - 1 + totalImages) % totalImages; // Move to the previous image
                }
            }
            carouselInner.style.transition = 'transform 1s ease'; // Re-enable transition
            carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        function onMouseDown(event) {
            isDragging = true;
            startX = event.clientX;
            startTranslateX = -currentIndex * carouselInner.offsetWidth;
            carouselInner.style.transition = 'none'; // Disable transition during drag
        }

        function onMouseMove(event) {
            if (!isDragging) return;
            endX = event.clientX;
            const moveX = endX - startX;
            carouselInner.style.transform = `translateX(${startTranslateX + moveX}px)`;
        }

        function onMouseUp(event) {
            if (!isDragging) return;
            isDragging = false;
            const moveX = endX - startX;
            const threshold = carouselInner.offsetWidth / 3; // Adjust drag sensitivity here
            if (Math.abs(moveX) > threshold) {
                if (moveX < 0) {
                    currentIndex = (currentIndex + 1) % totalImages; // Move to the next image
                } else {
                    currentIndex = (currentIndex - 1 + totalImages) % totalImages; // Move to the previous image
                }
            }
            carouselInner.style.transition = 'transform 1s ease'; // Re-enable transition
            carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        // Attach event listeners for dragging and swiping
        carouselInner.addEventListener('mousedown', onMouseDown);
        carouselInner.addEventListener('mousemove', onMouseMove);
        carouselInner.addEventListener('mouseup', onMouseUp);
        carouselInner.addEventListener('mouseleave', onMouseUp); // Handle mouse leaving the carousel

        carouselInner.addEventListener('touchstart', onTouchStart);
        carouselInner.addEventListener('touchmove', onTouchMove);
        carouselInner.addEventListener('touchend', onTouchEnd);
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

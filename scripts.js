document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const totalItems = carouselItems.length;
    let currentIndex = 1; // Start at 1 to show the first real image
    const autoScrollInterval = 3000; // Time in milliseconds

    let startX, endX;
    let isDragging = false;
    let startTranslateX;

    // Duplicate first and last items to create seamless scrolling
    function cloneItems() {
        const firstClone = carouselItems[0].cloneNode(true);
        const lastClone = carouselItems[carouselItems.length - 1].cloneNode(true);
        carouselWrapper.appendChild(firstClone);
        carouselWrapper.insertBefore(lastClone, carouselItems[0]);
    }

    function updateCarousel() {
        carouselWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function nextSlide() {
        currentIndex++;
        if (currentIndex >= totalItems + 1) {
            // Disable transition for instant jump
            carouselWrapper.style.transition = 'none'; 
            currentIndex = 1; // Jump to the first real item
            carouselWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;

            // Force reflow to reset transition
            carouselWrapper.offsetHeight;

            // Re-enable transition and smoothly move to the first item
            setTimeout(() => {
                carouselWrapper.style.transition = 'transform 0.5s ease';
                updateCarousel();
            }, 50); // Small timeout to ensure transition reset
        } else {
            updateCarousel();
        }
    }

    function prevSlide() {
        currentIndex--;
        if (currentIndex < 0) {
            // Disable transition for instant jump
            carouselWrapper.style.transition = 'none';
            currentIndex = totalItems - 1; // Jump to the last real item
            carouselWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;

            // Force reflow to reset transition
            carouselWrapper.offsetHeight;

            // Re-enable transition and smoothly move to the last item
            setTimeout(() => {
                carouselWrapper.style.transition = 'transform 0.5s ease';
                updateCarousel();
            }, 50); // Small timeout to ensure transition reset
        } else {
            updateCarousel();
        }
    }

    function startAutoScroll() {
        return setInterval(nextSlide, autoScrollInterval);
    }

    function resetAutoScroll() {
        clearInterval(autoScroll);
        autoScroll = startAutoScroll();
    }

    let autoScroll = startAutoScroll(); // Start auto-scrolling when the page loads

    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('show');
        menuToggle.style.display = sidebar.classList.contains('show') ? 'none' : 'block';
    });

    document.addEventListener('click', function(event) {
        if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
            sidebar.classList.remove('show');
            menuToggle.style.display = 'block';
        }
    });

    // Handle mouse and touch events for carousel
    function onTouchStart(event) {
        isDragging = true;
        startX = event.touches ? event.touches[0].clientX : event.clientX;
        startTranslateX = -currentIndex * carouselWrapper.offsetWidth;
        carouselWrapper.style.transition = 'none'; // Disable transition during drag
    }

    function onTouchMove(event) {
        if (!isDragging) return;
        endX = event.touches ? event.touches[0].clientX : event.clientX;
        const moveX = endX - startX;
        carouselWrapper.style.transform = `translateX(${startTranslateX + moveX}px)`;
    }

    function onTouchEnd(event) {
        if (!isDragging) return;
        isDragging = false;
        const moveX = endX - startX;
        const threshold = carouselWrapper.offsetWidth / 3; // Adjust swipe sensitivity here
        if (Math.abs(moveX) > threshold) {
            if (moveX < 0) {
                nextSlide(); // Swipe left to go to the next slide
            } else {
                prevSlide(); // Swipe right to go to the previous slide
            }
        } else {
            // If the swipe distance is less than the threshold, revert to the current slide
            updateCarousel();
        }
        carouselWrapper.style.transition = 'transform 0.5s ease'; // Re-enable transition
        resetAutoScroll(); // Reset auto-scroll on manual navigation
    }

    carouselWrapper.addEventListener('mousedown', onTouchStart);
    carouselWrapper.addEventListener('mousemove', onTouchMove);
    carouselWrapper.addEventListener('mouseup', onTouchEnd);
    carouselWrapper.addEventListener('mouseleave', onTouchEnd); // Handle mouse leaving the carousel

    carouselWrapper.addEventListener('touchstart', onTouchStart);
    carouselWrapper.addEventListener('touchmove', onTouchMove);
    carouselWrapper.addEventListener('touchend', onTouchEnd);

    // Initialize carousel with cloned items
    cloneItems();
    updateCarousel();
});

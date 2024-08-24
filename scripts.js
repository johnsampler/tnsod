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

        function updateCarousel() {
            carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        function moveCarousel() {
            currentIndex++;
            carouselInner.style.transition = 'transform 1s ease';
            updateCarousel();

            if (currentIndex === totalImages) {
                setTimeout(() => {
                    carouselInner.style.transition = 'none'; // Disable transition for reset
                    currentIndex = 0;
                    updateCarousel();
                }, 1000); // Match this delay with the transition duration
            }
        }

        setInterval(moveCarousel, 3000);

        function onDragStart(event) {
            const clientX = event.touches ? event.touches[0].clientX : event.clientX;
            startX = clientX;
            startTranslateX = -currentIndex * carouselInner.offsetWidth;
            carouselInner.style.transition = 'none'; // Disable transition during drag
        }

        function onDragMove(event) {
            if (startX === undefined) return;
            const clientX = event.touches ? event.touches[0].clientX : event.clientX;
            const moveX = clientX - startX;
            carouselInner.style.transform = `translateX(${startTranslateX + moveX}px)`;
        }

        function onDragEnd(event) {
            if (startX === undefined) return;
            const clientX = event.touches ? event.touches[0].clientX : event.clientX;
            const moveX = clientX - startX;
            const threshold = carouselInner.offsetWidth / 3;
            if (Math.abs(moveX) > threshold) {
                currentIndex = moveX < 0 ? (currentIndex + 1) % totalImages : (currentIndex - 1 + totalImages) % totalImages;
            }
            carouselInner.style.transition = 'transform 1s ease'; // Re-enable transition
            updateCarousel();
            startX = undefined; // Reset for next drag
        }

        carouselInner.addEventListener('mousedown', onDragStart);
        carouselInner.addEventListener('mousemove', onDragMove);
        carouselInner.addEventListener('mouseup', onDragEnd);
        carouselInner.addEventListener('mouseleave', onDragEnd);

        carouselInner.addEventListener('touchstart', onDragStart);
        carouselInner.addEventListener('touchmove', onDragMove);
        carouselInner.addEventListener('touchend', onDragEnd);
    }

    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('show');
    });

    document.addEventListener('click', function(event) {
        if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
            sidebar.classList.remove('show');
        }
    });
});

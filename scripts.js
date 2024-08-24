document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const carouselInner = document.querySelector('.carousel-inner');
    const images = document.querySelectorAll('.carousel-inner img');
    const totalImages = images.length;
    let currentIndex = 0;

    // Updated commandments array without random functionality
    const commandments = [
        'El Duolingo knows best!',
        'Your daily lesson is mandatory!',
        'Speak only in your assigned language!'
    ];

    const commandmentText = document.getElementById('commandment-text');
    let currentIndexCommandment = 0;

    if (carouselInner) {
        carouselInner.innerHTML += carouselInner.innerHTML;

        function moveCarousel() {
            currentIndex++;
            carouselInner.style.transition = 'transform 1s ease';
            carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;

            if (currentIndex === totalImages) {
                setTimeout(() => {
                    carouselInner.style.transition = 'none';
                    carouselInner.style.transform = 'translateX(0)';
                    currentIndex = 0;
                }, 1000);
            }
            updateCommandment();
        }

        function updateCommandment() {
            commandmentText.classList.remove('show');

            setTimeout(() => {
                currentIndexCommandment = currentIndex % commandments.length;
                commandmentText.textContent = commandments[currentIndexCommandment];
                commandmentText.classList.add('show');
            }, 500);

            if (currentIndex === totalImages) {
                setTimeout(() => {
                    currentIndexCommandment = 0;
                    commandmentText.textContent = commandments[currentIndexCommandment];
                    commandmentText.classList.add('show');
                }, 1000);
            }
        }

        // Set interval to change images automatically every 3 seconds
        setInterval(moveCarousel, 3000);

        // Initialize with the first commandment
        commandmentText.textContent = commandments[currentIndexCommandment];
        commandmentText.classList.add('show');
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

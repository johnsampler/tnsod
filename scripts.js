document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const carouselInner = document.querySelector('.carousel-inner');
    const images = document.querySelectorAll('.carousel-inner img');
    const totalImages = images.length;
    let currentIndex = 0;

    // Updated commandments array without "Learn or Perish!"
    const commandments = [
        'El Duolingo knows best!',
        'Your daily lesson is mandatory!',
        'Speak only in your assigned language!'
    ];

    const commandmentText = document.getElementById('commandment-text');
    let currentIndexCommandment = 0;

    // Clone all images to create a seamless infinite loop
    if (carouselInner) {
        carouselInner.innerHTML += carouselInner.innerHTML;

        // Function to move the carousel to the next image
        function moveCarousel() {
            currentIndex++;
            carouselInner.style.transition = 'transform 1s ease';
            carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;

            // Update commandment text synchronously with the image change
            if (currentIndex === totalImages) {
                // Reset carousel to start position after a short delay
                setTimeout(() => {
                    carouselInner.style.transition = 'none'; // Disable transition for reset
                    carouselInner.style.transform = 'translateX(0)';
                    currentIndex = 0;
                }, 1000); // Match this delay with the transition duration
            }
            updateCommandment();
        }

        // Function to change commandment text with fade effect
        function updateCommandment() {
            // Start fade out
            commandmentText.classList.remove('show');

            // Ensure text change happens right after the fade-out starts
            setTimeout(() => {
                currentIndexCommandment = currentIndex % commandments.length; // Sync commandment with carousel
                commandmentText.textContent = commandments[currentIndexCommandment];
                
                // Start fade in
                commandmentText.classList.add('show');
            }, 500); // Match the fade-out duration

            // Handle special case for the last image
            if (currentIndex === totalImages) {
                // Sync commandment update precisely at the end of the carousel reset
                setTimeout(() => {
                    currentIndexCommandment = 0; // Ensure commandment is reset at loop start
                    commandmentText.textContent = commandments[currentIndexCommandment];
                    commandmentText.classList.add('show');
                }, 1000); // Duration to match carousel reset
            }
        }

        // Set interval to change images automatically every 3 seconds
        setInterval(moveCarousel, 3000);

        // Initialize with a random commandment
        commandmentText.textContent = commandments[Math.floor(Math.random() * commandments.length)];
        commandmentText.classList.add('show'); // Immediately show initial commandment
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

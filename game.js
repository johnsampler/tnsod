document.addEventListener('DOMContentLoaded', function() {
    const numberOfWordsToShow = 10; // Change this number to show more or fewer words

    fetch('https://johnsampler.github.io/tnsod/vocabulary.json')
        .then(response => response.json())
        .then(data => {
            const words = data.words;
            // Shuffle the words array
            words.sort(() => Math.random() - 0.5);

            // Slice the array to get the desired number of words
            const selectedWords = words.slice(0, numberOfWordsToShow);

            // Create and display the word elements
            const gameContainer = document.querySelector('.game-container');
            gameContainer.innerHTML = ''; // Clear existing content

            selectedWords.forEach(word => {
                const wordDiv = document.createElement('div');
                wordDiv.className = 'word';
                wordDiv.dataset.lang = 'en';
                wordDiv.dataset.pair = word.en;
                wordDiv.textContent = word.en;

                gameContainer.appendChild(wordDiv);

                const translationDiv = document.createElement('div');
                translationDiv.className = 'word';
                translationDiv.dataset.lang = 'es';
                translationDiv.dataset.pair = word.en;
                translationDiv.textContent = word.es;

                gameContainer.appendChild(translationDiv);
            });

            // Add game logic here (assuming game logic code is included)
            initializeGame(); // Call function to initialize game logic
        })
        .catch(error => console.error('Error fetching vocabulary:', error));
});

function initializeGame() {
    const words = document.querySelectorAll('.word');
    let selectedWords = [];

    words.forEach(word => {
        word.addEventListener('click', function() {
            if (selectedWords.length < 2) {
                this.classList.add('selected');
                selectedWords.push(this);

                if (selectedWords.length === 2) {
                    const [first, second] = selectedWords;
                    if (first.dataset.pair === second.dataset.pair) {
                        first.classList.add('correct');
                        second.classList.add('correct');
                        setTimeout(() => {
                            first.style.display = 'none';
                            second.style.display = 'none';
                        }, 300); // Delay for smooth disappearance
                    } else {
                        first.classList.add('incorrect');
                        second.classList.add('incorrect');
                        setTimeout(() => {
                            first.classList.remove('incorrect');
                            second.classList.remove('incorrect');
                            first.classList.remove('selected');
                            second.classList.remove('selected');
                        }, 1000); // Delay for showing incorrect feedback
                    }
                    selectedWords = [];
                }
            }
        });
    });
}

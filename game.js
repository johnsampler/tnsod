document.addEventListener('DOMContentLoaded', function () {
    const numberOfWordsToShow = 20; // Change this number to show more or fewer words

    fetch('https://johnsampler.github.io/tnsod/vocabulary.json')
        .then(response => response.json())
        .then(data => {
            const words = data.words;
            // Shuffle the words array
            words.sort(() => Math.random() - 0.5);

            // Slice the array to get the desired number of words
            const selectedWords = words.slice(0, numberOfWordsToShow);

            // Create a combined array of English and Spanish pairs
            const displayWords = [];
            selectedWords.forEach(word => {
                displayWords.push({ lang: 'en', text: word.en, pair: word.en });
                displayWords.push({ lang: 'es', text: word.es, pair: word.en });
            });

            // Shuffle the combined array
            displayWords.sort(() => Math.random() - 0.5);

            // Create and display the word elements
            const gameContainer = document.querySelector('.game-container');
            gameContainer.innerHTML = ''; // Clear existing content

            displayWords.forEach(word => {
                const wordDiv = document.createElement('div');
                wordDiv.className = 'word';
                wordDiv.dataset.lang = word.lang;
                wordDiv.dataset.pair = word.pair;
                wordDiv.textContent = word.text;

                gameContainer.appendChild(wordDiv);
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
        word.addEventListener('click', function () {
            // If the clicked word is already selected, deselect it
            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
                selectedWords = selectedWords.filter(w => w !== this);
                return; // Exit the function early
            }

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
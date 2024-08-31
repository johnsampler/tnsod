document.addEventListener('DOMContentLoaded', function () {
    const numberOfWordsToShow = 20; // Adjust as needed
    const languageTag = document.body.getAttribute('data-language'); // Get language from body attribute

    // Fetch vocabulary based on the language
    fetch(`https://johnsampler.github.io/tnsod/vocabulary-${languageTag}.json`)
        .then(response => response.json())
        .then(data => {
            const words = data.words;
            // Shuffle and select words
            words.sort(() => Math.random() - 0.5);
            const selectedWords = words.slice(0, numberOfWordsToShow);

            // Create and shuffle display words
            const displayWords = [];
            selectedWords.forEach(word => {
                displayWords.push({ lang: languageTag, text: word[languageTag], pair: word.en });
                displayWords.push({ lang: 'en', text: word.en, pair: word.en });
            });
            displayWords.sort(() => Math.random() - 0.5);

            // Display words
            const gameContainer = document.querySelector('.game-container');
            gameContainer.innerHTML = '';
            displayWords.forEach(word => {
                const wordDiv = document.createElement('div');
                wordDiv.className = 'word';
                wordDiv.dataset.lang = word.lang;
                wordDiv.dataset.pair = word.pair;
                wordDiv.textContent = word.text;
                gameContainer.appendChild(wordDiv);
            });

            initializeGame(); // Initialize game logic
        })
        .catch(error => console.error('Error fetching vocabulary:', error));
});

function initializeGame() {
    const words = document.querySelectorAll('.word');
    let selectedWords = [];

    words.forEach(word => {
        word.addEventListener('click', function () {
            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
                selectedWords = selectedWords.filter(w => w !== this);
                return;
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
                        }, 300);
                    } else {
                        first.classList.add('incorrect');
                        second.classList.add('incorrect');
                        setTimeout(() => {
                            first.classList.remove('incorrect');
                            second.classList.remove('incorrect');
                            first.classList.remove('selected');
                            second.classList.remove('selected');
                        }, 1000);
                    }
                    selectedWords = [];
                }
            }
        });
    });
}

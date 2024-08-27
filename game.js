document.addEventListener('DOMContentLoaded', function() {
    // Fetch vocabulary from JSON
    fetch('vocabulary.json')
        .then(response => response.json())
        .then(data => {
            const wordsContainer = document.querySelector('.game-container');

            // Shuffle the words to ensure random placement
            const shuffledWords = shuffleWords(data.words);

            // Add words to the game container
            shuffledWords.forEach(wordObj => {
                const enWord = createWordElement(wordObj.en, 'en', wordObj.pair);
                const esWord = createWordElement(wordObj.es, 'es', wordObj.pair);

                // Append words to the container
                wordsContainer.appendChild(enWord);
                wordsContainer.appendChild(esWord);
            });

            // Initialize game logic after words are loaded
            initializeGame();
        });

    function shuffleWords(words) {
        return words.flatMap(word => [word, word])
                    .sort(() => Math.random() - 0.5);
    }

    function createWordElement(text, lang, pair) {
        const wordDiv = document.createElement('div');
        wordDiv.classList.add('word');
        wordDiv.setAttribute('data-lang', lang);
        wordDiv.setAttribute('data-pair', pair);
        wordDiv.textContent = text;
        return wordDiv;
    }

    function initializeGame() {
        const words = document.querySelectorAll('.word');
        let selectedWords = [];
        let clickable = true;

        function resetSelection() {
            selectedWords.forEach(word => {
                word.classList.remove('incorrect', 'selected');
            });
            selectedWords = [];
            clickable = true;
        }

        function hideMatchedWords(first, second) {
            setTimeout(() => {
                first.style.display = 'none';
                second.style.display = 'none';
            }, 300);
        }

        words.forEach(word => {
            word.addEventListener('click', function() {
                if (clickable && !this.classList.contains('selected')) {
                    this.classList.add('selected');
                    selectedWords.push(this);

                    if (selectedWords.length === 2) {
                        const [first, second] = selectedWords;
                        clickable = false;

                        if (first.dataset.pair === second.dataset.pair) {
                            first.classList.add('correct');
                            second.classList.add('correct');
                            hideMatchedWords(first, second);
                            resetSelection();
                        } else {
                            first.classList.add('incorrect');
                            second.classList.add('incorrect');
                            setTimeout(resetSelection, 1000);
                        }
                    }
                }
            });
        });
    }
});

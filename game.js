document.addEventListener('DOMContentLoaded', function() {
    // Fetch vocabulary from JSON
    fetch('https://johnsampler.github.io/tnsod/vocabulary.json')
        .then(response => response.json())
        .then(data => {
            const wordsContainer = document.querySelector('.game-container');

            // Clear any existing words (if reloading)
            wordsContainer.innerHTML = '';

            // Create paired word elements
            const pairedWords = createPairedWords(data.words);

            // Shuffle the paired words
            const shuffledWords = shuffleArray(pairedWords);

            // Add words to the game container
            shuffledWords.forEach(wordObj => {
                const wordElement = createWordElement(wordObj.text, wordObj.lang, wordObj.pair);
                wordsContainer.appendChild(wordElement);
            });

            initializeGame();
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });

    function createPairedWords(words) {
        return words.flatMap(word => [
            { text: word.en, lang: 'en', pair: word.pair },
            { text: word.es, lang: 'es', pair: word.pair }
        ]);
    }

    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
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

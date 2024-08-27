document.addEventListener('DOMContentLoaded', function() {
    // Fetch vocabulary from JSON
    fetch('https://johnsampler.github.io/tnsod/vocabulary.json')
        .then(response => response.json())
        .then(data => {
            const wordsContainer = document.querySelector('.game-container');
            
            // Clear any existing content in the game container
            wordsContainer.innerHTML = '';

            // Create pairs and shuffle words
            const wordPairs = createWordPairs(data.words);
            const shuffledPairs = shuffleArray(wordPairs);

            // Add words to the game container
            shuffledPairs.forEach(wordPair => {
                const enWord = createWordElement(wordPair.en, 'en', wordPair.pair);
                const esWord = createWordElement(wordPair.es, 'es', wordPair.pair);

                wordsContainer.appendChild(enWord);
                wordsContainer.appendChild(esWord);
            });

            initializeGame();
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });

    function createWordPairs(words) {
        // Create pairs of words and ensure each word is only used once in its pair
        let pairs = [];
        words.forEach(word => {
            pairs.push({ text: word.en, lang: 'en', pair: word.pair });
            pairs.push({ text: word.es, lang: 'es', pair: word.pair });
        });
        return pairs;
    }

    function shuffleArray(array) {
        // Shuffle the array in place
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
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

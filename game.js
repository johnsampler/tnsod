document.addEventListener('DOMContentLoaded', function() {
    // Word matching game logic
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
});

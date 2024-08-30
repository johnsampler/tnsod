document.querySelectorAll('.language-option').forEach(button => {
    button.addEventListener('click', function() {
        const selectedLanguage = this.dataset.language;
        localStorage.setItem('selectedLanguage', selectedLanguage);
        window.location.href = 'matching-game.html'; // Redirect to the game page
    });
});
document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('comment-form');
    const commentsSection = document.getElementById('comments-section');

    // Load comments from local storage
    function loadComments() {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        commentsSection.innerHTML = comments.map(comment => `
            <div class="comment">
                <div class="name">${comment.name}</div>
                <div class="text">${comment.text}</div>
            </div>
        `).join('');
    }

    // Save comments to local storage
    function saveComment(name, text) {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push({ name, text });
        localStorage.setItem('comments', JSON.stringify(comments));
    }

    // Handle form submission
    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const comment = document.getElementById('comment').value;

        saveComment(name, comment);

        // Clear form fields
        commentForm.reset();

        // Reload comments
        loadComments();
    });

    // Initial load of comments
    loadComments();
});

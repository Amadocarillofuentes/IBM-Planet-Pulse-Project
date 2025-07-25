function toggleTCGSettingsModal() {
    const modal = document.getElementById('settings-modal-tcg');
    modal.classList.toggle('hidden');
}

document.getElementById('darkModeToggleModal').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', this.checked ? 'enabled' : 'disabled');
});


if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    document.getElementById('darkModeToggleModal').checked = true;
}


document.querySelector('.newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('.newsletter-input').value;
    alert('Thank you for subscribing! We\'ll send you weekly updates about air quality and environmental news.');
    this.reset();
});


document.querySelectorAll('.article-card, .featured-article').forEach(card => {
    card.addEventListener('click', function() {
        console.log('Navigate to article:', this.querySelector('.article-title, .featured-title').textContent);
    });
});


document.querySelectorAll('.category-item').forEach(item => {
    item.addEventListener('click', function() {
        const category = this.querySelector('span').textContent;
        console.log('Filter by category:', category);
    });
});


document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', function() {
        console.log('Filter by tag:', this.textContent);
    });
});

document.querySelectorAll('.popular-post').forEach(post => {
    post.addEventListener('click', function() {
        const title = this.querySelector('.popular-title').textContent;
        console.log('Navigate to popular post:', title);
    });
});

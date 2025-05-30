const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('newQuote');
const quoteCard = document.querySelector('.quote-card');

const quotes = [
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "Tell me and I forget. Teach me and I remember. Involve me and I learn.", author: "Benjamin Franklin" },
    { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
    { text: "Do not wait to strike till the iron is hot; but make the iron hot by striking.", author: "William Butler Yeats" },
    { text: "The best way to predict the future is to create it.", author: "Peter Drucker" }
    // Add more quotes here!
];

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function displayQuote() {
    quoteCard.style.opacity = 0;
    quoteCard.style.transform = 'translateY(20px)';
    setTimeout(() => {
        const currentQuote = getRandomQuote();
        quoteText.textContent = currentQuote.text;
        authorText.textContent = currentQuote.author;
        quoteCard.style.opacity = 1;
        quoteCard.style.transform = 'translateY(0)';
    }, 300); // Small delay for the fade-in effect
}

newQuoteBtn.addEventListener('click', displayQuote);

// Initial quote load
displayQuote();
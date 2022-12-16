const ENDPOINT = 'https://poetrydb.org/random';

/**Display poem details in card*/
const renderCard = (poem) => {
    const poemsDiv = document.querySelector('.poems');
    /**Create necessary elements */
    const card = document.createElement('div');
    const img = document.createElement('img');
    const author = document.createElement('p');
    const title = document.createElement('p');

    /**add classes to the elements for styling*/
    card.classList.add('poem');
    img.classList.add('profile-pic');
    author.classList.add('author');
    title.classList.add('title');

    /**Add text */
    img.src = `./public/undraw_male_profile.svg`;
    author.textContent = poem.author;
    title.textContent = poem.title;

    /**Append the elements */
    card.appendChild(img);
    card.appendChild(author);
    card.appendChild(title);
    poemsDiv.appendChild(card);
}

/**Fetch random poem */
const fetchRandom = (endpoint) => {
    fetch(endpoint).then(response => response.json())
    .then(data => {
        data.forEach(poem => {
            renderCard(poem);
        })
    })
}



document.addEventListener('DOMContentLoaded', () => {
    fetchRandom(`${ENDPOINT}/12`);
});
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
    img.src = `./resources/undraw_male_profile.svg`;
    img.alt = "A profile picture";
    author.textContent = poem.author;
    title.textContent = poem.title;

    /**Append the elements */
    card.appendChild(img);
    card.appendChild(author);
    card.appendChild(title);
    poemsDiv.appendChild(card);

    card.addEventListener("click", () => {
        renderLines(poem);
    })
}

/**Render an individual poem's lines */
const renderLines = (poem) => {
    const lineSection = document.querySelector('#lines');

    const linesDiv = document.createElement('div');
    const title = document.createElement('h4');
    const linesParagraph = document.createElement('p');

    linesDiv.classList.add('lines-div');
    linesParagraph.classList.add('lines');

    title.innerText = poem.title;
    linesParagraph.innerText = poem.lines;

    /**Append the elements */
    linesDiv.appendChild(title);
    linesDiv.appendChild(linesParagraph);
    lineSection.appendChild(linesDiv);

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
    fetchRandom(`${ENDPOINT}/15`);
});
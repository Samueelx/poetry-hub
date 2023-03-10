const ENDPOINT = 'https://poetrydb.org/random';
const TITLES_ENDPOINT = 'https://poetrydb.org/title';

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
        const poemSection = document.querySelector('#lines');
        if(poemSection.children !== null)
        poemSection.innerHTML = "";

        renderLines(poem);
    });
}

/**Render an individual poem's lines */
const renderLines = (poem) => {
    const lineSection = document.querySelector('#lines');

    const linesDiv = document.createElement('div');
    const title = document.createElement('h4');
    const linesParagraph = document.createElement('p');
    const poetParagraph = document.createElement('p');

    linesDiv.classList.add('lines-div');
    linesParagraph.classList.add('lines');

    title.innerText = poem.title;
    linesParagraph.innerText = poem.lines;
    poetParagraph.innerText = `Author: ${poem.author}.`;

    /**Create button to reset the lines section/div */
    const reset = document.createElement('button');
    reset.textContent = 'Reset';
    reset.classList.add('reset');

    /**Append the elements */
    linesDiv.appendChild(title);
    linesDiv.appendChild(linesParagraph);
    linesDiv.appendChild(poetParagraph);
    lineSection.appendChild(linesDiv);

    /**Add like and dislike buttons */
    let upvotes = 0, downvotes = 0;
    linesDiv.insertAdjacentHTML("beforeend", `
        <button class="like" id="upvotes">
            <i class="fa fa-thumbs-up fa-lg" aria-hidden="true"> UPVOTES: ${upvotes} </i>
        </button>
        <button class="like" id="downvotes">
            <i class="fa fa-thumbs-down fa-lg" aria-hidden="true"> DOWNVOTES: ${downvotes} </i>
        </button>
    `);

    /**Insert the reset button */
    linesDiv.insertAdjacentElement('afterbegin', reset);

    /**Clear the lines */
    reset.addEventListener('click', () => {
        linesDiv.remove();
    });

    /**Event handler to add on votes/downvotes buttons */
    const upvoteButton = linesDiv.querySelector('#upvotes');
    const downvoteButton = linesDiv.querySelector('#downvotes');
    upvoteButton.addEventListener('click', () => {
        ++upvotes;
        upvoteButton.innerHTML = `<i class="fa fa-thumbs-up fa-lg" aria-hidden="true"> UPVOTES: ${upvotes} </i>`;
    });

    downvoteButton.addEventListener('click', () => {
        ++downvotes;
        downvoteButton.innerHTML = `<i class="fa fa-thumbs-down fa-lg" aria-hidden="true"> DOWNVOTES: ${downvotes} </i>`;
    });

}

/**Capture user input from search form */
const searchInput = () => {
    const searchForm = document.querySelector('#searchForm');
    const inputElement = searchForm.querySelector('input');
    const inputValue = inputElement.value;
    // console.log(inputValue);
    return inputValue;
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

/**Search for specific poem from API */
const searchPoems = (event) => {
    event.preventDefault();
    const inputValue = searchInput();
    fetch(`${TITLES_ENDPOINT}/${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
        /**Remove lines if present */
        const linesDiv = document.querySelector('#lines');
        if(linesDiv.children !== null)
        linesDiv.replaceChildren();

        /**Remove cards */
        const poemsDiv = document.querySelector('.poems');
        poemsDiv.replaceChildren();

        /**Render results in cards */
        data.forEach(poem => {
            renderCard(poem);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchRandom(`${ENDPOINT}/15`);
    const searchForm = document.querySelector('#searchForm');
    const loginLink = document.querySelector('#loginLink');
    searchForm.addEventListener('submit', searchPoems);

    /**event listener to display login form*/
    loginLink.addEventListener('click', () => {
        const mainSection = document.querySelector('#main');
        const loginDiv = document.querySelector('.login-form');
        mainSection.style.display = 'none';
        loginDiv.style.setProperty('display', 'flex');

        /**display the main after login details are submitted */
        const loginForm = loginDiv.querySelector('.form');
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault()
            mainSection.style.setProperty('display', 'initial');
            loginDiv.style.display = 'none';
        });
    });
});
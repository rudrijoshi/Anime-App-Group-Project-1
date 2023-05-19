var apiKey = "63c29c7383msh9695ca611a01d2ep102982jsn2de854c3525a"
var apiHost = "10000-anime-quotes-with-pagination-support.p.rapidapi.com"
var searchButtonEle = document.getElementById("search-button");
var searchFieldEle = document.getElementById("search-field");
var quote = document.getElementById("quote-field")
var searchHistoryEle = document.getElementById("search-history")

//Function to capitalise first letter of search input
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//Function to generate and display random anime quote
async function getAnimeQuote() {
    var request = `https://cors-anywhere.herokuapp.com/https://10000-anime-quotes-with-pagination-support.p.rapidapi.com/rapidHandler/random?rapidapi-key=${apiKey}`;
    const response = await fetch(request);
    const data = await response.json();
    console.log(data);
    quote.textContent = ('"' + data.quote + '"' + " Anime: " + data.animename)
}

//Button creation function
function createButton(className, iconClass) {
    const button = document.createElement('a');
    button.href = '#';
    button.className = 'button ' + className;
    const icon = document.createElement('i');
    icon.className = iconClass;
    button.appendChild(icon);
    return button;
  }
  
//Execute search function
//Api fetch
async function executeSearch(searchValue) {

    const animeSearchHistory = JSON.parse(localStorage.getItem('animeSearchHistory'))


    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'anime-db.p.rapidapi.com'
        }
    };

    const searchParams = new URLSearchParams({
        page: '1',
        size: '9',
        search: searchValue,
        sortBy: 'ranking',
        sortOrder: 'asc'
    });

    const url = `https://anime-db.p.rapidapi.com/anime?${searchParams}`;

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        if (animeSearchHistory) {
            if (!animeSearchHistory.includes(searchValue)) {
                animeSearchHistory.push(searchValue)
                localStorage.setItem('animeSearchHistory', JSON.stringify(animeSearchHistory))
            }
        } else {
            localStorage.setItem('animeSearchHistory', JSON.stringify([searchValue]))
        }

        //Result Card generation
        searchFieldEle.value = "";

        var mainResults = document.getElementById('main-body');
        mainResults.innerHTML = "";
       
        for (let i = 0; i < data.data.length; i++) {
            console.log(i);

        var resultsArea = document.createElement("div")
        resultsArea.className = "column";

        var cardLink = document.createElement("a");
        cardLink.href = data.data[i].link;
        cardLink.className = "card-link";
        resultsArea.addEventListener("click", function(event) {
            event.stopPropagation();
            window.location.href = data.data[i].link;
        });
        
        var card = document.createElement("div");
        card.className = "card";
        
        var cardContent = document.createElement("div");
        cardContent.className = "card-content";
        var titleEl = document.createElement("h2");
        titleEl.className = "title";
        titleEl.textContent = data.data[i].title;

        var episodeEl = document.createElement("h3");
        episodeEl.className = "subtitle";
        episodeEl.textContent = "Number of episodes:" + " " + data.data[i].episodes;

        var genreEl = document.createElement("p");
        genreEl.className = "col-12 col-md-9 p-3";
        genreEl.textContent = "Genre: " + data.data[i].genres[0];

        var imageEl = document.createElement("img");
        imageEl.setAttribute("src", data.data[i].image);

        var descrEl = document.createElement('p');
        descrEl.className = "desc"
        descrEl.textContent = data.data[i].synopsis;

        var footer = document.createElement("footer");
        footer.className = "card-footer";
        var footerItem = document.createElement("div");
        footerItem.className = "card-footer-item";
        var button1 = createButton("is-success", "fa fa-thumbs-o-up");
        var button2 = createButton("is-danger", "fa fa-thumbs-o-down");
        var button3 = createButton("is-info", "fa fa-retweet");

        cardContent.appendChild(titleEl);
        cardLink.appendChild(card);
        cardContent.appendChild(episodeEl);
        cardContent.appendChild(genreEl);
        cardContent.appendChild(imageEl);
        cardContent.appendChild(descrEl);
        footerItem.appendChild(button1);
        footerItem.appendChild(button2);
        footerItem.appendChild(button3);  
        card.appendChild(cardContent);
        card.appendChild(footer);
        footer.appendChild(footerItem);
        resultsArea.appendChild(cardLink);
        resultsArea.appendChild(card);
        mainResults.appendChild(resultsArea);  
       
        var sentences = data.data[i].synopsis.split(/[.]/);
        var limitedSynopsis = sentences.slice(0, 3).join('. ');
        descrEl.innerHTML = limitedSynopsis + ".Read More...";
        populateSearchHistory()
       }
    } catch (error) {
        console.error(error);
    }
}

//Function to create search history buttons
function populateSearchHistory() {
    if (localStorage.getItem('animeSearchHistory')) {
        searchHistoryEle.innerHTML = ''
        const array = JSON.parse(localStorage.getItem('animeSearchHistory'))

        array.forEach((searchItem) => {
            const button = document.createElement('button')
            button.textContent = capitalizeFirstLetter(searchItem)
            button.addEventListener('click', () => {
                executeSearch(searchItem)
            })
            searchHistoryEle.append(button)
        })
    }
}

//Function to clear local storage search history
function clearSearchHistory() {
    var animeSearchHistory = JSON.parse(localStorage.getItem('animeSearchHistory'));
  
    if (animeSearchHistory) {
      animeSearchHistory.splice(0);
      localStorage.setItem('animeSearchHistory', JSON.stringify(animeSearchHistory));
      searchHistoryEle.innerHTML = '';
    }
  }


//Event Listeners
//Function so that search executes with Enter
searchFieldEle.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      executeSearch(searchFieldEle.value)
    }
  });


//Search click event listener
searchButtonEle.addEventListener("click", () => {
    executeSearch(searchFieldEle.value)
})

//Clear history button event listener
var clearHistoryButton = document.querySelector("#clear-button");
clearHistoryButton.addEventListener("click", clearSearchHistory);

//Function calls
populateSearchHistory()
getAnimeQuote();
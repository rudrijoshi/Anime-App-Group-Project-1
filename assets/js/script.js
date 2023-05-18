var apiKey = "63c29c7383msh9695ca611a01d2ep102982jsn2de854c3525a"
var apiHost = "10000-anime-quotes-with-pagination-support.p.rapidapi.com"
var searchButtonEle = document.getElementById("search-button");
var searchFieldEle = document.getElementById("search-field");
var quote = document.getElementById("quote-field")
var searchHistoryEle = document.getElementById("search-history")

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function getAnimeList() {
    var request = `https://anime-db.p.rapidapi.com/anime?page=1&size=1&rapidapi-key=${apiKey}`;
    const response = await fetch(request);
    const data = await response.json();
    console.log(data);
    var titleEl = document.querySelector('.title');
    titleEl.textContent =  data.data[0].title;

    var episodeEl = document.querySelector('.subtitle');
    episodeEl.textContent = "Number of episodes" + " " + data.data[0].episodes;

    var bodyEl = document.querySelector("#result-input");
    bodyEl.textContent = data.data[0].genres[0];

    var imageEl = document.querySelector("#result-image");
    imageEl.setAttribute("src", data.data[0].image);
    
    var descrEl = document.querySelector('#desc');
    descrEl.innerHTML = data.data[0].synopsis;

    var sentences = data.data[0].synopsis.split(/[.]/);
    var limitedSynopsis = sentences.slice(0,3).join('. ');
    descrEl.innerHTML = limitedSynopsis + ".Read More...";

}

async function getAnimeQuote() {
    var request = `https://10000-anime-quotes-with-pagination-support.p.rapidapi.com/rapidHandler/random?rapidapi-key=${apiKey}`;
    // var request = `https://cors-anywhere.herokuapp.com/https://10000-anime-quotes-with-pagination-support.p.rapidapi.com/rapidHandler/random?rapidapi-key=${apiKey}`;
    const response = await fetch(request);
    const data = await response.json();
    console.log(data);
    quote.textContent = ('"' + data.quote + '"' + " Anime: " + data.animename)
}

searchButtonEle.addEventListener("click", ()=>{
    executeSearch(searchFieldEle.value)
})

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
        size: '10',
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
        populateSearchHistory()
    } catch (error) {
        console.error(error);
    }
}


function populateSearchHistory() {
    if (localStorage.getItem('animeSearchHistory')) {
        searchHistoryEle.innerHTML = ''
        const array = JSON.parse(localStorage.getItem('animeSearchHistory'))

        array.forEach((searchItem) => {
            const button = document.createElement('button')
            button.textContent = capitalizeFirstLetter(searchItem)
            button.addEventListener('click', ()=>{
                executeSearch(searchItem)
            })
            searchHistoryEle.append(button)
        })
    }
}



populateSearchHistory()
getAnimeList();
getAnimeQuote();
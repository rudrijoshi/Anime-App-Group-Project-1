var apiKey = "63c29c7383msh9695ca611a01d2ep102982jsn2de854c3525a"
var apiHost = "10000-anime-quotes-with-pagination-support.p.rapidapi.com"
var searchButtonEle = document.getElementById("search-button");
var searchFieldEle = document.getElementById("search-field");
var quote = document.getElementById("quote-field")


async function getAnimeList() {
    var request = `https://anime-db.p.rapidapi.com/anime?page=1&size=1&rapidapi-key=${apiKey}`;
    const response = await fetch(request);
    const data = await response.json();
    console.log(data);
}

async function getAnimeQuote() {
    var request = `https://10000-anime-quotes-with-pagination-support.p.rapidapi.com/rapidHandler/random?rapidapi-key=${apiKey}`;
    // var request = `https://cors-anywhere.herokuapp.com/https://10000-anime-quotes-with-pagination-support.p.rapidapi.com/rapidHandler/random?rapidapi-key=${apiKey}`;
    const response = await fetch(request);
    const data = await response.json();
    console.log(data);
    quote.textContent = ('"' + data.quote + '"' + " Anime: " + data.animename)
}

searchButtonEle.addEventListener("click", executeSearch)

async function executeSearch() {
    console.log(searchFieldEle.value)
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
        search: searchFieldEle.value,
        sortBy: 'ranking',
        sortOrder: 'asc'
      });
      
      const url = `https://anime-db.p.rapidapi.com/anime?${searchParams}`;
      
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
}



getAnimeList();
getAnimeQuote();
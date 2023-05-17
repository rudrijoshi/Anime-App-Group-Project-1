var apiKey = "63c29c7383msh9695ca611a01d2ep102982jsn2de854c3525a"
var searchButtonEle = $("#search-button");
var searchFieldEle = $("#search-field");

async function getAnimeList() {
    var request = `https://anime-db.p.rapidapi.com/anime?page=1&size=5&rapidapi-key=${apiKey}`;
    const response = await fetch(request);
    const data = await response.json();
    console.log(data);
}

async function getAnimeQuote() {
    var request = `https://anime-quotes1.p.rapidapi.com/api/quotes/?rapidapi-key=${apiKey}`;
    const response = await fetch(request);
    const data = await response.json();
    console.log(data);
}


getAnimeList();
getAnimeQuote();
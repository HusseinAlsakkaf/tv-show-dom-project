var allEpisodes = getAllEpisodes();
var episodeCode = "";

var filteredEpisodes = [];
// search code
const searchBar = document.getElementById("searchBar");

searchBar.addEventListener('keyup', (e) => {
    var searchTerm = e.target.value;
    filteredEpisodes = allEpisodes.filter((allEpisodes) => {
        return allEpisodes.name.includes(searchTerm) || allEpisodes.summary.includes(searchTerm);

    });
    //console.log(filteredEpisodes[0]); 

    //filteredEpisodes.map(displayEpisodes);
    displayEpisodes(filteredEpisodes);

});





//main function
function displayEpisodes(filteredEpisodes) {
    // episode code

    if (filteredEpisodes.number <= 9 && filteredEpisodes.season <= 9) {
        episodeCode = `S0${filteredEpisodes.season}E0${filteredEpisodes.number}`;
    } else if (filteredEpisodes.number <= 9 && filteredEpisodes.season > 9) {
        episodeCode = `S${filteredEpisodes.season}0E${filteredEpisodes.number}`;
    } else if (filteredEpisodes.number > 9 && filteredEpisodes.season <= 9) {
        episodeCode = `S0${filteredEpisodes.season}E${filteredEpisodes.number}`;
    } else if (filteredEpisodes.number > 9 && filteredEpisodes.season > 9) {
        episodeCode = `S${filteredEpisodes.season}E${filteredEpisodes.number}`;
    }

    //div 
    var episodeDiv = document.createElement('div');
    episodeDiv.className = "episodeDiv";
    document.body.appendChild(episodeDiv);
    // title and episode code
    var episodeTitle = document.createElement('h2');
    episodeTitle.className = "episodeTitle";
    episodeTitle.innerHTML = `${filteredEpisodes.name} ${episodeCode}`;
    episodeDiv.appendChild(episodeTitle);
    //img
    var episodeImg = document.createElement('img');
    episodeImg.src = filteredEpisodes.image.medium;
    episodeDiv.appendChild(episodeImg);
    episodeImg.className = "episodeImg";
    //summary text
    var summary = document.createElement('p');
    summary.innerHTML = filteredEpisodes.summary;
    episodeDiv.appendChild(summary);
    summary.className = "summary";


}


//console.log(filteredEpisodes.name);
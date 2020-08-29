//You can edit ALL of the code here
/* function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  
} */

//window.onload = setup; 
//=======================================================================

var episodeFrames = document.getElementById('episodeFrames');
var searchBar = document.getElementById('searchBar');
var allEpisodes = getAllEpisodes();
var episodeCode = "";
var searchResults = document.getElementById('searchResults');



searchBar.addEventListener('keyup', function(e){
  var searchTerm = e.target.value.toLowerCase();
  
  var filteredEpisodes = allEpisodes.filter((episode) => {
  
    return (
      episode.name.toLowerCase().includes(searchTerm) ||
      episode.summary.toLowerCase().includes(searchTerm)
    );
    
  });

  displayCharacters(filteredEpisodes);
  
});

/* const loadCharacters = async () => {
  try {
    const res = await fetch('https://api.tvmaze.com/shows/82/episodes');
    allEpisodes = await res.json();
    displayCharacters(allEpisodes);
  } catch (err) {
    console.error(err);
  }
}; */

const displayCharacters = (episodes) => {
 
  const htmlString = episodes.map((episodes) => {
     
      if (episodes.number <= 9 && episodes.season <= 9) {
        episodeCode = `S0${episodes.season}E0${episodes.number}`;
      } else if (episodes.number <= 9 && episodes.season > 9) {
        episodeCode = `S${episodes.season}0E${episodes.number}`;
      } else if (episodes.number > 9 && episodes.season <= 9) {
        episodeCode = `S0${episodes.season}E${episodes.number}`;
      } else if (episodes.number > 9 && episodes.season > 9) {
        episodeCode = `S${episodes.season}E${episodes.number}`;
      } 
    
      return `
            <div class="character">
                <h2>${episodes.name} ${episodeCode}</h2>
                <p> ${episodes.summary}</p>
                <img src="${episodes.image.medium}"></img>
            </div>
        `;
    });
    //.join('');
   
  searchResults.innerHTML = `Displaying ${htmlString.length} of 73`;
  episodeFrames.innerHTML = htmlString;
  
};

//loadCharacters();
displayCharacters(allEpisodes);



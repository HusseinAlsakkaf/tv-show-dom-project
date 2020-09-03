//variables declaration
var allEpisodes = getAllEpisodes();
var episodeFrames = document.getElementById('episodeFrames');
var searchBar = document.getElementById('searchBar');
var episodeCode = "";
var searchResults = document.getElementById('searchResults');
var selectList = document.getElementById("selects");



// Live Search 
 searchBar.addEventListener('keyup', function(e){
  var searchTerm = e.target.value.toLowerCase();  
   var filteredEpisodes = allEpisodes.filter((episode) => {
  
    return (
      episode.name.toLowerCase().includes(searchTerm) ||
      episode.summary.toLowerCase().includes(searchTerm)
    );
    
  });
   
  displayEpisodes(filteredEpisodes);
  
}); 


// display episods function
const displayEpisodes = (filteredEpisodes) => {

 /*
  this code is not working however it is supposed
 to store -the episode that was clicked from the dropdown list- it is supposed to store it 
 in the "filteredEpisodes" variable. This way the code will only display the selected episode 
 from the dropdown list 
   */
  selectList.onchange = function () {

     filteredEpisodes = allEpisodes.filter((episode) => {

      this.value.toLowerCase() == episode.name.toLowerCase();
    });  


  }  
 
  // using map to populate the page with the filtered episodes
  const htmlString = filteredEpisodes.map((episodes) => {
// creating a dropdown list
    var option = document.createElement("option");
    option.value = episodes.name;
    option.text = episodes.name;
    selectList.appendChild(option);
     
  
// episodes format code

      if (episodes.number <= 9 && episodes.season <= 9) {
        episodeCode = `S0${episodes.season}E0${episodes.number}`;
      } else if (episodes.number <= 9 && episodes.season > 9) {
        episodeCode = `S${episodes.season}0E${episodes.number}`;
      } else if (episodes.number > 9 && episodes.season <= 9) {
        episodeCode = `S0${episodes.season}E${episodes.number}`;
      } else if (episodes.number > 9 && episodes.season > 9) {
        episodeCode = `S${episodes.season}E${episodes.number}`;
      } 
  
      
    
    // displaying episodes
    
      return `
            <div>
                <h2>${episodes.name} ${episodeCode}</h2>
                <p> ${episodes.summary}</p>
                <img src="${episodes.image.medium}"></img>
            </div>
        `;
    });
  
  
  searchResults.innerHTML = `Displaying ${htmlString.length} of ${allEpisodes.length}`;
  episodeFrames.innerHTML = htmlString;
  
};



/* calling the display function with all episodes as parameter in order to diplay
 all the episodes before entering a search term */

displayEpisodes(allEpisodes);
 
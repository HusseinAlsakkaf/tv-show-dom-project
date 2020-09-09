//variables declaration
var allEpisodes = getAllEpisodes();
var episodeFrames = document.getElementById('episodeFrames');
var searchBar = document.getElementById('searchBar');
var episodeCode = "";
var searchResults = document.getElementById('searchResults');
var selectList = document.getElementById("selects");
var homeBtn = document.getElementById("homeBtn");

// creating a dropdown list
allEpisodes.map((episodes) => {
  var option = document.createElement("option");
  option.value = episodes.name;
  option.text = episodes.name;
  selectList.appendChild(option);
});

// Live Search 
 searchBar.addEventListener('keyup', function(el){
  var searchTerm = el.target.value.toLowerCase();  
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
 This code stores -the episode that was clicked from the dropdown list- it stores it 
 in the "filteredEpisodes" variable. This way the code will only display the selected episode 
 from the dropdown list 
   */
   selectList.addEventListener("change", function() {
     filteredEpisodes = allEpisodes.filter(function (e) {
        return e.name == selectList.value 
      }); 

     displayEpisodes(filteredEpisodes);
  }); 
  

  // using map to populate the page with the filtered episodes
  const htmlString = filteredEpisodes.map((episodes) => {
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
            <div class = "episodeDiv">
                <h2 class = "title">${episodes.name} ${episodeCode}</h2>
                <img src="${episodes.image.medium}" class = "img"></img>
                <p class = "summary"> ${episodes.summary}</p>
                
            </div>
        `;
    });
  
  
  searchResults.innerHTML = `Displaying ${htmlString.length} of ${allEpisodes.length}`;
  episodeFrames.innerHTML = htmlString;
  
};
// Home button calls the display function with "allEpisodes" as a parameter to diplay all episodes again
homeBtn.addEventListener("click",function(){
  displayEpisodes(allEpisodes);
});

/* calling the display function with all episodes as parameter in order to diplay
 all the episodes before entering a search term */

displayEpisodes(allEpisodes);
 
//variables declaration
let allShows = getAllShows().sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
let episodeFrames = document.getElementById("episodeFrames");
let searchBar = document.getElementById("searchBar");
let episodeCode = "";
let searchResults = document.getElementById("searchResults");
let episodesSelect = document.getElementById("episodesSelect");
let showsSelect = document.getElementById("showsSelect");
let slectedShow;
let homeBtn = document.getElementById("homeBtn");
let allEpisodes;


/* const htmlString = allShows.map((show) => {
   return `
            <div class = "episodeDiv">
                <h2 class = "title">${show.name}</h2>
                <img src="${show.image.medium}" class = "img" />
                <p class = "summary"> ${show.summary}</p>
                
  
            </div>
        `;
});
episodeFrames.innerHTML = htmlString; */



// creating a dropdown list for Shows

  allShows.map((shows) => {
    let option = document.createElement("option");
    option.value = shows.id;
    option.text = shows.name;
    showsSelect.appendChild(option);
  });
showsSelect.addEventListener("change",(e)=>{
   episodesSelect.innerHTML = "";
getData(e.target.value)
})


getData(82);


//=============fetch========================
//async function getDataShow(){
  //select show
 
 /*  showsSelect.addEventListener("change", function () {
    slectedShow = allShows.filter(function (e) {
      return e.name == showsSelect.value;
    });
    

    URL = slectedShow[0]._links.self.href + "/episodes";
  
     getData();
    
     

  });
} */

async function getData(showId) {
    
 
  const response = await fetch(`http://api.tvmaze.com/shows/${showId}/episodes`);
  const data = await response.json();
  allEpisodes = data;
   await search();
  /* calling the display function with all episodes as parameter in order to diplay
 all the episodes before entering a search term */
 console.log(allEpisodes)
  displayEpisodes(allEpisodes);
  
  
}

// =======search and dropdown list=============
  function search(){
   
 
  // creating a dropdown list for Episodes
    let option = document.createElement("option");
    option.value = 0;
    option.text = "Episodes";
    episodesSelect.appendChild(option);
  allEpisodes.map((episodes) => {
  let option = document.createElement("option");
    option.value = episodes.name;
    option.text = episodes.name;
    episodesSelect.appendChild(option);
  });

  
  // Live Search
  searchBar.addEventListener("keyup", function (el) {
    let searchTerm = el.target.value.toLowerCase();
    let filteredEpisodes = allEpisodes.filter((episode) => {
      return (
        episode.name.toLowerCase().includes(searchTerm) ||
        episode.summary.toLowerCase().includes(searchTerm)
      );
    });

    displayEpisodes(filteredEpisodes);
  });
}

 
  
 

// ===========display episods function=========

  async function displayEpisodes(filteredEpisodes){

    
 

  /*
 This code stores -the episode that was clicked from the dropdown list- it stores it 
 in the "filteredEpisodes" variable. This way the code will only display the selected episode 
 from the dropdown list 
   */

  episodesSelect.addEventListener("change", function () {
    filteredEpisodes = allEpisodes.filter(function (e) {
     console.log(episodesSelect.value === 0);
      // return  e.name == episodesSelect.value;
      return episodesSelect.value !== "0" ? e.name == episodesSelect.value:true;
    });

    displayEpisodes(filteredEpisodes);
  });
 
  // using map to populate the page with the filtered episodes
  const htmlString = filteredEpisodes.map((episodes) => {
    // episodes format code
episodeCode =`S${("0"+episodes.season).slice(-2)}E${("0"+episodes.number).slice(-2)}`;
    

    // displaying episodes
 //Div.ineerHTML += `<h2 class = "title">${episodes.name} ${episodeCode}</h2>`
//if(episodes.image.medium){Div.ineerHTML +=`<img src="${episodes.image.medium}" class = "img" />`} 
    return `
            <div class = "episodeDiv">
                <h2 class = "title">${episodes.name} ${episodeCode}</h2>
                <img src="${episodes.image.medium}" class = "img" />
                <p class = "summary"> ${episodes.summary}</p>
                

            </div>
        `;
  });
    
  

  searchResults.innerHTML = `Displaying ${htmlString.length} of ${allEpisodes.length}`;
  episodeFrames.innerHTML = htmlString;
  
}


// Home button calls the display function with "allEpisodes" as a parameter to diplay all episodes again
homeBtn.addEventListener("click", function () {
  displayEpisodes(allEpisodes);
});




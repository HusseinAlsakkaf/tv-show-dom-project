//variables declaration
let allShows = getAllShows().sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
let episodeFrames = document.getElementById("episodeFrames");
let searchBar = document.getElementById("searchBar");
let searchShow = document.getElementById("searchShow");
let episodeCode = "";
let searchResults = document.getElementById("searchResults");
let episodesSelect = document.getElementById("episodesSelect");
let showsSelect = document.getElementById("showsSelect");
let slectedShow;
let homeBtn = document.getElementById("homeBtn");
let allEpisodes;


function showShows(allShows)
//switching betwwen displaying the two searchbars
 {searchShow.style.display = "";
searchBar.style.display = "none";

 episodeFrames.innerHTML ="";
 searchResults.style.display = "none";
allShows.map((show) => {
   let showDiv = document.createElement("div");
   showDiv.className =  "showDiv";
   episodeFrames.appendChild(showDiv);
   //Show Titel
   let showTitle = document.createElement("h2");
   let infoDiv = document.createElement("div");
   infoDiv.className = "infoDiv";
   showTitle.id = show.id;
   showTitle.className = "showTitle";
   showTitle.innerText = show.name;

   showDiv.appendChild(showTitle);
   showDiv.appendChild(infoDiv);
   showTitle.addEventListener("click",() => {
    showsSelect.value = show.id; 
    getData(show.id);
  });


     // Show Image 
  let showImage = document.createElement("img");
   if(show.image){
    showImage.src = show.image.medium;
infoDiv.appendChild(showImage);
   } else {console.log(show.name)}

  // Show Summary
  show.summary = show.summary.replace("</p>", " ");
  show.summary = show.summary.replace("<p>", " ");
  show.summary = show.summary.replace("</b>", " ");
  show.summary = show.summary.replace("<b>", " ");
let showSummary = document.createElement("p");
let showSummaryDiv = document.createElement("div");
showSummary.className =  "showSummary";
   showSummary.innerText = show.summary;


infoDiv.appendChild(showSummary);

// show information
let showInfoDiv = document.createElement("div");
showInfoDiv.className =  "showInfoDiv";

// show rating
let showRating = document.createElement("span");
   showRating.innerText = ` Rated: ${show.rating.average} `;
showInfoDiv.appendChild(showRating);

// show genres

let genresDiv = document.createElement("div");
let genresUl = document.createElement("ul");
let genresTitle = document.createElement("p");


   
showInfoDiv.appendChild(genresDiv);
genresTitle.innerText = "Genres:"
genresDiv.appendChild(genresTitle);
genresDiv.className = "genresDiv";
genresDiv.appendChild(genresUl);
console.log(show["genres"]);
show["genres"] && show["genres"].forEach(item => {
let genresLi = document.createElement("li");
genresLi.innerText = item;
genresUl.appendChild(genresLi);
});


// show status

let showStatus = document.createElement("span");
   showStatus.innerText = ` Status: ${show.status} `;
showInfoDiv.appendChild(showStatus);

// show runtime
let showRuntime = document.createElement("span");
   showRuntime.innerText = ` Runtime: ${show.runtime} `;
showInfoDiv.appendChild(showRuntime);
   infoDiv.appendChild(showInfoDiv);


  
            });};
           
showShows(allShows);

 // Live Search for shows
  searchShow.addEventListener("keyup", function (el) {
    console.log("www")
    let searchShowTerm = el.target.value.toLowerCase();
    let filteredShows = allShows.filter((show) => {
      return (
        show.name.toLowerCase().includes(searchShowTerm)
        
      );
    });
 episodeFrames.innerHTML ="";
    showShows(filteredShows);
  });


// creating a dropdown list for Shows

  allShows.map((shows) => {
    let option = document.createElement("option");
    option.value = shows.id;
    option.text = shows.name;
    showsSelect.appendChild(option);
  });
showsSelect.addEventListener("change",(e)=>{
   episodesSelect.innerHTML = "";
   
   e.target.value !== "All" ? getData(e.target.value):showShows(allShows);
})

async function getData(showId) {
    
 
  const response = await fetch(`https://api.tvmaze.com/shows/${showId}/episodes`);
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
    searchBar.style.display = "";
    searchShow.style.display = "none";

    /*
 This code stores -the episode that was clicked from the dropdown list- it stores it 
 in the "filteredEpisodes" variable. This way the code will only display the selected episode 
 from the dropdown list 
   */

    episodesSelect.addEventListener("change", function () {
      filteredEpisodes = allEpisodes.filter(function (e) {
        return episodesSelect.value !== "0"
          ? e.name == episodesSelect.value
          : true;
      });

      displayEpisodes(filteredEpisodes);
    });

    // using map to populate the page with the filtered episodes
    const htmlString = filteredEpisodes.map((episodes) => {
      // episodes format code
      episodeCode = `S${("0" + episodes.season).slice(-2)}E${(
        "0" + episodes.number
      ).slice(-2)}`;

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

    //switching betwwen displaying the two searchbars
    searchResults.style.display = "";
    searchResults.innerHTML = `Displaying ${htmlString.length} of ${allEpisodes.length}`;
    episodeFrames.innerHTML = htmlString;
  }


// Home button calls the display function with "allEpisodes" as a parameter to diplay all episodes again
homeBtn.addEventListener("click", function () {
   //episodeFrames.innerHTML ="";
   episodesSelect.innerHTML = ""; 
  showsSelect.value = "All";
  showShows(allShows);
});




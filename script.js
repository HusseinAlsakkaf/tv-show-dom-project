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

var allEpisodes = getAllEpisodes();
var episodeCode = "";
allEpisodes.forEach(grid);

//main function
function grid(allEpisodes){
  // episode code

  if (allEpisodes.number <= 9 && allEpisodes.season <= 9) {
    episodeCode = `S0${allEpisodes.season}E0${allEpisodes.number}`;
  } else if (allEpisodes.number <= 9 && allEpisodes.season > 9){
    episodeCode = `S${allEpisodes.season}0E${allEpisodes.number}`;
  } else if (allEpisodes.number > 9 && allEpisodes.season <= 9){
    episodeCode = `S0${allEpisodes.season}E${allEpisodes.number}`;
  } else if(allEpisodes.number > 9 && allEpisodes.season > 9){
    episodeCode = `S${allEpisodes.season}E${allEpisodes.number}`;
  }
  
  //div 
  var episodeDiv = document.createElement('div');
  episodeDiv.className = "episodeDiv";
  document.body.appendChild(episodeDiv);
// title and episode code
  var episodeTitle = document.createElement('h2');
  episodeTitle.className = "episodeTitle";
  episodeTitle.innerHTML = `${allEpisodes.name} ${episodeCode}`;
  episodeDiv.appendChild(episodeTitle);
  //img
  var episodeImg = document.createElement('img');
  episodeImg.src = allEpisodes.image.medium;
  episodeDiv.appendChild(episodeImg);
  episodeImg.className = "episodeImg";
  //summary text
  var summary = document.createElement('p');
  summary.innerHTML = allEpisodes.summary;
  episodeDiv.appendChild(summary);
  summary.className = "summary";

}

var topics = ["patrick", "nasa", "space", "chernobyl", "sponge bob", "michael scott"];
const api_key = "PjY1V7pyL0kw95K7adocE8IhL57Bp4mn";
var flag = false;
function createButtons(){
  for (let i = 0; i < topics.length; i++){
    var button = $('<button  onclick="getGifs(\''+topics[i]+'\')" type="button" class="btn btn-outline-info btn-lg" id="'+ topics[i] +'"></button>').text(topics[i]);
    $(".jumbotron").append(button);
  }
}
createButtons();
function getGifs(keyword){
  if(flag) {
    deleteGifs();
  }
  const url = 'https://api.giphy.com/v1/gifs/search?api_key='+api_key+'&q='+keyword+"&limit=10";
  flag = true;
  $.ajax({
      url: url,
      crossDomain: true,
      success: function(response){
        console.log(response);
        const data = response.data;
        for(let i=0; i < data.length; i++){
          let image_url = data[i].images.original_still.url;
          let gif_url = data[i].images.original.url;
          let image_rating = data[i].rating;
          let image_id = data[i].id;
          let rating = "<p class='rating'>Image rating: " + image_rating + "</p>";
          let image = $("<img>");
          image.attr("src", image_url);
          image.attr("data-alt", gif_url);
          image.attr("onclick", "playGif(this)");
          image.attr("state", "s");
          image.attr("id", i);
          $("#gifs").append(image, rating);
        }
      }
  });
}

function playGif(image){
  let image_static = image.getAttribute("src");
  let image_gif = image.getAttribute("data-alt");
  let image_state = image.getAttribute("state");

  if (image_state === "s"){
    console.log("change to m");
    image.setAttribute("src", image_gif);
    image.setAttribute("data-alt", image_static);
    image.setAttribute("state", "m");
  } else {
    console.log("change to s");
    image.setAttribute("src", image_gif);
    image.setAttribute("data-alt", image_static);
    image.setAttribute("state", "s");
  }
}

function deleteGifs(){
  for(let i = 0; i < 10; i++) {
    document.getElementById(i).remove();
  }
  $(".rating").remove();
}


$("#addTopic").click(function(){
  let new_topic = $("#topic").val();
  topics.push(new_topic);
  $(".btn-lg").remove(); // remove all the btns
  createButtons(); // create them again
});

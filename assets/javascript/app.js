var dogs = ["golden retriever", "dachshund", "skateboarding dogs", "german shepherd",
"derp dog", "doge", "shiba inu", "mutts"];
var moving = false;

$(document).ready(function(){

function displayGif() {
    var dogGif = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +($(this).text()) + 
    "&api_key=RHU8RTWjz03OnbYZmFKuhxayNxH2njsY&limit=3";
    
    $.ajax ({
        url: queryURL,
        method: "GET"
      }).then(function(response){
          console.log(response);
    for (i = 0; i < response.data.length; i++) {
        var still = response.data[i].images.fixed_height_still.url;
        var animGif = response.data[i].images.fixed_height.url;

         var img = $("<img>")
         img.addClass("resultGif").attr("src", still).attr("still-url", still).attr("anim-url", animGif);

         var gifCard = $("<div>").addClass("card");
         $(gifCard).append(img);
         $(".results").prepend(gifCard);
            }
        })
       
    }
       
function stillAnimate() {
    $(document).on("click", ".card", function() {
        if (!moving) {
        var srcURL = $(this).children("img").attr("anim-url");
        $(this).children("img").attr("src", srcURL);
        moving = true;
    }
        else if (moving) {
            var stillURL = $(this).children("img").attr("still-url");
                $(this).children("img").attr("src", stillURL);
                moving = false;
            }
});
}



function buttons() {
    $("#buttons").empty();
    for (i=0; i < dogs.length; i++){
        var button = $("<button>");
        button.addClass("gif")
        button.attr("data-name", dogs[i])
        button.text(dogs[i])
        $("#buttons").append(button);
    }
}

$("#find-gif").on("click", function(event){
    event.preventDefault();
    var doggif = $("#gif-search").val().trim();
    console.log(doggif);
    dogs.push(doggif);
    console.log(dogs);
    buttons();
});
$(document).on("click", ".gif", displayGif);
buttons();
stillAnimate();

});








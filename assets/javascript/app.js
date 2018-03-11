var dogs = ["golden retriever", "dachshund", "skateboarding dogs", "german shepherd",
"derp dog", "doge", "shiba inu", "mutts"];
var faveStills = [];
var faveAnim = [];

$(document).ready(function(){

function favoritesLoad() {
    var storedStills = localStorage.getItem("still-list");
    var faveStills2 = JSON.parse(storedStills);
    var storedAnim = localStorage.getItem("anim-list");
    var faveAnim2 = JSON.parse(storedAnim);
    if (!faveStills2) {

    }
    else {
    for (j = 0; j < faveStills2.length; j++) {
    if (faveStills.includes(faveStills2[j])) {

    }
    else {
    faveStills.push(faveStills2[j]);
    }
    if (faveAnim.includes(faveAnim2[j])) {

    }
    else {
    faveAnim.push(faveAnim2[j]);
    }
}
}
}

//primary function, calls GIPHY API and prints object info into cards
function displayGif() {
    var clickCounter = $(this).attr("data-clicks") * 10;
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +($(this).text()) + 
    "&api_key=RHU8RTWjz03OnbYZmFKuhxayNxH2njsY&limit=10&offset=" + clickCounter;
    
    $.ajax ({
        url: queryURL,
        method: "GET"
      }).then(function(response){
          console.log(response);

    for (i = 0; i < response.data.length; i++) {
        var still = response.data[i].images.fixed_height_still.url;
        var animGif = response.data[i].images.fixed_height.url;

        var img = $("<img>")
        img.addClass("resultGif")
        .attr("src", still)
        .attr("still-url", still)
        .attr("anim-url", animGif)
        .attr("isplaying", 'false');
        
        var title = response.data[i].title;
        var rating = response.data[i].rating;
        var info = $("<div>")
        .addClass("info").html(`<p> Rating : ${rating} </p> 
                                <p> Title : ${title} </p> `);
        
        var fave = $("<button>");
        fave.addClass("fave");
        fave.html(`<i class="far fa-heart"></i> Favorite!`);

        var cardWidth = response.data[i].images.fixed_height.width;
        var id = response.data[i].id;
         var gifCard = $("<div>").addClass("card").attr("id", id).css("width", cardWidth + "px");
         $(gifCard).append(img);
         $(gifCard).append(info);
         $(gifCard).append(fave);
         $(".results").prepend(gifCard);
            }
        })
       
    }

// animates the still gif in main page
function stillAnimate() {
    $(document).on("click", ".resultGif", function() {
        var moving = $(this).attr("isplaying");
        if (moving === 'false') {
        var srcURL = $(this).attr("anim-url");
        $(this).attr("src", srcURL);
        $(this).attr("isplaying", 'true');
    }
        else if (moving === 'true') {
            var stillURL = $(this).attr("still-url");
                $(this).attr("src", stillURL);
                $(this).attr("isplaying", 'false');
            }
});
}

// counts the number of times user clicks a button to change offset
function clicking(){
    var buttonClicks = $(this).attr("data-clicks");
    parseInt(buttonClicks);
    buttonClicks++;
    $(this).attr("data-clicks", buttonClicks);
    console.log(buttonClicks);
    
}

//dynamically creates topic buttons
function buttons() {
    $("#buttons").empty();
    for (i=0; i < dogs.length; i++){
        var button = $("<button>");
        button.addClass("gif")
        button.attr("data-name", dogs[i])
        button.attr("data-clicks", 0)
        button.text(dogs[i])
        $("#buttons").append(button);
    }
}

// Takes User Input and creates new topic button
$("#find-gif").on("click", function(event){
    event.preventDefault();
    var doggif = $("#gif-search").val().trim();
    console.log(doggif);
    dogs.push(doggif);
    console.log(dogs);
    buttons();
    $("#find-gif").val(" ");
});

// Makes topic buttons retrieve list of gifs
$(document).on("click", ".gif", displayGif).on("click", ".gif", clicking);
buttons();
stillAnimate();
favoritesLoad();

// display gifs in favorites

function displayFavorites() {

    $(".favorites").css("visibility", "visible");
    $(".card").css("z-index", "-1");

    for (i = 0; i < faveStills.length; i++) {
        var fave = $("<div>")
        .addClass("frame");
        var img = $("<img>")
        img.addClass("faveGif")
        .attr("src", faveStills[i])
        .attr("anim-url", faveAnim[i])
        .attr("still-url", faveStills[i])
        .attr("isplaying", 'false');
        $(fave).append(img);
        $("#fave-gifs").prepend(fave);
        console.log("works");
    }
    // make still gifs in favorite animate

}
function faveAnimate() {
    $(document).on("click", ".faveGif", function() {
        var moving = $(this).attr("isplaying");
        if (moving === 'false') {
        var srcURL = $(this).attr("anim-url");
        $(this).attr("src", srcURL);
        $(this).attr("isplaying", 'true');
    }
        else if (moving === 'true') {
            var stillURL = $(this).attr("still-url");
                $(this).attr("src", stillURL);
                $(this).attr("isplaying", 'false');
            }
});
}



// Function to show/hide favorites window
$("#faveWindow").on("click", displayFavorites).on("click", faveAnimate);
$(".close").on("click", function(){
    $(".favorites").css("visibility", "hidden");
    $(".card").css("z-index", "0");
    $("#fave-gifs").empty();
})

// Favorites button function
$(document).on("click", ".fave", function(){
    event.preventDefault();
    var cardStill = $(this).parent().children("img").attr("still-url");
    var cardAnim = $(this).parent().children("img").attr("anim-url");
    if (faveStills.includes(cardStill)) {

    }
    else {
        faveStills.push(cardStill);
        var faveStillString = JSON.stringify(faveStills);
        localStorage.setItem("still-list", faveStillString);
        console.log(localStorage.getItem("still-list"));
        
    }
    if (faveAnim.includes(cardAnim)) {

    }
    else {
    faveAnim.push(cardAnim);
    var faveAnimString = JSON.stringify(faveAnim);
    localStorage.setItem("anim-list", faveAnimString);
    console.log(localStorage.getItem("anim-list"));
    }



})
});











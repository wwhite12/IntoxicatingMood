/**
 * JavaScript file for Project 1 website
 * @author Max Coursey, Will White, Arianna Sanson
 * 
 */

//File submission changes
let file = document.getElementById("fileInput");
let picture

file.onchange = function () {
    if (file.files.length > 0) {

        document.getElementById('filename').innerHTML = file.files[0].name;
        picture = file.files[0].name
        console.log(picture)
        $("#pictureSubmit").on("click", function () { submitPicture(picture) })
    }
};
function submitPicture(picture) {
    //matt coming up with this. will nest once complete? Just console.logging picture name for now
    console.log("picture submited")
    console.log(picture)
}

//Face++ API query and array creation
let baseAlcohol; //base alcohol that will be included at the end of queryDrinkURL

const queryDrinkURL = "https://the-cocktail-db.p.rapidapi.com/filter.php?i=" + baseAlcohol;  //NOTE - the "1" is a temp developer key need to request new key if we publish to app store

let img_URL = "" //TODO temp variable for file upload URL if needed
let imgFile = "" //TODO temp file name of uploaded image


//intial call to cocktail DB--RIGHT NOW ONLY CONSOLE LOGS FIRST COCKTAIL FROM DEFINED DRINK
$.ajax({
    url: queryDrinkURL,
    method: "GET",
    headers: {
        "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
        "X-RapidAPI-Key": "d1d151fcf6msha9240c9ffb25a4bp14a1ddjsn58db10897e38"
    }
}).then(function (response) {
    console.log(response.drinks[0].strDrink);
});


//initial call to Face++
const API_KEY = "api_key=5WD1Tc70yflyZBAXRMHZzg1p6lUF0Nbm"
const API_SECRET = "api_secret=RvXCsEc7vf6xZFr-q1h1KH_F0hJ9vKzm"

var form = new FormData();
form.append("api_key", "5WD1Tc70yflyZBAXRMHZzg1p6lUF0Nbm");
form.append("api_secret", "RvXCsEc7vf6xZFr-q1h1KH_F0hJ9vKzm");
form.append("image_url", "https://images-na.ssl-images-amazon.com/images/I/61Wo915nuTL._SL1000_.jpg");
form.append("return_attributes", "emotion");
// form.append("return_attributes", "gender"); //API seems to only take one attribute section as an input

var settings = {
    "url": "https://api-us.faceplusplus.com/facepp/v3/detect",
    "method": "POST",
    "processData": false,
    "contentType": false,
    "mimeType": "multipart/form-data",
    "data": form
}

$.ajax(settings).done(function (response) {
    const face = JSON.parse(response);
    const tempFace = JSON.parse(response);
    const emotions = face.faces[0].attributes.emotion;
    sortedEmotions = [];

    for (var type in emotions) {
        sortedEmotions.push([type, emotions[type]])
    }
    sortedEmotions.sort(function (a, b) {
        return b[1] - a[1];
    });

    console.log(sortedEmotions);
    console.log("Primary: " + sortedEmotions[0][0] + ": " + sortedEmotions[0][1]);
    console.log("Secondary: " + sortedEmotions[1][0] + ": " + sortedEmotions[1][1]);

});

//emotionKey-object linking emotions to base alcohols

const emotionKey = {
    anger: "vodka",
    disgust: "wine",
    fear: "tequila",
    happiness: "rum",
    neutral: "gin",
    sadness:"whiskey",
    surprise: "champagne"
};




//test function for removing hidden class-- tested: after clicking submit, three drink cards now become visible
$("#pictureSubmit").on("click",function(){
    let inputOne = $("#emotionOne").val();
    let inputTwo = $("#emotionTwo").val();
    let inputThree = $("#emotionThree").val();

        console.log(inputOne);
        $("#moodNamePrimary").text(inputOne);
        $("#moodName2").text(inputTwo);
        $("#moodName3").text(inputThree);

    let baseAlcohol1 = "tequila";
    let baseAlcohol2 = "rum";
    let baseAlcohol3 = "gin";

    const queryDrinkURL1 = "https://the-cocktail-db.p.rapidapi.com/filter.php?i=" + baseAlcohol1;  //NOTE - the "1" is a temp developer key need to request new key if we publish to app store
    const queryDrinkURL2 = "https://the-cocktail-db.p.rapidapi.com/filter.php?i=" + baseAlcohol2;
    const queryDrinkURL3 = "https://the-cocktail-db.p.rapidapi.com/filter.php?i=" + baseAlcohol3;
    
    //ajax query for random drinks for primary mood
        $.ajax({
            url: queryDrinkURL1,
            method: "GET",
            headers: {
                "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
                "X-RapidAPI-Key": "d1d151fcf6msha9240c9ffb25a4bp14a1ddjsn58db10897e38"
            }
        }).then(function (response) {
           //variables for random drink one
           let testDrink1 = response.drinks[Math.floor(Math.random() * (response.drinks.length - 0 + 1) ) + 0];
           let testDrinkImg = testDrink1.strDrinkThumb;
           let imgLocation = $("<img>").attr("src",testDrinkImg)
            //variables for random drink two
           let testDrink2 = response.drinks[Math.floor(Math.random() * (response.drinks.length - 0 + 1) ) + 0];
           let testDrinkImg2 = testDrink2.strDrinkThumb;
           let imgLocation2 = $("<img>").attr("src",testDrinkImg2)
            //variables for random drink three
           let testDrink3 = response.drinks[Math.floor(Math.random() * (response.drinks.length - 0 + 1) ) + 0];
           let testDrinkImg3 = testDrink3.strDrinkThumb;
           let imgLocation3 = $("<img>").attr("src",testDrinkImg3)
            //random drink one to DOM
            $("#drinkOneRandOne").text(testDrink1.strDrink);
            $("#drinkOneRandOne").append(imgLocation);
            //random drink two to DOM
            $("#drinkOneRandTwo").text(testDrink2.strDrink);
            $("#drinkOneRandTwo").append(imgLocation2);
            //random drink three to DOM
            $("#drinkOneRandThree").text(response.drinks[Math.floor(Math.random() * (response.drinks.length - 0 + 1) ) + 0].strDrink);
            $("#drinkOneRandThree").append(imgLocation3);
        });

        //ajax query for drinks for secondary mood
        $.ajax({
            url: queryDrinkURL2,
            method: "GET",
            headers: {
                "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
                "X-RapidAPI-Key": "d1d151fcf6msha9240c9ffb25a4bp14a1ddjsn58db10897e38"
            }
        }).then(function (response) {
           
            //variables for random drink one
           let testDrink1 = response.drinks[Math.floor(Math.random() * (response.drinks.length - 0 + 1) ) + 0];
           let testDrinkImg = testDrink1.strDrinkThumb;
           let imgLocation = $("<img>").attr("src",testDrinkImg)
            //variables for random drink two
           let testDrink2 = response.drinks[Math.floor(Math.random() * (response.drinks.length - 0 + 1) ) + 0];
           let testDrinkImg2 = testDrink2.strDrinkThumb;
           let imgLocation2 = $("<img>").attr("src",testDrinkImg2)
            //variables for random drink three
           let testDrink3 = response.drinks[Math.floor(Math.random() * (response.drinks.length - 0 + 1) ) + 0];
           let testDrinkImg3 = testDrink3.strDrinkThumb;
           let imgLocation3 = $("<img>").attr("src",testDrinkImg3)
            //random drink one to DOM
            $("#drinkTwoRandOne").text(testDrink1.strDrink);
            $("#drinkTwoRandOne").append(imgLocation);
            //random drink two to DOM
            $("#drinkTwoRandTwo").text(testDrink2.strDrink);
            $("#drinkTwoRandTwo").append(imgLocation2);
            //random drink three to DOM
            $("#drinkTwoRandThree").text(response.drinks[Math.floor(Math.random() * (response.drinks.length - 0 + 1) ) + 0].strDrink);
            $("#drinkTwoRandThree").append(imgLocation3);

        });

        //ajax query for random drink for third mood
        $.ajax({
            url: queryDrinkURL3,
            method: "GET",
            headers: {
                "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
                "X-RapidAPI-Key": "d1d151fcf6msha9240c9ffb25a4bp14a1ddjsn58db10897e38"
            }
        }).then(function (response) {
           
             //variables for random drink one
           let testDrink1 = response.drinks[Math.floor(Math.random() * (response.drinks.length - 0 + 1) ) + 0];
           let testDrinkImg = testDrink1.strDrinkThumb;
           let imgLocation = $("<img>").attr("src",testDrinkImg)
            //variables for random drink two
           let testDrink2 = response.drinks[Math.floor(Math.random() * (response.drinks.length - 0 + 1) ) + 0];
           let testDrinkImg2 = testDrink2.strDrinkThumb;
           let imgLocation2 = $("<img>").attr("src",testDrinkImg2)
            //variables for random drink three
           let testDrink3 = response.drinks[Math.floor(Math.random() * (response.drinks.length - 0 + 1) ) + 0];
           let testDrinkImg3 = testDrink3.strDrinkThumb;
           let imgLocation3 = $("<img>").attr("src",testDrinkImg3)
            //random drink one to DOM
            $("#drinkThreeRandOne").text(testDrink1.strDrink);
            $("#drinkThreeRandOne").append(imgLocation);
            //random drink two to DOM
            $("#drinkThreeRandTwo").text(testDrink2.strDrink);
            $("#drinkThreeRandTwo").append(imgLocation2);
            //random drink three to DOM
            $("#drinkThreeRandThree").text(response.drinks[Math.floor(Math.random() * (response.drinks.length - 0 + 1) ) + 0].strDrink);
            $("#drinkThreeRandThree").append(imgLocation3);

        });
        
    
    $(".d-none").removeClass("d-none");
})






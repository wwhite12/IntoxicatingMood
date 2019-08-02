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
    document.getElementById("userPicture").src = picture; 
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


//test function for removing hidden class-- tested: after clicking submit, three drink cards now become visible
$("#pictureSubmit").on("click",function(){
    $(".d-none").removeClass("d-none");
})






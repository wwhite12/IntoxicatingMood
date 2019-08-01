/**
 * JavaScript file for Project 1 website
 * @author Max Coursey
 * 
 */
 

//Face++ API key and secret as required by API
const API_KEY = "api_key=5WD1Tc70yflyZBAXRMHZzg1p6lUF0Nbm"
const API_SECRET = "api_secret=RvXCsEc7vf6xZFr-q1h1KH_F0hJ9vKzm"
let baseAlcohol; //base alcohol that will be included at the end of queryDrinkURL

const queryDrinkURL = "https://the-cocktail-db.p.rapidapi.com/filter.php?i="+ baseAlcohol;  //NOTE - the "1" is a temp developer key need to request new key if we publish to app store
const queryFaceURL = "https://api-us.faceplusplus.com/facepp/v3/detect/?"  //TODO not sure why this is not working right now - getting API NOT FOUND 404 error

let img_URL = "" //TODO temp variable for file upload URL if needed
let imgFile = "" //TODO temp file name of uploaded image


//intial call to cocktail DB--RIGHT NOW ONLY CONSOLE LOGS FIRST COCKTAIL FROM DEFINED DRINK, WILL NEED LOOP LATER
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
$.ajax({
    url: queryFaceURL,
    method: "GET"
}).then(function (response) {
    console.log(response);
});






//JavaScript for Cocktail API- William White







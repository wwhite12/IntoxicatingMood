/**
 * JavaScript file for Project 1 website
 * @author Max Coursey
 * 
 */
 

//Face++ API key and secret as required by API
const API_KEY = "api_key=5WD1Tc70yflyZBAXRMHZzg1p6lUF0Nbm"
const API_SECRET = "api_secret=RvXCsEc7vf6xZFr-q1h1KH_F0hJ9vKzm"

const queryDrinkURL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";  //NOTE - the "1" is a temp developer key need to request new key if we publish to app store
const queryFaceURL = "https://api-us.faceplusplus.com/facepp/v3/detect/?"  //TODO not sure why this is not working right now - getting API NOT FOUND 404 error

let img_URL = "" //TODO temp variable for file upload URL if needed
let imgFile = "" //TODO temp file name of uploaded image


//intial call to cocktail DB
$.ajax({
    url: queryDrinkURL,
    method: "GET"
}).then(function (response) {
    console.log(response);
});


//initial call to Face++
$.ajax({
    url: queryFaceURL,
    method: "GET"
}).then(function (response) {
    console.log(response);
});




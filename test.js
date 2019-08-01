

const API_KEY = "api_key=5WD1Tc70yflyZBAXRMHZzg1p6lUF0Nbm"
const API_SECRET = "api_secret=RvXCsEc7vf6xZFr-q1h1KH_F0hJ9vKzm"
const img = "images/max.jpg"

$.ajax({
    url: "https://api-us.faceplusplus.com/facepp/v3/detect/", 
    method: "POST",
    headers: {
        "x-rapidapi-host": "faceplusplus-faceplusplus.p.rapidapi.com",
        "x-rapidapi-key": "dbbd80497bmsh91d0d2e1a4a10fap1f2952jsn61b1a861f8af",
        "content-type": "application/x-www-form-urlencoded",    
        "Access-Control-Allow-Origin" : "*"
    },
    data: {
        "image_url": "https://images-na.ssl-images-amazon.com/images/I/61Wo915nuTL._SL1000_.jpg"
    }
}).then(function (response) {
    console.log(response)
});


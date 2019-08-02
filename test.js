

// const API_KEY = "api_key=5WD1Tc70yflyZBAXRMHZzg1p6lUF0Nbm" //Face++ Key
// const API_SECRET = "api_secret=RvXCsEc7vf6xZFr-q1h1KH_F0hJ9vKzm" //Face++ Key


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

    console.log(emotions);

    for (var type in emotions) {
        sortedEmotions.push([type, emotions[type]])
    }
    sortedEmotions.sort(function (a, b) {
        return b[1] - a[1];
    });

    console.log("Primary: " + sortedEmotions[0][0] + ": " + sortedEmotions[0][1]);
    console.log("Secondary: " + sortedEmotions[1][0] + ": " + sortedEmotions[1][1]);

    //OLD CODE TO GRAB MAX and SECOND TO MAX KEYS AND VALUES
    // const tempEmotions = tempFace.faces[0].attributes.emotion;  
    // const primaryKey = Object.keys(emotions).reduce((a, b) => emotions[a] > emotions[b] ? a : b);
    // const primaryVal = emotions[primaryKey];
    // delete tempEmotions[primaryKey];
    // const secondaryKey = Object.keys(tempEmotions).reduce((a, b) => tempEmotions[a] > tempEmotions[b] ? a : b);
    // const secondaryVal = emotions[secondaryKey];
    // console.log(emotions);
    // console.log(primaryKey + ": " + emotions[primaryKey]);
    // console.log(secondaryKey + ": " + emotions[secondaryKey]);

});
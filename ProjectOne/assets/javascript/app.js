/**
 * JavaScript file for Project 1 website
 * @author Max Coursey, Will White, Arianna Sanson
 * last updated: 8/5/19
 */

let file = document.getElementById("fileInput");
let picture
$("#fileInput").change(function (e) {
    //console.log(e.target.files[0])
    //    $("#pictureSubmit").on("click", function () { submitPicture(e.target.files[0]) })
    previewFile()
});
function previewFile() {
    var preview = document.querySelector('img');
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        preview.src = reader.result;
    }
    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
    } else {
        preview.src = "";
    }
};


//emotionKey-object linking emotions to base alcohols
const emotionKey = {
    anger: ["vodka", "In Soviet Russia, vodka is angry at you."],
    disgust: ["wine", "Disgusted? Grab a bottle of wine and vent about how stupid your boss is."],
    fear: ["tequila", "Nothing ~screams~ fear like 20 shots of tequila.."],
    happiness: ["rum", "Ever wonder how Captain Jack Sparrow is always so happy?"],
    neutral: ["gin", "So neutral you'd think it's from Switzerland"],
    sadness: ["whiskey", "Pair this with a country song and you'll cry all night"],
    surprise: ["champagne", "To be clear, champagne is for good surprises.."]
};

let inputFile;

//prevents same drink popping up in 1/3 li's
function randomArraySelector(array, count) {
    const selections = []
    for (let i = 0; i < count; i++) {
        const index = Math.floor(Math.random() * array.length);
        selections.push(array[index]);
        array.splice(index, 1);
    }
    return selections;
}

//needed to initialize picture for upload to FACE++ API
$("#fileInput").change(function (e) {
    inputFile = (e.target.files[0]);
});

//on click function, triggers:reveals hidden cards with random drink choices based on base alcohols
$("#pictureSubmit").on("click", function () {


    //change jumbotron title to "drink results"
    $("#title-change").html("Drink Results");

    var form = new FormData();
    form.append("api_key", "5WD1Tc70yflyZBAXRMHZzg1p6lUF0Nbm");
    form.append("api_secret", "RvXCsEc7vf6xZFr-q1h1KH_F0hJ9vKzm");
    //form.append("image_url", "https://images-na.ssl-images-amazon.com/images/I/61Wo915nuTL._SL1000_.jpg");
    form.append("image_file", inputFile);
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
    let sortedEmotions = [];
    $.ajax(settings).done(function (response) {
        const face = JSON.parse(response);
        const tempFace = JSON.parse(response);
        const emotions = face.faces[0].attributes.emotion;

        for (var type in emotions) {
            sortedEmotions.push([type, emotions[type]])
        }
        sortedEmotions.sort(function (a, b) {
            return b[1] - a[1];
        });
        return sortedEmotions;
    }).then(function () {
        //title of cards is selected emotions
        $("#moodNamePrimary").text(sortedEmotions[0][0]);
        $("#moodName2").text(sortedEmotions[1][0]);
        $("#moodName3").text(sortedEmotions[2][0]);

        $("#moodTextOne").text(emotionKey[sortedEmotions[0][0]][1]);
        $(".card-text2").text(emotionKey[sortedEmotions[1][0]][1]);
        $("#moodTextThree").text(emotionKey[sortedEmotions[2][0]][1]);


        //baseAlcohols declared--- will be replaced later with link between returned emotions and base alcohols
<<<<<<< HEAD
        let baseAlcohol1 = emotionKey[sortedEmotions[0][0]];
        let baseAlcohol2 = emotionKey[sortedEmotions[1][0]];
        let baseAlcohol3 = emotionKey[sortedEmotions[2][0]];
=======
        let baseAlcohol1 = emotionKey[sortedEmotions[0][0]][0];
        let baseAlcohol2 = emotionKey[sortedEmotions[1][0]][0];
        let baseAlcohol3 = emotionKey[sortedEmotions[2][0]][0];
        // console.log(baseAlcohol1 + baseAlcohol2 + baseAlcohol3);
>>>>>>> 932f150560abb72a72ad0d6ef7b9cb2798248b76

        //must have three different cocktail API queries for each base alcohol
        const queryDrinkURL1 = "https://the-cocktail-db.p.rapidapi.com/filter.php?i=" + baseAlcohol1;
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

            const indexes = randomArraySelector(response.drinks, 3)
            console.log(indexes)

            //variables for random drink one
            let testDrink1 = indexes[0];
            let testDrinkImg = testDrink1.strDrinkThumb;
            console.log(testDrink1.idDrink);    //14978
            let imgLocation = $("<img>").attr("src", testDrinkImg);
            imgLocation.attr("data-id", testDrink1.idDrink);
            //variables for random drink two
            let testDrink2 = indexes[1];
            let testDrinkImg2 = testDrink2.strDrinkThumb;
            let imgLocation2 = $("<img>").attr("src", testDrinkImg2)
            imgLocation2.attr("data-id", testDrink2.idDrink);
            //variables for random drink three
            let testDrink3 = indexes[2];
            let testDrinkImg3 = testDrink3.strDrinkThumb;
            let imgLocation3 = $("<img>").attr("src", testDrinkImg3)
            imgLocation3.attr("data-id", testDrink3.idDrink);

            //clear any existing prior jquery content
            $("#drinkOneRandOne").empty();
            $("#drinkOneRandTwo").empty();
            $("#drinkOneRandThree").empty();
            //random drink one to DOM
            $("#drinkOneRandOne").append(imgLocation);
            $("#drinkOneRandOne").append(imgLocation).append("<div class='middle'><div class='text'>" + testDrink1.strDrink + "</div></div>");
            //random drink two to DOM
            $("#drinkOneRandTwo").append(imgLocation2);
            $("#drinkOneRandTwo").append(imgLocation2).append("<div class='middle'><div class='text'>" + testDrink2.strDrink + "</div></div>");
            //random drink three to DOM
            $("#drinkOneRandThree").append(imgLocation3);
            $("#drinkOneRandThree").append(imgLocation3).append("<div class='middle'><div class='text'>" + testDrink3.strDrink + "</div></div>");
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

           

            const moodTwo = randomArraySelector(response.drinks, 3)

            //variables for random drink one
            let testDrink1 = moodTwo[0];
            let testDrinkImg = testDrink1.strDrinkThumb;
            let imgLocation = $("<img>").attr("src", testDrinkImg)
            imgLocation.attr("data-id", testDrink1.idDrink);

            //variables for random drink two
            let testDrink2 = moodTwo[1];
            let testDrinkImg2 = testDrink2.strDrinkThumb;
            let imgLocation2 = $("<img>").attr("src", testDrinkImg2)
            imgLocation2.attr("data-id", testDrink2.idDrink);

            //variables for random drink three
            let testDrink3 = moodTwo[2];
            let testDrinkImg3 = testDrink3.strDrinkThumb;
            let imgLocation3 = $("<img>").attr("src", testDrinkImg3)
            imgLocation3.attr("data-id", testDrink3.idDrink);
            
            //clear any existing prior jquery content
            $("#drinkTwoRandOne").empty();
            $("#drinkTwoRandTwo").empty();
            $("#drinkTwoRandThree").empty();
            
            //random drink one to DOM
            $("#drinkTwoRandOne").append(imgLocation);
            $("#drinkTwoRandOne").append(imgLocation).append("<div class='middle'><div class='text'>" + testDrink1.strDrink + "</div></div>");

            //random drink two to DOM
            $("#drinkTwoRandTwo").append(imgLocation2);
            $("#drinkTwoRandTwo").append(imgLocation2).append("<div class='middle'><div class='text'>" + testDrink2.strDrink + "</div></div>");
            //random drink three to DOM
            $("#drinkTwoRandThree").append(imgLocation3);
            $("#drinkTwoRandThree").append(imgLocation3).append("<div class='middle'><div class='text'>" + testDrink3.strDrink + "</div></div>");

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


            const moodThree = randomArraySelector(response.drinks, 3)

            //variables for random drink one
            let testDrink1 = moodThree[0];
            let testDrinkImg = testDrink1.strDrinkThumb;
            let imgLocation = $("<img>").attr("src", testDrinkImg);
            imgLocation.attr("data-id", testDrink1.idDrink);

            //variables for random drink two
            let testDrink2 = moodThree[1];
            let testDrinkImg2 = testDrink2.strDrinkThumb;
            let imgLocation2 = $("<img>").attr("src", testDrinkImg2);
            imgLocation2.attr("data-id", testDrink2.idDrink);

            //variables for random drink three
            let testDrink3 = moodThree[2];
            let testDrinkImg3 = testDrink3.strDrinkThumb;
            let imgLocation3 = $("<img>").attr("src", testDrinkImg3)
            imgLocation3.attr("data-id", testDrink3.idDrink);

            //clear any existing prior jquery content
            $("#drinkThreeRandOne").empty();
            $("#drinkThreeRandTwo").empty();
            $("#drinkThreeRandThree").empty();


            //random drink one to DOM
            $("#drinkThreeRandOne").append(imgLocation);
            $("#drinkThreeRandOne").append(imgLocation).append("<div class='middle'><div class='text'>" + testDrink1.strDrink + "</div></div>");
            //random drink two to DOM
            $("#drinkThreeRandTwo").append(imgLocation2);
            $("#drinkThreeRandTwo").append(imgLocation2).append("<div class='middle'><div class='text'>" + testDrink2.strDrink + "</div></div>");
            //random drink three to DOM
            $("#drinkThreeRandThree").append(imgLocation3);
            $("#drinkThreeRandThree").append(imgLocation3).append("<div class='middle'><div class='text'>" + testDrink3.strDrink + "</div></div>");

            //reveals hidden cards with above information
            $(".invisible").removeClass("invisible");

            $(".return").on("click", function (e) {
                $("#title-change").html("Title Here");
            });
        });
    });
<<<<<<< HEAD
    
    //reveals invisible cards with above information
    $(".invisible").removeClass("invisible");

    //revert back to title 
    $(".return").on("click", function(e){
        $("#title-change").html("Title Here");
    });
=======

>>>>>>> 932f150560abb72a72ad0d6ef7b9cb2798248b76


    //Javascript for smooth-scroll 
    $('a[href*="#"]')
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function (event) {
            if (
                location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
                &&
                location.hostname == this.hostname
            ) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function () {
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) {
                            return false;
                        } else {
                            $target.attr('tabindex', '-1');
                        };
                    });
                }
            }
        });
});


//function to add drink to a local storage item when user clicks
$(".list-class-item").on("click", function () {
    drinkName = this.id;
    if (confirm("Save Drink?") === true) {
        localStorage.setItem("drinkName", drinkName);
    };
});

function renderSavedDrinks(list) {
    $("#").empty();  //empties out html

    //render drink list
    for (let i = 0; i < list.length; i++) {
        var drinkItem = $("<p>");
        drinkItem.text(list[i]);
    }
}

//function to show instructions upon clicking pic

function renderIns(id) {
    queryUrlID = "https://the-cocktail-db.p.rapidapi.com/lookup.php?i=" + id;

    $.ajax({
        url: queryUrlID,
        method: "GET",
        headers: {
            "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
            "X-RapidAPI-Key": "d1d151fcf6msha9240c9ffb25a4bp14a1ddjsn58db10897e38"
        }
    }).then(function (response) {
        console.log(response.drinks[0].strInstructions)
        $("#modalDrinkTitle").text(response.drinks[0].strDrink);
        $("#modalDrinkFacts").text("Ingredients: " + response.drinks[0].strIngredient1)
        if (response.drinks[0].strIngredient2) {
            $("#modalDrinkFacts").append(", " + response.drinks[0].strIngredient2);
        }
        if (response.drinks[0].strIngredient3) {
            $("#modalDrinkFacts").append(", " + response.drinks[0].strIngredient3);
        }
        if (response.drinks[0].strIngredient4) {
            $("#modalDrinkFacts").append(", " + response.drinks[0].strIngredient4);
        }
        if (response.drinks[0].strIngredient5) {
            $("#modalDrinkFacts").append(", " + response.drinks[0].strIngredient5);
        }
        if (response.drinks[0].strIngredient6) {
            $("#modalDrinkFacts").append(", " + response.drinks[0].strIngredient6);
        }
        if (response.drinks[0].strIngredient7) {
            $("#modalDrinkFacts").append(", " + response.drinks[0].strIngredient7);
        }
        if (response.drinks[0].strIngredient8) {
            $("#modalDrinkFacts").append(", " + response.drinks[0].strIngredient8);
        }
        if (response.drinks[0].strIngredient9) {
            $("#modalDrinkFacts").append(", " + response.drinks[0].strIngredient9);
        }
        if (response.drinks[0].strIngredient10) {
            $("#modalDrinkFacts").append(", " + response.drinks[0].strIngredient10);
        }
        if (response.drinks[0].strIngredient11) {
            $("#modalDrinkFacts").append(", " + response.drinks[0].strIngredient11);
        }
        if (response.drinks[0].strIngredient12) {
            $("#modalDrinkFacts").append(", " + response.drinks[0].strIngredient12);
        }
        if (response.drinks[0].strIngredient13) {
            $("#modalDrinkFacts").append(", " + response.drinks[0].strIngredient13);
        }
        if (response.drinks[0].strIngredient14) {
            $("#modalDrinkFacts").append(", " + response.drinks[0].strIngredient14);
        }
        if (response.drinks[0].strIngredient15) {
            $("#modalDrinkFacts").append(", " + response.drinks[0].strIngredient15);
        }
        $("#modalDrinkFacts").append("<br> Instructions: " + response.drinks[0].strInstructions);

        //for(let i = 1;i<= 15; i++){
        // if((response.drinks[0].strIngredient+i)){
        //    console.log(response.drinks[0].strIngredient+i);
        //}
        //console.log(response.drinks[0].strIngredient+[i]);
        //}
    });
}

$(".back").on("click", ".list-group-item > img", function (event) {

    $("#drinkModal").modal("show");

    const imgID = event.target.attributes[1].value
    renderIns(imgID);
})


/* controls age confirm modal*/
//wanted it to save 
function ageConfirmModal() {
    if (localStorage.getItem("ageConf") == "true") {
        $(".is-active").removeClass("is-active");
    } if (localStorage.getItem("ageConf") == "false") {
        location.href = 'http://www.google.com';
    } else {
        $("#ageYes").on("click", function () {
            $(".is-active").removeClass("is-active");
            localStorage.setItem("ageConf", "true")

        })
        $("#ageNo").on("click", function () {
            location.href = 'http://www.google.com';
            localStorage.setItem("ageConf", "false")
        })
    }
}
ageConfirmModal();

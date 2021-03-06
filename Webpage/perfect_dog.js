
// Default things
//////////////////
var chosen_temps = [];
var permission = false;
document.getElementById("submitButton").disabled = true; // disable submission button until have 3 choices



/////////////////////////////////////////////////////////////////////////////////////////////////////
// Have the default picture change to a different puppy every time the page is loaded/reloaded
/////////////////////////////////////////////////////////////////////////////////////////////////////
var pic_options = ["Pictures/369-3696233_puppy-cartoon-png.png",
                  "Pictures/transparent-cartoon-snout-pomeranian-cat-persian-dog-puffy-blush-shineyourlight5e6102ce7448e7.2134357315834160144763.png",
                  "Pictures/transparent-cartoon-clip-art-puppy-dog-breed-snout-5d686cad84fcc3.7779243015671246535447.png"];

function getNewPic(){
    d3.select("#dogChoiceCard>img").attr("src",pic_options[Math.floor(Math.random() * 3)]); // Chooses pic_options index at random
    // console.log(d3.select("#dogChoiceCard>img"));
}
getNewPic();




/////////////////////////////////////////////////////////////////////////////////////////////////////
// Adding action to reset button
/////////////////////////////////////////////////////////////////////////////////////////////////////
var reset = d3.select("#resetButton");

function resetBoxes(){
    console.log("Reset button has been clicked");
    d3.selectAll('input').property('checked', false); // uncheck any checked boxes
    // getNewPic();
    location.reload();
    // var chosen_temps = [];
    // d3.select("#defaultPupChoice").text("Go ahead and check 3 boxes for what you want in a dog. The right dog for you will show up here.")
}

reset.on("click",resetBoxes); // attach on to reset button




/////////////////////////////////////////////////////////////////////////////////////////////////////
// Adding action to submit choices and find dog
/////////////////////////////////////////////////////////////////////////////////////////////////////

// Defining functions 
/////////////////////////////

// Submission button event 
// helpful webpage for promises https://stackoverflow.com/questions/60326469/why-is-function-returning-undefined-when-calling-fetch-axios-ajax-or-a-promis
function getSQLresults(tmp1,tmp2,tmp3){
    const url = `http://127.0.0.1:5000/perfectpupper/${tmp1}/${tmp2}/${tmp3}`;
    return fetch(url).then(response => response.json());
}

function submitChoices(){
    console.log("Submission button has been clicked");
    var temp1 = chosen_temps[0];
    var temp2 = chosen_temps[1];
    var temp3 = chosen_temps[2];
    console.log(`Choices submitted are: ${temp1}, ${temp2}, and ${temp3}.`);
    d3.select("#puppyChoice>h3").text("Let me tell you about your best friend...");
    // d3.select("#dogChoiceCard>img").attr("src","{{ img }}");
    // d3.select("#defaultPupChoice").text("{{ message }}")

    // Calling results from SQL
    res_array = getSQLresults(temp1,temp2,temp3).then(response => {
        // console.log(response);
        if(response.length === 0){
            d3.select("#defaultPupChoice").text( "Hmmm, we couldnt find you one... You might be too picky. Choose another set of temperaments and try again.");
            d3.select("#dogChoiceCard>img").attr("src","Pictures/hmmm_emoji.png");
        } else if(response.length === 1) {
            d3.select("#defaultPupChoice").text(`Meet your perfect pup, the ${response[0].name}!\n
                        This pup comes from the ${response[0].gname} group of dogs.\n
                        At most, it will grow to be ${response[0].maxw}lbs, and ${response[0].maxh} inches tall.\n\n
                        Not quite happy with your result? Hit reset, and make different selections. Let's see if we can find your perfect pup.`);
            d3.select("#dogChoiceCard>img").attr("src",`https://cdn2.thedogapi.com/images/${response[0].image}.jpg`);
        } else {
            var n_res = Math.floor(Math.random() * response.length);
            d3.select("#defaultPupChoice").text(`Meet your perfect pup, the ${response[n_res].name}!\n
                        This pup comes from the ${response[n_res].gname} group of dogs.\n
                        At most, it will grow to be ${response[n_res].maxw}lbs, and ${response[n_res].maxh} inches tall.\n\n
                        Not quite happy with your result? Hit the submit button again, and let's see if we can find your perfect pup.`)
            console.log(`https://cdn2.thedogapi.com/images/${response[n_res].image}.jpg... pic is ${response[n_res].image}`);
            d3.select("#dogChoiceCard>img").attr("src",`https://cdn2.thedogapi.com/images/${response[n_res].image}.jpg`);
        }
    });


}

// Change submit button based on whether enough or too few/many selections
function checkArray(arrayLength){
    if(arrayLength === 3){
        document.getElementById("submitButton").innerHTML = "Here puppy, puppy, puppy...";
        document.getElementById("submitButton").disabled = false;
    } else if(arrayLength > 3) {
        document.getElementById("submitButton").innerHTML = "TOO MANY Selections";
        document.getElementById("submitButton").disabled = true;
    } else { // array length less than 3
        document.getElementById("submitButton").innerHTML = "Not Enough Selections!";
        document.getElementById("submitButton").disabled = true;
    }
}

// check if enough or too many selections
function checkIt(tmp) {
        chosen_temps.push(tmp);
        console.log(`${tmp} was clicked and added to chosen temps array`);
        checkArray(chosen_temps.length);
}

// Even listener for checkboxes
function changeHandler(checkbox){ 
    var tmp = checkbox.id;
    if(checkbox.checked){
        checkIt(tmp);
    } else {
        _.pull(chosen_temps,tmp); // removing element from array with Lodash
        console.log(`${tmp} was clicked and removed from chosen temps array`);
        checkArray(chosen_temps.length);
    }
}














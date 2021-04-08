//////////////////////////////////////////////////////////////////////
// Have the default picture change to a different puppy every time the page is loaded/reloaded
var pic_options = ["Pictures/369-3696233_puppy-cartoon-png.png",
                  "Pictures/transparent-cartoon-snout-pomeranian-cat-persian-dog-puffy-blush-shineyourlight5e6102ce7448e7.2134357315834160144763.png",
                  "Pictures/transparent-cartoon-clip-art-puppy-dog-breed-snout-5d686cad84fcc3.7779243015671246535447.png"];

function getNewPic(){
    d3.select("#dogChoiceCard>img").attr("src",pic_options[Math.floor(Math.random() * 3)]);
    console.log(d3.select("#dogChoiceCard>img"));
}
getNewPic();
//////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////
// Adding action to reset button
var reset = d3.select("#resetButton");

function resetBoxes(){
    console.log("Reset button has been clicked");
    d3.selectAll('input').property('checked', false); // uncheck any checked boxes
    getNewPic();
}

reset.on("click",resetBoxes); // attach on to reset button
//////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////
// Add js code to connect to SQL database here


//////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////
// Adding action to submit choices and find dog
var submitButton = d3.select("#submitButton");


//////////////////////////////////////////////////////////////////////
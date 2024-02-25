function preload(){
classifier = ml5.imageClassifier("DoodleNet");
}

function setup(){
    canvas = createCanvas(300,300);
    canvas.center();
    background("white");
    canvas.mouseReleased(modelLoaded);
    speech = window.speechSynthesis;
}

function clear(){
    background("white");
}

function modelLoaded(){
    classifier.classify(canvas,gotDraw);
}

function gotDraw(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("what").innerHTML = "Item: "+results[0].label;
        document.getElementById("yes").innerHTML = "Confidence: "+ Math.round(results[0].confidence*100)+"%";

        speka = new SpeechSynthesisUtterance("I think it is"+results[0].label+"with an accuracy of "+Math.round(results[0].confidence*100)+"percent");
        speech.speak(speka);
    }
}

function draw(){
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}
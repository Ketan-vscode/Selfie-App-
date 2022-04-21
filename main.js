var SpeechRecognition = window.webkitSpeechRecognition; // WebSpeech API used to recognise what we are speaking and convert it to text.
var recognition = new SpeechRecognition();

function start() {
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
}

recognition.onresult = function (event) {
    console.log(event);
    var Content = event.results[0][0].transcript;
    console.log(Content);
    document.getElementById("textbox").innerHTML = Content;

    if(Content == "take my selfie"){
        console.log("taking selfie ---");
        speak();
    }
}

function speak() {
    var synth = window.speechSynthesis;
    var speak_data = "taking your selfie in 5 seconds";
    var utter_this = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utter_this);
    
    Webcam.attach(camera);

    setTimeout(function(){
        take_snapshot();
        save();
    } , 5000);
}

Webcam.set({
    width: 360,
    height: 250,
    image_format: 'jpeg',
    jpeg_quality: 90
});

var camera = document.getElementById("camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="selfie_img" src=" ' +data_uri+ ' " /> ';
    });
}


function save(){
    var link = document.getElementById("link");
    var img = document.getElementById("selfie_img").src;
    link.href = img;
    link.click();
}
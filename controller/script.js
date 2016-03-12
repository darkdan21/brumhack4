$(document).ready(function () {

    var rotation;

    function devicemotion(e) {
        rotation = e.originalEvent.accelerationIncludingGravity.y / 10;
    }
    $(window).bind('devicemotion', devicemotion);

    function sendRotation(){
        console.log("rotation: " + rotation);
    }

    setInterval(sendRotation(), 10);
});

function brake(){
    console.log("brake")
}
function accelerate(){
    console.log("accelerate")
}
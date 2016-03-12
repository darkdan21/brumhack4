$(document).ready(function () {

    var ws = new WebSocket("ws://drunkdrivingsimulator.com/control");
    var rotation;

    function devicemotion(e) {
        rotation = e.originalEvent.accelerationIncludingGravity.y / 10;
    }
    $(window).bind('devicemotion', devicemotion);

    function sendRotation(){
        ws.send("1:" + rotation);
    }

    setInterval(sendRotation(), 10);
});

function brake(){
    ws.send("2:0")
}
function accelerate(){
    ws.send("3:0")
}
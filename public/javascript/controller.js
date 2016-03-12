$(document).ready(function () {

    var ws = new WebSocket("wss://drunkdrivingsimulator.com/control");
    var rotation;

    function devicemotion(e) {
        rotation = e.originalEvent.accelerationIncludingGravity.y / 10;
    }

    $(window).bind('devicemotion', devicemotion);

    function sendRotation() {
        setInterval(sendRotation,100);
        ws.send("1:" + rotation);
    }

    $('#brake').click(function () {
        ws.send("2:0")
    });

    $('#accelerate').click(function () {
        ws.send("3:0")
    });
});
$(document).ready(function () {

    var ws = new WebSocket("wss://drunkdrivingsimulator.com/control");
    var rotation;

    function devicemotion(e) {
        rotation = e.originalEvent.accelerationIncludingGravity.y / 10;
    }

    $(window).bind('devicemotion', devicemotion);


        window.setInterval(function(){
        ws.send("1:" + rotation);
        console.log("Am I running?");
    },100);

    $('#brake').click(function () {
        ws.send("2:0")
    });

    $('#accelerate').click(function () {
        ws.send("3:0")
    });
});
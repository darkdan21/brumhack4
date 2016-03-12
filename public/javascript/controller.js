$(document).ready(function () {

    var ws = new WebSocket("wss://drunkdrivingsimulator.com/control");
    var rotation;
    var rotationnew;

    function devicemotion(e) {
        rotationnew = e.originalEvent.accelerationIncludingGravity.y;
    }

    $(window).bind('devicemotion', devicemotion);


    window.setInterval(function () {
        if (abs(rotation / rotationnew) < 0.1) {
            rotation = rotationnew;
            ws.send("1:" + rotationnew);
            console.log("Am I running?");
        }
    }, 100);

    $('#brake').click(function () {
        ws.send("2:0")
    });

    $('#accelerate').click(function () {
        ws.send("3:0")
    });
});
$(document).ready(function () {

    var ws = new WebSocket("wss://drunkdrivingsimulator.com/control");
    var rotation = 0;
    var rotationnew;

    function devicemotion(e) {
        rotationnew = e.originalEvent.accelerationIncludingGravity.y;
    }

    $(window).bind('devicemotion', devicemotion);


    window.setInterval(function () {
        if (Math.abs(rotation - rotationnew) > 1) {
            rotation = rotationnew;
            if(rotation > 15) {
                rotation = 15;
            }
            if(rotation < -15){
                rotation =- 15;
            }
            ws.send("1:" + rotationnew);
            console.log("Am I running?");
        }
    }, 100);

    $('#accelerate').mousedown(function () {
        ws.send("2:1")
    });

    $('#brake').mousedown(function () {
        ws.send("3:1")
    });

    $('#accelerate').mouseup(function () {
        ws.send("2:0")
    });

    $('#brake').mouseup(function () {
        ws.send("3:0")
    });
});
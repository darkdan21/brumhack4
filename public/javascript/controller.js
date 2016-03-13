if (!window.DeviceOrientationEvent) {
    document.body.innerText = "Your device doesn't support rotation. Please try a different device";
} else
$(document).ready(function () {
    var ws = new WebSocket('wss://' + window.location.host + '/control');
    var rotation = 0;
    var rotationnew;

    $(window).bind('devicemotion', function(e) {
        rotation = e.originalEvent.accelerationIncludingGravity.y;
    });

    ws.onopen = function () {
        send('id', $.cookie('gameid'));
        setInterval(function() {
            if (ws.readyState !== 1) return;

            if (Math.abs(rotation - rotationnew) > 1) {
                rotation = rotationnew;
                if (rotation > 15) {
                    rotation = 15;
                }
                if (rotation < -15) {
                    rotation = -15;
                }
            }
            send('rot', rotation);
        }, 100);
    };

    ws.onmessage = function(msg) {
        console.log('got: ' + msg);
    };

    $('#brake').on('touchstart mousedown', function (e) {
        send('brk', 1);
    });
    $('#brake').on('touchend mouseup', function (e) {
        send('brk', 0);
    });

    $('#accelerate').on('touchstart mousedown', function (e) {
        send('acc', 1);
    });
    $('#accelerate').on('touchend mouseup', function (e) {
        send('acc', 0);
    });

    function send(event, data) {
        if (ws.readyState === 1)
            ws.send(JSON.stringify({ type: event, data: data }));
    }
});
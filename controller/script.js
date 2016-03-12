$(document).ready(function () {

    function handleOrientation(event) {
        console.log(event);
        var alpha = event.alpha;

        $('#alpha').text("Alpha: " + alpha);
    }

    $(window).bind('deviceorientation', handleOrientation);
});
$(document).ready(function () {

    function handleOrientation(event) {
        var alpha = event.alpha;

        $('#alpha').text("Alpha : ");
        $('#alpha').append(alpha);
    }

    $(window).bind('deviceorientation', handleOrientation);
});
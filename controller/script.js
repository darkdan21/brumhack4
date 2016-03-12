$(document).ready(function () {
    function handleOrientation(event) {
        var alpha = event.alpha;

        document.write(alpha);
    }

    $(window).bind('deviceorientation', handleOrientation);
});
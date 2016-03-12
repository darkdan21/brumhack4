$(document).ready(function () {

    function handleOrientation(event) {
        console.log(event);
        var alpha = event.originalEvent.alpha;


        $('#up').css({
            '-webkit-transform': 'rotate(' + alpha + 'deg)',
            '-moz-transform': 'rotate(' + alpha + 'deg)',
            '-ms-transform': 'rotate(' + alpha + 'deg)',
            'transform': 'rotate(' + alpha + 'deg)'
        });


        $('#alpha').text(alpha);


    }

    $(window).bind('deviceorientation', handleOrientation);
});
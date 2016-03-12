$(document).ready(function () {

    function devicemotion(e) {
        var rotation = e.originalEvent.accelerationIncludingGravity.y/100;


        $('#up').css({
            '-webkit-transform': 'rotate(' + rotation + 'deg)',
            '-moz-transform': 'rotate(' + rotation + 'deg)',
            '-ms-transform': 'rotate(' + rotation + 'deg)',
            'transform': 'rotate(' + rotation + 'deg)'
        });


        $('#alpha').text(rotation);


    }

    $(window).bind('devicemotion', devicemotion);
});
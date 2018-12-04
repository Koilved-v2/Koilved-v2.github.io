function countdown (dateEnd) {
    var timer, days, hours, minutes, seconds;

    dateEnd = new Date(dateEnd);
    dateEnd = dateEnd.getTime();

    if (isNaN(dateEnd)) {
        return;
    }
    timer = setInterval(calculate, 1000);

    function calculate () {
        var dateStart = new Date();
        var dateStart = new Date(dateStart.getUTCFullYear(),
            dateStart.getUTCMonth(),
            dateStart.getUTCDate(),
            dateStart.getUTCHours(),
            dateStart.getUTCMinutes(),
            dateStart.getUTCSeconds());
        var timeRemaining = parseInt((dateEnd - dateStart.getTime()) / 1000)

        if (timeRemaining >= 0) {
            days = parseInt(timeRemaining / 86400);
            timeRemaining = (timeRemaining % 86400);
            hours = parseInt(timeRemaining / 3600);
            timeRemaining = (timeRemaining % 3600);
            minutes = parseInt(timeRemaining / 60);
            timeRemaining = (timeRemaining % 60);
            seconds = parseInt(timeRemaining);

            document.getElementById("days").innerHTML = "0" + parseInt(days, 10);
            document.getElementById("hours").innerHTML = ("0" + hours).slice(-2);
            document.getElementById("minutes").innerHTML = ("0" + minutes).slice(-2);
            document.getElementById("seconds").innerHTML = ("0" + seconds).slice(-2);
        } else {
            return;
        }
    }
    function display (days, hours, minutes, seconds) {}
}

$(document).ready(function () {
    // установка времени
    countdown('11/23/2018 03:14:07 AM');
    $('.js-down-page').click(function () {
        $('html, body').animate({scrollTop: $('.b-bf__sales').offset().top}, 'slow');
        return false;
    });

    if ($(window).innerWidth() < 768) {
        $('.js-slider-brands').slick({
            dots: true,
            infinite: false,
            speed: 300,
            slidesToShow: 1,
            swipeToSlide: true,
            variableWidth: true,
            centerMode: true,
            arrows: false
        })
    }
    $(window).resize(function () {
        if ($(window).innerWidth() < 768) {
            $('.js-slider-brands').slick({
                dots: true,
                infinite: false,
                speed: 300,
                slidesToShow: 1,
                swipeToSlide: true,
                variableWidth: true,
                centerMode: true,
                arrows: false
            })
        }
    })
    if ($(window).innerWidth() > 1024) {
        $(window).mousemove(function (e) {

            let screenWidth = $(window).width();
            let screenHeight = $(window).height();

            $('.js-paralax-lg').css({
                transform:
                    'translate(-' + e.pageX / screenWidth * 20 + 'px, -' + e.pageY / screenHeight * 25 + 'px)'
            });

            $('.js-paralax-md').css({
                transform:
                    'translate(' + e.pageX / screenWidth * 25 + 'px, ' + e.pageY / screenHeight * 20 + 'px)'
            });

            $('.js-paralax-right-top').css({
                transform:
                    'translate(-' + e.pageX / screenWidth * 15 + 'px, ' + e.pageY / screenHeight * 20 + 'px)'
            });

            $('.js-paralax-bottom-left').css({
                transform:
                    'translate(' + e.pageX / screenWidth * 14 + 'px, ' + e.pageY / screenHeight * 4 + 'px)'
            });
        });
    }
});

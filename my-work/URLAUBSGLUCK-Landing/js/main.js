$(function() {

    /* Preload */

    setTimeout(function () {
        $('.preload').fadeOut('slow');
    }, 500);

    /* Login */

    var $forms = $('.login__form, .sign-up__form'),
        $signup = $('.authorization__sign-up'),
        $login = $('.authorization__log-in'),
        $signupPopup = $('.sign-up__popup'),
        $loginPopup = $('.login__popup'),
        $closePopup = $('.close__popup'),
        $body = $('body');

    $login.on('click', function(event) {
        $loginPopup.addClass('is-visible');
        $body.addClass('stop-scrolling');
        event.preventDefault();
    });

    $signup.on('click', function (event) {
        $signupPopup.addClass('is-visible');
        $body.addClass('stop-scrolling');
        event.preventDefault();
    });

    $closePopup.on('click', function () {
        $loginPopup.removeClass('is-visible') && $signupPopup.removeClass('is-visible');
        $body.removeClass('stop-scrolling');
    });

    $(document).keyup(function(event) {
        if (event.which == '27') {
            $loginPopup.removeClass('is-visible') && $signupPopup.removeClass('is-visible');
            $body.removeClass('stop-scrolling');
        }
    });

    $forms.submit(function(event) {
        $loginPopup.removeClass('is-visible') && $signupPopup.removeClass('is-visible');
        $body.removeClass('stop-scrolling');
        return false;
    });

    /* Slider */

    var $sliders = $('.slider__1, .slider__2, .slider__3');

    $sliders.each(function() {
        var $unslider = $(this).unslider({
            nav: false,
            keys: false,
            arrows: false
        });

        $(this).find('.arrows').click(function(event) {
            var fn = this.className.split(' ')[1];

            event.preventDefault();
            $unslider.data('unslider')[fn]();
        });
    });

    /* Smooth Scrolling */
    
    var $form = $('form[action="#find"]');
    
    $form.bind('click', jump);

    function jump(event) {
        var target = $(this).attr('action'),
            $body = $('html, body');

        $body.animate({
            scrollTop: $(target).offset().top
        }, 1000, function() {
            location.hash = target;
        });
        event.preventDefault();
    }
    
    /* Search Form */
    
    var $button = $('.search__partners__search-form button'),
        $input = $('.search__partners__search-form input');
    
    $button.on('click', function () {
        $input.val('');
    });

    /* Show Other Partners */

    var $list = $('.partners__wrap .partner'),
        $partnersButton = $('.partners__button__a'),
        numInList = $list.length,
        isShowing = true,
        currentCount = 0,
        numToShow = 4;

    $list.hide();
    $list.slice(0, numToShow).css('display', 'inline-block');

    $partnersButton.on('click', function () {
        var shownLength = $list.filter(':visible').length,
            listToShow = $list.slice(shownLength - 1, shownLength + numToShow),
            listToHide = $list.slice(shownLength - numToShow, numInList);

        if (isShowing) {
            listToShow.fadeIn().css({display: 'inline-block'});
            $list.filter(':visible')[currentCount].scrollIntoView();
            currentCount += 5;
            onFadeComplete();

            if ($(window).width() < 959) {
                $list.filter(':visible')[$list.filter(':visible').length - 4].scrollIntoView();
            }
        } else {
            currentCount = 0;
            listToHide.fadeOut(300, onFadeComplete.bind(this));
            $list.filter(':visible')[$list.filter(':visible').length - 8].scrollIntoView();
        }
    });

    function onFadeComplete () {
        var nowShowing = $list.filter(':visible').length;

        $(this).hide().show(0); //FadeOut bug fix

        if (nowShowing == numInList && isShowing) {
            isShowing = false;
            $partnersButton.text('Show less');
        } else if (isShowing) {
            $partnersButton.text('Show more');
        } else if (nowShowing == numToShow) {
            $partnersButton.text('See other partners');
            isShowing = true;
        }
    }
 });
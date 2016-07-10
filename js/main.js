$(function() {
    $('.js-nav a, .js-connect').click(function(e) {
        e.preventDefault();
        $('body, html').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 750);
    });
        $('.works').children().mouseover(function() {
        $(this).find('.project-thumbnail').addClass('no-bg');
    }).mouseout(function () {
        $('.project-thumbnail').removeClass('no-bg');
    });
});
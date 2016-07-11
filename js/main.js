$(function() {
    $('.js-nav a, .js-connect').click(function(e) {
        e.preventDefault();
        $('body, html').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 750);
    });
        $('.works').children().mouseover(function() {
        $(this).find('.project-thumbnail').addClass('no-bg');
        $(this).find('.button').css('opacity', 1);
        $(this).find('.project-thumbnail > p').css('opacity', 0);
    }).mouseout(function () {
        $('.project-thumbnail').removeClass('no-bg');
        $(this).find('.button').css('opacity', 0.6);
        $(this).find('.project-thumbnail > p').css('opacity', 0.8);
    });
});
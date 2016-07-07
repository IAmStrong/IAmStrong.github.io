$(function() {
    $('.js-nav a, .js-connect').click(function(e) {
        e.preventDefault();
        $('body, html').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 750);
    });
    $('.button').mouseover(function() {
        $('.project-thumbnail').addClass('no-bg');
    }).mouseout(function () {
        $('.project-thumbnail').removeClass('no-bg');
    })/* .click(function () {
        $('.project-thumbnail').removeClass('no-bg');
    }) */;
});
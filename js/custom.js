(function ($) {

    new WOW().init();

    jQuery(window).load(function () {
        jQuery("#preloader").delay(100).fadeOut("slow");
        jQuery("#load").delay(100).fadeOut("slow");
    });


    //jQuery to collapse the navbar on scroll
    $(window).scroll(function () {
        if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
    });

    //jQuery for page scrolling feature - requires jQuery Easing plugin
    $(function () {
        $('.navbar-nav li a').bind('click', function (event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
        $('.page-scroll a').bind('click', function (event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    });

    //sender
    $('#formData').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/js/phpmailer/contact-form.php',
            data: $('form#formData').serialize(),
            dataType: 'json',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            beforeSend: function () {

            },
            success: function (response) {
                $('#formData input, #formData textarea').val('');
                $('#formError').addClass('text-success').removeClass('text-danger').text('Сообщение отправлено');
            },
            error: function () {
                $('#formError').addClass('text-danger').removeClass('text-success').text('Ошибка при отправке. Повторите еще раз.');
            }
        });
    });

})(jQuery);

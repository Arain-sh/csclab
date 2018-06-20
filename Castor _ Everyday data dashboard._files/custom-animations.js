(function ($)
{
    "use strict";
    if ($(".animate").length > 0) 
    {
        $(".animate").css('opacity', 0);
    }
    if ($('#home .col-sm-7 .animate').length > 0)
    {
        $('#home .col-sm-7 .animate').waypoint(function () {
            $('#home .col-sm-7 h1.animate').addClass('fadeInLeft');
            $('#home .col-sm-7 p.animate').addClass('fadeInLeft');
            $('#home .col-sm-7 a.animate').addClass('fadeInUp');
        }, {offset: '80%'});
    }
    if ($('#home img.animate').length > 0)
    {
        $('#home img.animate').waypoint(function () {
            $('#home img.animate').addClass('fadeInRightBig');
        }, {offset: '80%'});
    }
    if ($('#home img.img-header-sm').length > 0) {
        $('#home img.img-header-sm').waypoint(function () {
            $('#home img.img-header-sm').addClass('fadeInLeftBigSolid');
        }, {offset: '80%'});
    }
    if ($('#overview .animate').length > 0) 
    {
        $('#overview .animate').waypoint(function () {
            $('#overview .col-md-3:nth-child(odd) .animate').addClass('fadeInUp');
            $('#overview .col-md-3:nth-child(even) .animate').addClass('fadeInDown');
        }, {offset: '80%'});
    }
    if ($('#steps .animate').length > 0)
    {
        $('#steps .animate').waypoint(function () {
            $('#steps .animate').addClass('fadeInUp');
        }, {offset: '80%'});
    }
    if ($('#features .animate.feat-top-left').length > 0) 
    {
        $('#features .animate.feat-top-left').waypoint(function () {
            $('#features .animate.feat-top-left').addClass('fadeInLeftBig');
        }, {offset: '80%'});
    }
    if ($('#features .animate.feat-top-right').length > 0)
    {
        $('#features .animate.feat-top-right').waypoint(function () {
            $('#features .animate.feat-top-right').addClass('fadeInRightBig');
        }, {offset: '80%'});
    }
    if ($('#features .animate.feat-bottom-left').length > 0)
    {
        $('#features .animate.feat-bottom-left').waypoint(function () {
            $('#features .animate.feat-bottom-left').addClass('fadeInLeftBig');
        }, {offset: '80%'});
    }
    if ($('#features .animate.feat-bottom-right').length > 0)
    {
        $('#features .animate.feat-bottom-right').waypoint(function () {
            $('#features .animate.feat-bottom-right').addClass('fadeInRightBig');
        }, {offset: '80%'});
    }
    if ($('#team .animate').length > 0)
    {
        $('#team .animate').waypoint(function () {
            $('#team .animate').addClass('fadeInUp');
        }, {offset: '80%'});
    }
    if ($('#pricing .animate').length > 0)
    {
        $('#pricing .animate').waypoint(function () {
            $('#pricing .animate').addClass('fadeInUp');
        }, {offset: '80%'});
    }
    if ($('#faq .animate').length > 0) 
    {
        $('#faq .animate').waypoint(function () {
            $('#faq img.animate').addClass('fadeInRightBig');
            $('#faq .panel.animate').addClass('fadeInLeft');
        }, {offset: '80%'});
    }
    if ($('#blog .animate').length > 0)
    {
        $('#blog .animate').waypoint(function () {
            $('#blog .animate').addClass('fadeInUp');
        }, {offset: '80%'});
    }
    if ($('#get-app .animate').length > 0) 
    {
        $('#get-app .animate').waypoint(function () {
            $('#get-app .animate').addClass('fadeInRight');
        }, {offset: '80%'});
    }
    if ($('#contact .animate').length > 0)
    {
        $('#contact .animate').waypoint(function () {
            $('#contact .animate:not(.delay-a)').addClass('fadeInLeft');
            $('#contact .animate.delay-a').addClass('fadeInRight');
        }, {offset: '80%'});
    }
    if ($('#blog-list .animate:eq(0)').length > 0)
    {
        $('#blog-list .animate:eq(0)').waypoint(function () {
            $('#blog-list .animate:eq(0), #blog-list .animate:eq(1), #blog-list .animate:eq(2)').addClass("fadeInUp");
        }, {offset: '80%'});
    }
    if ($('#blog-list .animate:eq(3)').length > 0)
    {
        $('#blog-list .animate:eq(3)').waypoint(function () {
            $('#blog-list .animate:eq(3), #blog-list .animate:eq(4), #blog-list .animate:eq(5)').addClass("fadeInUp");
        }, {offset: '80%'});
    }
    if ($('#blog-list .animate:eq(6)').length > 0)
    {
        $('#blog-list .animate:eq(6)').waypoint(function () {
            $('#blog-list .animate:eq(6), #blog-list .animate:eq(7), #blog-list .animate:eq(8)').addClass("fadeInUp");
        }, {offset: '80%'});
    }


})(jQuery);

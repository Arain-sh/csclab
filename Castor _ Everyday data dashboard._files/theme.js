(function ($) {
    "use strict";
    // Navbar Scroll Toggle
    $(window).on("scroll", function () 
    {
        if ($(window).scrollTop() > 20) {
            $("nav").addClass("bg-solid");
        } else {
            $("nav").removeClass("bg-solid");
        }
    }).scroll();
    // Nav Scroll Click
   
    // Screenshot Carousel
    if ($("#screenshots").length > 0) 
    {
        var hideDiv="<div id='hide' class='screenshot-hidden'></div>";
        $("#screenshots").append(hideDiv);
    }
    var owlID = $("#owl-id");
    if (owlID.length > 0) 
    {
        owlID.owlCarousel({
            items: 4,
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [991, 2],
            itemsMobile: [640, 1]
        });
        owlID.magnificPopup({// Screenshot
            delegate: "a",
            type: "image",
            tLoading: "Loading image #%curr%...",
            mainClass: "mfp-img-mobile",
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1]
            },
            image: {
                tError: "<a href='%url%'>The image #%curr%</a> could not be loaded."
            }
        });
    }
    // Screenshot Filter
    if ($("#owl-id .screenshot").length > 0) 
    {
        $("#owl-id .screenshot").clone().appendTo($("#hide"));
    }
    var ssOwlItemsA = document.querySelectorAll("#screenshots .container .owl-item > a");
    for (var i = 0; i < ssOwlItemsA.length; i++) 
    {
        ssOwlItemsA[i].style.opacity = 1;
    }
    function showProjectsbyCat(cat) 
    {
        var owl = $("#owl-id").data("owlCarousel");
        owl.addItem("<div/>", 0);
        var nb = owl.itemsAmount;
        var ssOwlItems = document.querySelectorAll("#screenshots .container .owl-item");
        for (var i = 0; i < ssOwlItems.length; i++) {
            ssOwlItems[i].style.opacity = 0;
        }
        setTimeout(function () {
            for (var i = 0; i < (nb - 1); i++)
            {
                owl.removeItem(1);
            }
            if (cat === "all") 
            {
                $("#hide .screenshot").each(function () {
                    owl.addItem($(this).clone());
                });
                ssOwlItemsA = document.querySelectorAll("#screenshots .container .owl-item > a");
                for (var i = 0; i < ssOwlItemsA.length; i++) {
                    ssOwlItemsA[i].style.opacity = 1;
                }
            } 
            else
            {
                $("#hide .screenshot." + cat).each(function () {
                    owl.addItem($(this).clone());
                });
                ssOwlItemsA = document.querySelectorAll("#screenshots .container .owl-item > a");
                for (var i = 0; i < ssOwlItemsA.length; i++) 
                {
                    ssOwlItemsA[i].style.opacity = 1;
                }
            }
            setTimeout(function () {
                owl.removeItem(0);
            }, 350);
        }, 200);
    }
    if ($(".filter-btns a").length > 0) 
    {
        $(".filter-btns a").on("click", function (e) {
            e.preventDefault();
            $(".filter-btns a").removeClass("active");
            $(this).addClass("active");
            var catbtn = $(this).attr("ID");
            showProjectsbyCat(catbtn);
        });
    }
    // video Popup
    if ($(".youtube-popup").length > 0)
    {
        $(".youtube-popup").magnificPopup({
            type: "iframe"
        });
    }
    // Testimonial
    if ($("#owl-testimonial").length > 0) 
    {
        $("#owl-testimonial").owlCarousel({
            items: 1,
            itemsDesktop: [991, 1],
            itemsDesktopSmall: [991, 1],
            itemsMobile: [785, 1],
            autoPlay: true,
            slideSpeed: 500,
            margin: 100,
            loop: true,
        });
    }
    //Contct Form
    var con_sub = $(".contact_form");
    //submit
    if (con_sub.length > 0)
    {
        con_sub.on("submit", function (e)
        {
            e.preventDefault();
            //name
            var uname = $("input.uName").val();
            //email
            var uemail = $("input.uEmail").val();
            //message
            var umsg = $(".msg").val();
            if (uname !== "" && uemail !== "" && umsg !== "")
            {
                con_sub.each(function ()
                {
                    $(this).find(":input").removeClass("contact_error");
                });
                //ajax
                var url = "./contact/contact.php";
                $.ajax({
                    type: "POST",
                    url: url,
                    data: {"con_name": uname, "con_email": uemail, "con_msg": umsg},
                    success: function ()
                    {
                        $("#ffsuccess").append("<img class='mesg_success' src='img/preloader21.gif' alt='success'>").hide()
                                .fadeIn("slow", function ()
                                {
                                    $("#ffsuccess").hide();
                                });
                        setTimeout(showUP, 2000);
                        function showUP()
                        {
                            $("#fftext").text("Contact Form is Submited").fadeOut(3000);
                        }
                        $(".contact_form")[0].reset();
                    }
                });
            }
            else
            {
                con_sub.find(".form-control").each(function (index)
                {
                    if ($(this).val() === "")
                    {
                        $(this).addClass("contact_error");                        
                    }
                    else
                    {
                        $(this).removeClass("contact_error");
                        $(this).addClass("input-expand");                        
                    }
                });
            }
        });
    }
    //Contact From Validate
    con_sub.find(".form-control").each(function (index)
    {
        $(this).on("keyup", function ()
        {
            if ($(this).val() === "")
            {
                $(this).removeClass("input-expand");
                $(this).addClass("contact_error");
            }
            else
            {
                $(this).removeClass("contact_error");
                $(this).addClass("input-expand");
            }
        });
    });
    // Mailchimp
    if ($(".mailchimp").length > 0)
    {
        $(".mailchimp").ajaxChimp({
            callback: mailchimpCallback,
            url: "mailchimp-post-url" //Replace this with your own mailchimp post URL. Don't remove the "". Just paste the url inside "".
        });
    }
    $(".memail").on("focus", function ()
    {
        $(".mchimp-errmessage").fadeOut();
        $(".mchimp-sucmessage").fadeOut();
    });
    $(".memail").on("keydown", function ()
    {
        $(".mchimp-errmessage").fadeOut();
        $(".mchimp-sucmessage").fadeOut();
    });
    $(".memail").on("click", function ()
    {
        $(".memail").val("");
    });
    function mailchimpCallback(resp)
    {
        if (resp.result === "success") {
            $(".mchimp-sucmessage").html(resp.msg).fadeIn(1000);
            $(".mchimp-errmessage").fadeOut(500);
        } else if (resp.result === "error") {
            $(".mchimp-errmessage").html(resp.msg).fadeIn(1000);
        }
    }

    //Pre-Loader
    $(window).load(function ()
    {
        if ($(".loading").length > 0) {
            $(".loading").delay(125).fadeOut(500);
        }
        if ($("header#home .display-none").length > 0) {
            $("header#home .display-none").removeClass("display-none");
        }
    });
    //Scrollup Bottom
    $(window).scroll(function ()
    {
        if ($(this).scrollTop() > 100) {
            $(".scrollup").fadeIn();
        } else {
            $(".scrollup").fadeOut();
        }
    });
    if ($(".scrollup").length > 0) 
    {
        $(".scrollup").on("click", function ()
        {
            $("html, body").animate({
                scrollTop: 0
            }, 600);
            return false;
        });
    }
})(jQuery);
! function (e) {
    "use strict";

    function a() {
        var e = {
            lat: 53.385873,
            lng: -1.471471
        },
            a = [{
                featureType: "landscape",
                stylers: [{
                    color: "#eeddee"
                }]
            }, {
                featureType: "natural",
                stylers: [{
                    hue: "#ff0000"
                }]
            }, {
                featureType: "road",
                stylers: [{
                    hue: "#5500aa"
                }, {
                    saturation: -70
                }]
            }, {
                featureType: "building",
                elementType: "labels",
                stylers: [{
                    hue: "#000066"
                }]
            }, {
                featureType: "poi",
                stylers: [{
                    hue: "#0044ff"
                }]
            }],
            t = {
                zoom: 14,
                scrollwheel: !1,
                center: new google.maps.LatLng(53.385873, -1.471471),
                styles: a
            },
            o = new google.maps.Map(document.getElementById("map"), t);
        new google.maps.Marker({
            position: e,
            map: o,
            icon: "assets/img/marker.png"
        })
    }

    function t() {
        var a = l.height(),
            t = l.scrollTop(),
            o = t + a;
        e.each(r, function () {
            var a = e(this),
                s = a.outerHeight(),
                i = a.offset().top,
                n = i + s,
                r = e(this).attr("data-animation");
            n >= t && i <= o ? a.addClass(r) : a.removeClass(r)
        })
    }
    e(window).on("load", function () {
        e("#preloader").fadeOut(1e3)
    }), e(window).on("load", function () {
        var a = e(".header"),
            t = a.find(".navbar"),
            o = 0,
            s = e(".navbar-sticky");
        e(window).scroll(function () {
            var i = e(this).scrollTop();
            i > o ? s.addClass("navbar-scrollUp") : s.removeClass("navbar-scrollUp"), o = i, t.hasClass("navbar-sticky") && (e(this).scrollTop() <= 600 || e(this).width() <= 300) ? (t.removeClass("navbar-scrollUp"), t.removeClass("navbar-sticky").appendTo(a), a.css("height", "auto")) : !t.hasClass("navbar-sticky") && e(this).width() > 300 && e(this).scrollTop() > 600 && (a.css("height", a.height()), t.addClass("navbar-scrollUp"), t.css({
                opacity: "0"
            }).addClass("navbar-sticky"), t.appendTo(e("body")).animate({
                opacity: 1
            }))
        }), e(window).trigger("resize"), e(window).trigger("scroll")
    }), e(window).width() > 991 && e(".navbar-expand-lg .navbar-nav .dropdown").hover(function () {
        e(this).addClass("").find(".dropdown-menu").addClass("show")
    }, function () {
        e(this).find(".dropdown-menu").removeClass("show")
    }), e(window).width() > 767 && e(".navbar-expand-md .navbar-nav .dropdown").hover(function () {
        e(this).addClass("").find(".dropdown-menu").addClass("show")
    }, function () {
        e(this).find(".dropdown-menu").removeClass("show")
    }), jQuery('#slider-24-plus').slippry({
        // general elements & wrapper
        slippryWrapper: '<div class="sy-box" />', // wrapper to wrap everything, including pager
        // options
        adaptiveHeight: true, // height of the sliders adapts to current slide
        useCSS: true, // true, false -> fallback to js if no browser support
        autoHover: false,
        transition: 'horizontal',
        captions: false,
        pager: false
    }), e(".cart-dropdown a").on("click", function () {
        e(".cart-dropdown a .icon-small").toggleClass("d-none")
    }), e("#brands").owlCarousel({
        loop: !0,
        margin: 30,
        autoplay: !0,
        autoplayTimeout: 3e3,
        nav: !1,
        dots: !1,
        responsiveClass: !0,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 3
            },
            992: {
                items: 5
            }
        }
    }), e("#testimonial").owlCarousel({
        loop: !0,
        margin: 30,
        dots: !1,
        nav: !0,
        navText: ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa fa-arrow-right"></i>'],
        items: 1
    }), e(".categories-slider").owlCarousel({
        margin: 20,
        loop: !0,
        autoplay: !1,
        nav: !0,
        navText: ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa fa-arrow-right"></i>'],
        dots: !1,
        autoplayTimeout: 1e3,
        items: 1,
        center: !0
    }), e(".team-slider").owlCarousel({
        loop: !0,
        margin: 30,
        dots: !1,
        nav: !0,
        navText: ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa fa-arrow-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1e3: {
                items: 4
            }
        }
    }), e(document).ready(function () {
        e(window).scroll(function () {
            e(this).scrollTop() > 100 ? e("#back-to-top").css("opacity", 1) : e("#back-to-top").css("opacity", 0)
        })
    });
    var o = e(".grid").isotope({
        itemSelector: ".element-item",
        layoutMode: "fitRows"
    }),
        s = {
            numberGreaterThan50: function () {
                var a = e(this).find(".number").text();
                return parseInt(a, 10) > 50
            },
            ium: function () {
                return e(this).find(".name").text().match(/ium$/)
            }
        };
    e("#filters").on("click", "button", function () {
        var a = e(this).attr("data-filter");
        a = s[a] || a, o.isotope({
            filter: a
        })
    }), e("#sorts").on("click", "button", function () {
        var a = e(this).attr("data-sort-by");
        o.isotope({
            sortBy: a
        })
    }), e(".button-group").each(function (a, t) {
        var o = e(t);
        o.on("click", "button", function () {
            o.find(".is-checked").removeClass("is-checked"), e(this).addClass("is-checked")
        })
    }), e(".video-box i").on("click", function () {
        var a = '<iframe class="embed-responsive-item"  allowfullscreen src="' + e(this).attr("data-video") + '"></iframe>';
        e(this).replaceWith(a)
    }), e(".select2-select").select2({
        minimumResultsForSearch: -1
    }), e(".box-video").click(function () {
        e("iframe", this)[0].src += "&amp;autoplay=1", e(this).addClass("open")
    }), e("#courseTimer").syotimer({
        year: 2019,
        month: 11,
        day: 9,
        hour: 20,
        minute: 30
    });
    var i = e("#counter");
    if (i.length) {
        var n = 0;
        e(window).scroll(function () {
            var a = i.offset().top - window.innerHeight;
            0 === n && e(window).scrollTop() > a && (e(".counter-value").each(function () {
                var a = e(this),
                    t = a.attr("data-count");
                e({
                    countNum: a.text()
                }).animate({
                    countNum: t
                }, {
                        duration: 5e3,
                        easing: "swing",
                        step: function () {
                            a.text(Math.floor(this.countNum))
                        },
                        complete: function () {
                            a.text(this.countNum)
                        }
                    })
            }), n = 1)
        })
    }
    e(window).scroll(function () {
        e(this).scrollTop() > 100 ? e(".scrollup").fadeIn() : e(".scrollup").fadeOut()
    }), e(".scrollup").click(function () {
        return e("html, body").animate({
            scrollTop: 0
        }, 500), !1
    }), e(window).scroll(function () {
        e(this).scrollTop() > 400 ? e(".element-right-sidebar").addClass("sidebar-fixed") : e(".element-right-sidebar").removeClass("sidebar-fixed"), e(window).scrollTop() + e(window).height() > e(document).height() - 590 ? e(".element-right-sidebar").addClass("right-sidebar-absolute").removeClass("sidebar-fixed") : e(".element-right-sidebar").removeClass("right-sidebar-absolute")
    }), e("#map").length && google.maps.event.addDomListener(window, "load", a);
    var r = e(".animated"),
        l = e(window);
    l.on("scroll resize", t), l.trigger("scroll"), e(".incr-btn").on("click", function (a) {
        var t = e(this),
            o = t.parent().find(".quantity").val();
        if (t.parent().find('.incr-btn[data-action="decrease"]').removeClass("inactive"), "increase" === t.data("action")) var s = parseFloat(o) + 1;
        else if (o > 1) var s = parseFloat(o) - 1;
        else s = 1, t.addClass("inactive");
        t.parent().find(".quantity").val(s), a.preventDefault()
    }), e('[data-toggle="tooltip"]').tooltip(), e('.scrolling  a[href*="#"]').on("click", function (a) {
        function t(a) {
            e(o).velocity("scroll", {
                duration: 800,
                offset: a,
                easing: "easeOutExpo",
                mobileHA: !1
            })
        }
        a.preventDefault(), a.stopPropagation();
        var o = e(this).attr("href");
        t(e("#body").hasClass("up-scroll") || e("#body").hasClass("static") ? 2 : -90)
    });
    var d = document.getElementById("slider-non-linear-step");
    d && noUiSlider.create(d, {
        connect: !0,
        start: [125, 750],
        range: {
            min: [0],
            max: [1e3]
        }
    });
    var c = [document.getElementById("lower-value"), document.getElementById("upper-value")];
    document.getElementById("price-range") && d.noUiSlider.on("update", function (e, a) {
        c[a].innerHTML = "$" + Math.floor(e[a])
    }), (new WOW).init()
}(jQuery);
// (function(i, s, o, g, r, a, m) {
//     i['GoogleAnalyticsObject'] = r;
//     i[r] = i[r] || function() {
//         (i[r].q = i[r].q || []).push(arguments)
//     }, i[r].l = 1 * new Date();
//     a = s.createElement(o), m = s.getElementsByTagName(o)[0];
//     a.async = 1;
//     a.src = g;
//     m.parentNode.insertBefore(a, m)
// })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
// ga('create', 'UA-71155940-5', 'auto');
// ga('send', 'pageview');
// (function(w, i, d, g, e, t, s) {
//     w[d] = w[d] || [];
//     t = i.createElement(g);
//     t.async = 1;
//     t.src = e;
//     s = i.getElementsByTagName(g)[0];
//     s.parentNode.insertBefore(t, s);
// })(window, document, '_gscq', 'script', '//widgets.getsitecontrol.com/46851/script.js');
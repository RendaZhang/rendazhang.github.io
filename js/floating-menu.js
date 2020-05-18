/* Global constants */
/*global jQuery */
jQuery(function($) {
    'use strict';

    /**
        Floating menu app
    */
    var FloatingMenuApp = {
        //config
        $options: {
            float_speed: 1500,
            float_easing: 'easeOutQuint',
            menu_fade_speed: 500,
            closed_menu_opacity: 0.75
        }, //default config
        //vars
        $flmenu: $(".fl_menu"),
        $sidebarheader: $(".sidebar-section"),
        $sidebarsocial: $("#sidebar-social"),
        $menuPosition: 0,

        floatMenu: function() {
            var scrollAmount = $(document).scrollTop();
            var newPosition = this.$menuPosition + scrollAmount;

            if ($(window).height() < this.$flmenu.height()) {
                this.$flmenu.css("top", this.$menuPosition);
            } else {
                if (newPosition <= 0)
                    newPosition = 40
                this.$flmenu.stop().animate({
                    top: newPosition
                }, this.$options.float_speed, this.$options.float_easing);
            }
        },
        initMenuOnLoad: function() {
            this.$menuPosition = this.$flmenu.position().top;
            this.floatMenu();
        },
        scrollMenu: function() {
            if ($(document).width() >= 960)
                this.floatMenu();
        },
        bindEvents: function() {
            //any event binding related code should go here in future
        },
        init: function(_options) {
            //initializing the contact form
            $('.animationload').hide();
            $.extend(this.$options, _options);
            this.bindEvents();
            return this;
        }
    };

    /**
    Main application module
    */
    var App = {
        $options: {},
        $floatMenu: FloatingMenuApp.init(),
        $loader: $('.loader'),
        $animationload: $('.animationload'),
        $responsiveMenu: $('a.elemadded'),
        $navbarVertical: $('.navbar-vertical'),
        $menuItem: $('.main-menu a'),

        bindEvents: function() {
            //binding events
            $(window).on('load', this.load.bind(this));
            $(window).on('scroll', this.scroll.bind(this));
            $(document).on('ready', this.docReady.bind(this));
        },
        //window load event
        load: function() {
            /* Page Preloader */
            this.$loader.delay(300).fadeOut();
            this.$animationload.delay(100).fadeOut("slow");
            //initilizing menu
            this.$floatMenu.initMenuOnLoad();
        },
        //window scroll event
        scroll: function() {
            //scrolling menu
            this.$floatMenu.scrollMenu();
        },
        windowReady: function() {
            this.$animationload.hide();
            console.log("animationload.hide()");
        },
        //responsive menu
        responsiveMenuOnClick: function(e) {
            e.preventDefault(); //default
            if (this.$navbarVertical.hasClass('active'))
                this.$navbarVertical.removeClass('active');
            else
                this.$navbarVertical.addClass('active');
        },
        //document ready event
        docReady: function() {
           //contat form
            ContactFormApp.init();

            /*  menu responsive */
            this.$responsiveMenu.on('click', this.responsiveMenuOnClick.bind(this));

            /* menu */
            this.$menuItem.on('click', this.menuItemOnClick.bind(this));

            /* NiceScroll */
            $("html").niceScroll({
                scrollspeed: 50,
                mousescrollstep: 38,
                cursorwidth: 7,
                cursorborder: 0,
                autohidemode: true,
                zindex: 9999999,
                horizrailenabled: false,
                cursorborderradius: 0
            });

            var wow = new WOW({
                boxClass: 'wow', // animated element css class (default is wow)
                animateClass: 'animated', // animation css class (default is animated)
                offset: 10, // distance to the element when triggering the animation (default is 0)
                mobile: false // trigger animations on mobile devices (true is default)
            });
            wow.init();
        },
        init: function(_options) {
            $.extend(this.$options, _options);
            this.bindEvents();
        }
    };

    //Initializing the app
    App.init({});

});

// SmoothLink
$('.navbar-nav a').on('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top - 0
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
});

// back to top
$(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
        $('.back-to-top').fadeIn();
    } else {
        $('.back-to-top').fadeOut();
    }
});
$('.back-to-top').click(function() {
    $("html, body").animate({
        scrollTop: 0
    }, 1000);
    return false;
});
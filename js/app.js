/*
  Template Name : Swiftly  - Responsive Personal Template
  Author: Themesdesign
  Create Date: Feb 2019
  Version: v1.0
*/


(function ($) {

    'use strict';

    // scrollspy
    $(".navbar-vertical").scrollspy({
        offset: 200
    });

    //mfp popup 
    $('.mfp-image').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-fade',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
        }
    });

    // animated header text
    $('.tlt').textillate({
        loop: true,
        minDisplayTime: 2e3,
        initialDelay: 0,
        autoStart: true,
        "in": {
            effect: "flipInY",
            delayScale: 2.5,
            delay: 50,
            sync: false,
            shuffle: false,
            reverse: false
        },
        out: {
            effect: "flipOutY",
            delayScale: 2.5,
            delay: 50,
            sync: false,
            shuffle: false,
            reverse: false
        }
    });

})(jQuery)
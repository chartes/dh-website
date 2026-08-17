/* Surcharge projet de themes/educenter-hugo/assets/js/script.js
   (le thème est un sous-module git : la correction doit vivre ici).

   Le script du thème appelait `$('.hero-slider').slickAnimation()` sans que le
   greffon slick-animation soit chargé : une TypeError était levée à chaque page
   et interrompait l'exécution du reste du fichier. Les blocs qui suivaient
   (venobox, filterizr, compteurs, animations) n'étaient donc jamais enregistrés.
   Aucun de ces composants n'est utilisé par le site, d'où l'absence d'effet
   visible — mais l'erreur restait présente sur les 119 pages, et le moindre
   ajout de code en fin de fichier aurait été silencieusement mort.

   Chaque initialisation de greffon est désormais gardée : on vérifie que la
   cible existe ET que le greffon est disponible. Comportement identique,
   sans exception. */
(function ($) {
  'use strict';

  // Preloader js
  $(window).on('load', function () {
    $('.preloader').fadeOut(100);
  });

  // Sticky Menu
  $(window).scroll(function () {
    var height = $('.top-header').innerHeight();
    if ($('header').offset().top > 10) {
      $('.top-header').addClass('hide');
      $('.navigation').addClass('nav-bg');
      $('.navigation').css('margin-top', '-' + height + 'px');
    } else {
      $('.top-header').removeClass('hide');
      $('.navigation').removeClass('nav-bg');
      $('.navigation').css('margin-top', '-' + 0 + 'px');
    }
  });

  // Background-images
  $('[data-background]').each(function () {
    $(this).css({
      'background-image': 'url(' + $(this).data('background') + ')'
    });
  });

  // Hero Slider
  var $heroSlider = $('.hero-slider');
  if ($heroSlider.length && $.fn.slick) {
    $heroSlider.slick({
      autoplay: true,
      autoplaySpeed: 7500,
      pauseOnFocus: false,
      pauseOnHover: false,
      infinite: true,
      arrows: true,
      fade: true,
      prevArrow: '<button type=\'button\' class=\'prevArrow\' aria-label=\'Diapositive précédente\'><i class=\'ti-angle-left\' aria-hidden=\'true\'></i></button>',
      nextArrow: '<button type=\'button\' class=\'nextArrow\' aria-label=\'Diapositive suivante\'><i class=\'ti-angle-right\' aria-hidden=\'true\'></i></button>',
      dots: true
    });
    if ($.fn.slickAnimation) {
      $heroSlider.slickAnimation();
    }
  }

  // venobox popup
  $(document).ready(function () {
    if ($('.venobox').length && $.fn.venobox) {
      $('.venobox').venobox();
    }
  });

  // filter
  $(document).ready(function () {
    var containerEl = document.querySelector('.filtr-container');
    if (containerEl && $.fn.filterizr) {
      $('.filtr-container').filterizr({});
    }
    // Active changer
    $('.filter-controls li').on('click', function () {
      $('.filter-controls li').removeClass('active');
      $(this).addClass('active');
    });
  });

  //  Count Up
  function counter() {
    var oTop;
    if ($('.count').length !== 0) {
      oTop = $('.count').offset().top - window.innerHeight;
    }
    if ($(window).scrollTop() > oTop) {
      $('.count').each(function () {
        var $this = $(this),
          countTo = $this.attr('data-count');
        $({
          countNum: $this.text()
        }).animate({
          countNum: countTo
        }, {
          duration: 1000,
          easing: 'swing',
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(this.countNum);
          }
        });
      });
    }
  }
  $(window).on('scroll', function () {
    counter();
  });

  // Animation
  $(document).ready(function () {
    $('.has-animation').each(function () {
      $(this).delay($(this).data('delay')).queue(function () {
        $(this).addClass('animate-in');
      });
    });
  });

})(jQuery);

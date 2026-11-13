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

// Hand scroll

(function () {
  'use strict';

  var panel = document.querySelector('[data-hand-scroll]');
  var toggle = document.querySelector('[data-hand-scroll-toggle]');
  var video = document.querySelector('[data-hand-scroll-video]');
  var status = document.querySelector('[data-hand-scroll-status]');
  var cursor = document.querySelector('[data-hand-scroll-cursor]');
  var stream;
  var handLandmarker;
  var animationFrame;
  var previousIndexY;
  var lastScrollAt = 0;

  if (!panel || !toggle || !video || !status || !cursor) {
    return;
  }

  function setStatus(message) {
    status.textContent = message;
  }

  function withTimeout(promise, message, delay) {
    var timeout = new Promise(function (_, reject) {
      window.setTimeout(function () {
        reject(new Error(message));
      }, delay);
    });
    return Promise.race([promise, timeout]);
  }

  function stopHandScroll() {
    if (animationFrame) {
      window.cancelAnimationFrame(animationFrame);
    }
    if (stream) {
      stream.getTracks().forEach(function (track) {
        track.stop();
      });
    }
    stream = null;
    video.srcObject = null;
    previousIndexY = undefined;
    cursor.style.display = 'none';
    panel.dataset.active = 'false';
    toggle.textContent = 'Activer la caméra';
    toggle.disabled = false;
    setStatus('La caméra est désactivée.');
  }

  function trackHand(timestamp) {
    if (!handLandmarker || video.readyState < 2) {
      animationFrame = window.requestAnimationFrame(trackHand);
      return;
    }

    var result = handLandmarker.detectForVideo(video, timestamp);
    var hand = result.landmarks && result.landmarks[0];
    var indexTip = hand && hand[8];

    if (indexTip) {
      var cursorX = (1 - indexTip.x) * window.innerWidth;
      var cursorY = indexTip.y * window.innerHeight;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      cursor.style.display = 'block';
      if (previousIndexY !== undefined) {
        var movement = previousIndexY - indexTip.y;
        var now = performance.now();
        if (Math.abs(movement) > 0.025 && now - lastScrollAt > 180) {
          var scrollAmount = Math.max(-100, Math.min(100, movement * 1400));
          window.scrollBy({ top: scrollAmount, behavior: 'smooth' });
          lastScrollAt = now;
        }
      }
      previousIndexY = indexTip.y;
      setStatus('Index détecté : monte ou descends le doigt pour faire défiler.');
    } else {
      previousIndexY = undefined;
      cursor.style.display = 'none';
      setStatus('Aucune main détectée.');
    }

    animationFrame = window.requestAnimationFrame(trackHand);
  }

  async function startHandScroll() {
    toggle.disabled = true;
    setStatus('Chargement de la détection de main...');

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('camera-unavailable');
      }

      var visionModule = await withTimeout(
        import('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/vision_bundle.mjs'),
        'media-pipe-module-timeout',
        15000
      );
      var vision = await withTimeout(visionModule.FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm'
      ), 'media-pipe-wasm-timeout', 15000);
      handLandmarker = await withTimeout(visionModule.HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
          delegate: 'GPU'
        },
        runningMode: 'VIDEO',
        numHands: 1
      }), 'media-pipe-model-timeout', 15000);
      stream = await withTimeout(navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false
      }), 'camera-timeout', 15000);
      video.srcObject = stream;
      await video.play();
      panel.dataset.active = 'true';
      toggle.textContent = 'Désactiver la caméra';
      toggle.disabled = false;
      setStatus('Aucune main détectée.');
      animationFrame = window.requestAnimationFrame(trackHand);
    } catch (error) {
      console.error('Hand scroll could not start:', error);
      stopHandScroll();
      if (error.name === 'NotAllowedError') {
        setStatus('Accès à la caméra refusé.');
      } else if (error.message === 'media-pipe-module-timeout') {
        setStatus('Le chargement de MediaPipe a expiré. Vérifie ta connexion ou les bloqueurs de contenu.');
      } else if (error.message === 'media-pipe-wasm-timeout') {
        setStatus('Le module MediaPipe est bloqué par le navigateur.');
      } else if (error.message === 'media-pipe-model-timeout') {
        setStatus('Le modèle MediaPipe est bloqué par le navigateur.');
      } else if (error.message === 'camera-timeout') {
        setStatus('La caméra n’a pas répondu à temps.');
      } else {
        setStatus('La détection de main est indisponible.');
      }
    }
  }

  toggle.addEventListener('click', function () {
    if (stream) {
      stopHandScroll();
    } else {
      startHandScroll();
    }
  });
})();

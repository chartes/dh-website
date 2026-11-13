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
  var lastScrollAt = 0;
  var lastIndexGesture;
  var pinchStartedAt;
  var pinchTarget;
  var pinchClicked = false;
  var lastClickAt = 0;

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
    lastIndexGesture = undefined;
    pinchStartedAt = undefined;
    pinchTarget = undefined;
    pinchClicked = false;
    cursor.classList.remove('is-pinching');
    cursor.style.display = 'none';
    panel.dataset.active = 'false';
    toggle.textContent = 'Activer la caméra';
    toggle.disabled = false;
    setStatus('La caméra est désactivée.');
  }

  function distance(first, second) {
    return Math.hypot(first.x - second.x, first.y - second.y, first.z - second.z);
  }

  function isFingerCurled(landmarks, tipIndex, pipIndex) {
    var wrist = landmarks[0];
    return distance(landmarks[tipIndex], wrist) < distance(landmarks[pipIndex], wrist) * 1.05;
  }

  function angleBetween(first, second, third) {
    var firstVector = { x: first.x - second.x, y: first.y - second.y, z: first.z - second.z };
    var secondVector = { x: third.x - second.x, y: third.y - second.y, z: third.z - second.z };
    var dotProduct = firstVector.x * secondVector.x + firstVector.y * secondVector.y + firstVector.z * secondVector.z;
    var firstLength = distance(first, second);
    var secondLength = distance(third, second);
    var cosine = dotProduct / (firstLength * secondLength);
    return Math.acos(Math.max(-1, Math.min(1, cosine))) * 180 / Math.PI;
  }

  function getInteractiveTarget(x, y) {
    var element = document.elementFromPoint(x, y);
    return element && element.closest('a, button, input, select, textarea, [role="button"], [tabindex]:not([tabindex="-1"])');
  }

  function updatePinch(indexTip, thumbTip, cursorX, cursorY, now) {
    var pinchDistance = distance(indexTip, thumbTip);
    var isPinching = pinchDistance < 0.06;

    if (!isPinching) {
      pinchStartedAt = undefined;
      pinchTarget = undefined;
      pinchClicked = false;
      cursor.classList.remove('is-pinching');
      return false;
    }

    var target = getInteractiveTarget(cursorX, cursorY);
    cursor.classList.add('is-pinching');
    if (!target) {
      setStatus('Pincement détecté : aucun élément interactif ici.');
      return true;
    }
    if (target !== pinchTarget) {
      pinchTarget = target;
      pinchStartedAt = now;
      pinchClicked = false;
    }
    if (!pinchStartedAt) {
      pinchStartedAt = now;
    }
    if (!pinchClicked && now - pinchStartedAt >= 300 && now - lastClickAt >= 700) {
      target.click();
      pinchClicked = true;
      lastClickAt = now;
      setStatus('Clic déclenché. Relâche puis pince à nouveau pour cliquer.');
    } else if (!pinchClicked) {
      setStatus('Maintiens le pincement pour cliquer.');
    }
    return true;
  }

  function trackHand(timestamp) {
    if (!handLandmarker || video.readyState < 2) {
      animationFrame = window.requestAnimationFrame(trackHand);
      return;
    }

    var result = handLandmarker.detectForVideo(video, timestamp);
    var hand = result.landmarks && result.landmarks[0];
    var indexTip = hand && hand[8];
    var indexPip = hand && hand[6];
    var thumbTip = hand && hand[4];
    var thumbIp = hand && hand[3];
    var thumbMcp = hand && hand[2];

    if (indexTip) {
      var cursorX = (1 - indexTip.x) * window.innerWidth;
      var cursorY = indexTip.y * window.innerHeight;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      cursor.style.display = 'block';
    } else {
      cursor.style.display = 'none';
    }

    var now = performance.now();
    var pinchActive = indexTip && thumbTip && updatePinch(
      indexTip,
      thumbTip,
      (1 - indexTip.x) * window.innerWidth,
      indexTip.y * window.innerHeight,
      now
    );
    if (!indexTip || !thumbTip) {
      pinchStartedAt = undefined;
      pinchTarget = undefined;
      pinchClicked = false;
      cursor.classList.remove('is-pinching');
    }

    if (!pinchActive && indexTip && indexPip && thumbTip && thumbIp && thumbMcp) {
      var indexExtended = distance(indexTip, hand[0]) > distance(indexPip, hand[0]) * 1.1;
      var thumbExtended = distance(thumbTip, hand[0]) > distance(thumbIp, hand[0]) * 1.15;
      var curledFingers = [
        isFingerCurled(hand, 12, 10),
        isFingerCurled(hand, 16, 14),
        isFingerCurled(hand, 20, 18)
      ].filter(Boolean).length;
      var thumbAngle = angleBetween(indexTip, hand[0], thumbTip);
      var indexGesture = '';
      if (indexExtended && thumbExtended && curledFingers >= 2 && thumbAngle >= 45 && thumbAngle <= 90) {
        if (indexTip.y < indexPip.y - 0.05) {
          indexGesture = 'up';
        } else if (indexTip.y > indexPip.y + 0.05) {
          indexGesture = 'down';
        }
      }

      if (indexGesture) {
        if (indexGesture !== lastIndexGesture || now - lastScrollAt > 700) {
          window.scrollBy({
            top: indexGesture === 'up' ? -180 : 180,
            behavior: 'smooth'
          });
          lastScrollAt = now;
        }
        lastIndexGesture = indexGesture;
        setStatus(indexGesture === 'up' ?
          'Index vers le haut : défilement vers le haut.' :
          'Index vers le bas : défilement vers le bas.');
      } else {
        lastIndexGesture = undefined;
        setStatus(indexTip ? 'Index détecté.' : 'Aucune main détectée.');
      }
    } else {
      lastIndexGesture = undefined;
      setStatus(indexTip ? 'Index détecté.' : 'Aucune main détectée.');
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

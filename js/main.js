jQuery(document).ready(function ($) {
  // helper functions
  function is_touch_device() {
    if ("ontouchstart" in window) return true;
    if (window.DocumentTouch && document instanceof DocumentTouch) return true;
    return window.matchMedia("(pointer: coarse)").matches;
  }

  function getScrollBarWidth() {
    var inner = document.createElement("p");
    inner.style.width = "100%";
    inner.style.height = "200px";
    var outer = document.createElement("div");
    outer.style.position = "absolute";
    outer.style.top = "0px";
    outer.style.left = "0px";
    outer.style.visibility = "hidden";
    outer.style.width = "100%";
    outer.style.height = "150px";
    outer.style.overflow = "hidden";
    outer.appendChild(inner);
    document.body.appendChild(outer);
    var w1 = inner.offsetWidth;
    outer.style.overflow = "scroll";
    var w2 = inner.offsetWidth;
    if (w1 == w2) w2 = outer.clientWidth;
    document.body.removeChild(outer);
    return w1 - w2;
  }

  // function switchNavToggler() {
  //   if (!is_touch_device()) {
  //     $(".dropdown-toggle").removeAttr("data-bs-toggle");
  //     $(".dropdown").attr("data-bs-hover", "dropdown");
  //   } else {
  //     $(".dropdown").removeAttr("data-bs-hover");
  //     $(".dropdown-toggle").attr("data-bs-toggle", "dropdown");
  //   }
  // }

  // function eqHeightReset(elements) {
  //   elements.each(function () {
  //     $(this).height("auto");
  //   });
  // }

  // function eqHeight(elements) {
  //   var eqHeight = 0;
  //   elements.each(function () {
  //     var ht = $(this).height();
  //     if (ht > eqHeight) {
  //       eqHeight = ht;
  //     }
  //   });
  //   elements.each(function () {
  //     $(this).height(eqHeight);
  //   });
  // }

  function elementInViewport(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;
    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      left += el.offsetLeft;
    }
    return top < window.pageYOffset + window.innerHeight && left < window.pageXOffset + window.innerWidth && top + height > window.pageYOffset && left + width > window.pageXOffset;
  }

  // eqHeight($(".cards-list .row .card-title"));

  // $(window).on("resize", function () {
  //   eqHeightReset($(".cards-list .row .card-title"));
  //   if ($(window).width() >= 768) {
  //     eqHeight($(".cards-list .row .card-title"));
  //   }
  // });

  const lenis = new Lenis();

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  lenis.on("scroll", (e) => {
    var scrolled = e.targetScroll;

    if (scrolled > 40) {
      $(".header").addClass("header-fixed");
    } else {
      $(".header").removeClass("header-fixed");
    }
  });

  if (lenis.animatedScroll > 40) {
    $(".header").addClass("header-fixed");
  }
  // navigation
  $("#navbarContent").on("show.bs.collapse", function () {
    const scrollY = $(window).scrollTop();
    $("body").css({ position: "fixed", top: -scrollY });
  });
  $("#navbarContent").on("hide.bs.collapse", function () {
    const body = document.body;
    const scrollY = body.style.top;
    body.removeAttribute("style");
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
  });

  $(document).on("click", ".navbar-nav > li > a", function (e) {
    if ($(window).width() < 992) {
      e.preventDefault();
      $(this).next(".menu-level-1").slideToggle(300);
    }
  });
  $(document).on("click", ".navbar-nav .menu-level-1 > ul > li > a", function (e) {
    if ($(window).width() < 992) {
      if ($(this).next(".menu-level-2").length) {
        e.preventDefault();
        $(this).next(".menu-level-2").slideToggle(300);
      }
    }
  });
  $(".navbar-nav .menu-level-1 > ul > li").each(function () {
    if ($(this).find("ul").length) {
      $(this).addClass("level-1-parent");
    }
  });

  // footer

  // sliders
  if ($(".swiper-01").length) {
    const swiperBanner = new Swiper(".swiper-01", {
      speed: 1000,
      spaceBetween: 0,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      autoplay: {
        delay: 5000,
      },
    });
  }
  if ($(".swiper-02").length) {
    const swiper2 = new Swiper(".swiper-02", {
      spaceBetween: 17,
      slidesPerView: "auto",
      breakpoints: {
        768: {
          spaceBetween: 64,
          slidesPerView: "auto",
        },
        992: {
          spaceBetween: 90,
          slidesPerView: "auto",
        },
      },
    });
  }
  if ($(".swiper-03").length) {
    document.querySelectorAll(".swiper-03").forEach((el) => {
      const swiper3 = new Swiper(el, {
        spaceBetween: 25,
        slidesPerView: "auto",
        breakpoints: {
          992: {
            spaceBetween: 30,
            slidesPerView: 3,
            allowTouchMove: false,
          },
        },
      });
    });
  }
  if ($(".swiper-04").length) {
    const swiper3 = new Swiper(".swiper-04", {
      loop: true,
      spaceBetween: 0,
      slidesPerView: 1,
      navigation: {
        nextEl: ".swiper-04-nav .swiper-button-next",
        prevEl: ".swiper-04-nav .swiper-button-prev",
      },
    });
  }
  if ($(".product-detail-slider").length) {
    const swiperThumbs = new Swiper(".swiper-thumbs", {
      spaceBetween: 10,
      slidesPerView: 3,
      direction: "vertical",
      watchSlidesProgress: true,
      navigation: {
        prevEl: ".swiper-thumbs-wrapper .swiper-button-prev",
        nextEl: ".swiper-thumbs-wrapper .swiper-button-next",
      },
    });
    const swiperProduct = new Swiper(".swiper-main", {
      spaceBetween: 10,
      thumbs: {
        swiper: swiperThumbs,
      },
    });
  }

  // click
  $(document)
    .on("click", ".footer nav .nav-title", function () {
      if ($(window).width() < 992) {
        $(this).toggleClass("active");
        $(this).next("ul").slideToggle(300);
      }
    })
    .on("click", ".video-play", function () {
      var video = $(this).prev("video");
      $(this).hide();
      video.attr("controls", true);
      video.get(0).play();
    })
    .on("click", ".btn-text-more button", function () {
      $(this).parents(".block-text").find(".text-hidden").slideToggle(300);
    });

  if (document.querySelector(".btn-scroll-down")) {
    var offset = 0;
    if ($(window).width() >= 992) {
      offset = -99;
    }
    document.querySelector(".btn-scroll-down").addEventListener("click", function () {
      var nextSection = this.parentNode.nextElementSibling;
      lenis.scrollTo(nextSection, { offset: offset, duration: 2 });
    });
  }

  // forms
  $(".form-select").on("change", function () {
    if ($(this).val() !== "" && $(this).val() !== "0") {
      $(this).addClass("selected");
    } else {
      $(this).removeClass("selected");
    }
  });

  // hide contact block

  if (elementInViewport(document.querySelector(".footer"))) {
    $(".contact-block-fixed").css("z-index", 1);
  } else {
    $(".contact-block-fixed").css("z-index", 1001);
  }
  $(window).on("scroll", function () {
    if (elementInViewport(document.querySelector(".footer"))) {
      $(".contact-block-fixed").css("z-index", 1);
    } else {
      $(".contact-block-fixed").css("z-index", 1001);
    }
  });
});

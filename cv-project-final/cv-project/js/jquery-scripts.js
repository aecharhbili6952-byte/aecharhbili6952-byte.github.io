/* js/jquery-scripts.js — Interactions jQuery du CV */

$(document).ready(function () {

  /* 1. Navigation active au scroll */
  var $sections = $("section[id]");

  $(window).on("scroll.nav", function () {
    var scrollPos = $(window).scrollTop() + 80;

    $sections.each(function () {
      var id     = $(this).attr("id");
      var top    = $(this).offset().top;
      var bottom = top + $(this).outerHeight();

      if (scrollPos >= top && scrollPos < bottom) {
        $(".nav-link").removeClass("active");
        $(".nav-link[href='#" + id + "']").addClass("active");
      }
    });
  });

  $(window).trigger("scroll.nav");


  /* 2. Menu mobile toggle */
  $("#menu-toggle").on("click", function () {
    var $menu  = $("#nav-mobile");
    var isOpen = $menu.is(":visible");

    if (isOpen) {
      $menu.slideUp(220);
      $(this).find("i").removeClass("fa-xmark").addClass("fa-bars");
    } else {
      $menu.slideDown(220);
      $(this).find("i").removeClass("fa-bars").addClass("fa-xmark");
    }
  });

  $("#nav-mobile .nav-link").on("click", function () {
    $("#nav-mobile").slideUp(220);
    $("#menu-toggle i").removeClass("fa-xmark").addClass("fa-bars");
  });


  /* 3. Accordéon Formation */
  $(".acc-trigger").on("click", function () {
    var $trigger = $(this);
    var $body    = $trigger.next(".acc-body");
    var isOpen   = $trigger.hasClass("open");

    $(".acc-trigger").removeClass("open");
    $(".acc-body").slideUp(280);

    if (!isOpen) {
      $trigger.addClass("open");
      $body.slideDown(280);
    }
  });


  /* 4. Animation des barres de compétences au scroll */
  var barsAnimated = false;

  function animateBarsIfVisible() {
    if (barsAnimated) return;

    var $skillsSection = $("#skills-bars");
    if ($skillsSection.length === 0) return;

    var sectionTop   = $skillsSection.offset().top;
    var windowBottom = $(window).scrollTop() + $(window).height();

    if (windowBottom > sectionTop + 60) {
      barsAnimated = true;

      $(".skill-bar").each(function () {
        var level = $(this).data("level");
        $(this).css("width", level + "%");
      });
    }
  }

  $(window).on("scroll.bars", animateBarsIfVisible);
  animateBarsIfVisible();


  /* 5. Hover sur les soft-skill tags */
  $("#soft-tags")
    .on("mouseenter", ".tag", function () {
      $(this).css({ "border-color": "var(--accent)", "color": "var(--accent)" });
    })
    .on("mouseleave", ".tag", function () {
      $(this).css({ "border-color": "var(--border)", "color": "var(--muted)" });
    });


  /* 6. Smooth scroll sur les liens d'ancre */
  $("a[href^='#']").on("click", function (e) {
    var target = $(this).attr("href");
    if ($(target).length) {
      e.preventDefault();
      $("html, body").animate(
        { scrollTop: $(target).offset().top - 65 },
        500,
        "swing"
      );
    }
  });

});


/* 7. Toast de notification — appelé depuis ContactForm */
function showToast(message) {
  $("#toast-msg").text(message);
  $("#toast")
    .css("display", "flex")
    .hide()
    .fadeIn(300)
    .delay(3200)
    .fadeOut(450);
}

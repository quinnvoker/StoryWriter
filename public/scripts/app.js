$(() => {

  /*scrolling effect on nav*/
  $(".menu-icon").on("click", function() {
      $("nav ul").toggleClass("showing");
    });
  });

  $(window).on("scroll", function() {
    if($(window).scrollTop()) {
      $('nav').addClass('black');
    } else {
    $('nav').removeClass('black');
  }

});

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
  /*scroll ends here*/
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});

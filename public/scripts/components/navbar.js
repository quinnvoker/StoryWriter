$(() => {
  const $navbar = $(`
  <nav>
    <div class="menu-icon">
        <i class="fa fa-bars fa-2x"></i>
    </div>
    <div class="logo">
        Story_Writer.
    </div>
    <div class="menu">
        <ul>
          <li><a id="home" href="#">Home</a></li>
          <li><a id="my-stories" href="#">My Stories</a></li>
          <li><a id="contributions" href="#">Contributions</a></li>
        </ul>
    </div>
  </nav>
  `);

  $(window).on("scroll", function() {
    if($(window).scrollTop()) {
      $navbar.addClass('black');
    } else {
      $navbar.removeClass('black');
    }
  });

  $navbar.find('#home').click(() => {
    views_manager.show('home');
  });

  $navbar.find('#my-stories').click(() => {
    views_manager.show('myStories');
  });

  $navbar.prependTo($('body'));
});
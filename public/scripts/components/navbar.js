$(() => {
  const $navbar = $(`
  <nav id="main-nav">
    <div class="menu-icon">
        <i class="fa fa-bars fa-2x"></i>
    </div>
    <div class="logo">
        Story_Writer.
    </div>
    <div class="menu">
        <ul>
          <li class="user-item"><a id="my-stories" href="#">My Stories</a></li>
          <li class="user-item"><a id="contributions" href="#">My Contributions</a></li>
          <li class="user-item"><a id="favourites" href="#">My Favourites</a></li>
          <li class="user-item"><span><strong class="user-name-display"></strong></span></li>
        </ul>
    </div>
  </nav>
  `);

  // hide navbar's user-specific items if not logged in
  const $userItems = $navbar.find(".user-item");
  $userItems.hide();

  // show username and user specific items if logged in
  getCurrentUser()
    .then(userInfo => {
      console.log(userInfo.name);
      $navbar.find('.user-name-display').text(`Welcome back, ${userInfo.name}!`);
      $userItems.show();
    });

  $(window).on("scroll", function() {
    if($(window).scrollTop()) {
      $navbar.addClass('black');
    } else {
      $navbar.removeClass('black');
    }
  });

  $navbar.find('.logo').click(() => {
    views_manager.show('home');
    $(window).scrollTop(0);
  });

  $navbar.find('#my-stories').click(() => {
    views_manager.show('myStories');
  });

  $navbar.find('#contributions').click(() => {
    views_manager.show('contributions');
  });

  $navbar.find('#favourites').click(() => {
    views_manager.show('favourites');
  });

  $navbar.prependTo($('body'));
});

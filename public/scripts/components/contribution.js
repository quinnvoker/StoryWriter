$(() => {
  const $navbar = $(`
  <div class="content stories">
    <div class="story-container">


    <div>
  </div>
  `);

  $navbar.find('#home').click(() => {
    views_manager.show('home');
  });

  $navbar.find('#my-stories').click(() => {
    views_manager.show('myStories');
  });

  $navbar.prependTo($('body'));

});

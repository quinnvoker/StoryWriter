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
          <li><a href="#">Home</a></li>
          <li><a id="my-stories" href="#">My Stories</a></li>
          <li><a id="contributions" href="#">Contributions</a></li>
        </ul>
    </div>
  </nav>
  `);

  $navbar.prependTo($('body'));
});

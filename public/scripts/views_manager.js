$(() => {

  const $main = $('#main-content');

  window.views_manager = {
    show(item) {
      $home.detach();
      $my_stories.detach();
      $story.detach();

      switch (item) {
        case 'test_1':
          $test_1.appendTo($main);
          break;
        case 'test_2':
          $test_2.appendTo($main);
          break;
        case 'home':
          $home.appendTo($main);
          break;
        case 'my_stories':
          $my_stories.appendTo($main);
          break;
        case 'story':
          $story.appendTo($main);
          break;
      };
    }
  };
});

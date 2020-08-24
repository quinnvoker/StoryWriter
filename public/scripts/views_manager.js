$(() => {

  const $main = $('#main-content');

  window.views_manager = {
    show(item) {
      $home.detach();
      $myStories.detach();
      $story.detach();
      $stories.detach();

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
        case 'stories':
          $stories.appendTo($main);
          break;
        case 'myStories':
          $myStories.appendTo($main);
          break;
        case 'story':
          $story.appendTo($main);
          break;
      };
    }
  };
});

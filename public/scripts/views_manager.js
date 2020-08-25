$(() => {

  const $main = $('#main-content');

  window.views_manager = {
    show(item) {
      $story.detach();
      $stories.detach();

      switch (item) {
        case 'home':
          $home.appendTo($main);
          break;
        case 'stories':
          loadAllStories();
          $stories.appendTo($main);
          break;
        case 'myStories':
          loadMyStories();
          $stories.appendTo($main);
          break;
        case 'story':
          $story.appendTo($main);
          break;
      };
    }
  };
});

$(() => {

  const $main = $('#main-content');

  window.views_manager = {
    show(item) {
      $story.detach();
      $stories.detach();
      $composeStory.detach();

      switch (item) {
        case 'home':
          $composeStory.appendTo($main);
          loadAllStories();
          $stories.appendTo($main);
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

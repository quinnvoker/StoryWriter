$(() => {

  const $main = $('#main-content');

  window.views_manager = {
    show(item) {
      $story.detach();
      $composeStory.detach();
      $stories.detach();
      $contribution.detach();
      $contributions.detach();

      // reset background color of stories component
      $stories.removeClass('my-stories');

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
          $stories.addClass('my-stories');
          loadMyStories();
          $stories.appendTo($main);
          break;
        case 'story':
          $story.appendTo($main);
          break;
        case 'contribution':
          $contribution.appendTo($main);
          break;
        case 'contributions':
          loadMyContributions();
          $contributions.appendTo($main);
          break;
      };
    }
  };
});

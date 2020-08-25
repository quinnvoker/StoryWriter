$(() => {

  const $main = $('#main-content');

  window.views_manager = {
    show(item) {
      $story.detach();
      $composeStory.detach();
      $composeContribution.detach();
      $stories.detach();
      $contribution.detach();

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
          $composeContribution.appendTo($main);
          break;
        case 'contribution':
          $contribution.appendTo($main);
          break;
      };
    }
  };
});

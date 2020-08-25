$(() => {

  getStory({story_id: 6})
    .then(result => {
      console.log(result);
      $('body').append(createStoryInfo(result));
    });

  views_manager.show('home');

});

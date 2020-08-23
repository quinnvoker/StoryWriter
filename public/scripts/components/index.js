$(() => {

  // make test_1 component show
  views_manager.show('home');

  deleteStory({story_id: 8});

  getAllStories()
    .then(json => {
      console.log(json);
    });

});

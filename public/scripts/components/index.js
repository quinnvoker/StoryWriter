$(() => {

  window.loadAllStories();
  views_manager.show('stories');

  deleteStory({story_id: 8});

  getAllStories()
    .then(json => {
      console.log(json);
    });

});

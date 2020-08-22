$(() => {

  // make test_1 component show
  views_manager.show('test_1');
  getAllStories()
    .then(json => {
      console.log(json);
    });

});

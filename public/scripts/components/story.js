$(() => {
  const $story = $(`
  <div class="content">
     <p>story</p>
  </div>
  `);

  window.$story = $story;
  //need this listener to every page that could lead to a story
  $('#story-1').on('click',function(evt) {
    // evt.preventDefautl();
    alert("clicked");
    // $('header').hide();
    // console.log("from story 1");
   views_manager.show('story');
  });


});



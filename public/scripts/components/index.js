$(() => {

  getContribution({contribution_id: 6})
    .then(result => {
      console.log(result);
      $('body').append(createPendingContr(result));
    });

  views_manager.show('home');

});

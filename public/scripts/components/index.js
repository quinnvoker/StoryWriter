$(() => {

  getContribution({contribution_id: 3})
    .then(result => {
      console.log(result);
      $('body').append(createApprovedContr(result));
    });

  views_manager.show('home');

});

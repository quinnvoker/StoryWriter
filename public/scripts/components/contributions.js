$(() => {
  const createContribution = (contribution) => {
    const $contribution = $(`
    <div  class="card col-lg-4 col-sm-12">
      <div class="card-body">
        <h5 class="card-title"></h5>
        <h6 class="card-subtitle mb-2 text-muted"></h6>
        <p class="card-text"></p>
        <i class="fas fa-thumbs-up"></i><span class="like-counter">${contribution.contribution_vote_count} votes</span>
        <a class="read-more text-right" href="#">Read more <i class="fas fa-chevron-right"></i></a>
      </div>
    </div>
    `);

    $contribution.find('h5').text(`${contribution.story_title}`);
    $contribution.find('h6.text-muted').text(moment(contribution.contribution_created_at_time).format('MM/DD/YYYY'));
    $contribution.find('p.card-text').text(previewString(contribution.contribution_content));

    $contribution.find('i.fa-thumbs-up').on('click', () => {
      const data = { contribution_id: contribution.contribution_id };
      addVote(data)
        .then(resolve => getVote(data))
        .then(resolve => $contribution.find('.like-counter').text(`${resolve.vote_count} votes`));
    });

    $contribution.find('.read-more').on('click',function() {
      generateContrView(contribution.contribution_id);
      views_manager.show('contribution');
    });

    return $contribution;
  };

  const $contributions = $(`<div class="content stories my-stories"><div class="story-container"><h2 class="tagline contributions-heading"></h2><div class="row my-contributions"></div><div></div>`);
  window.$contributions = $contributions;

  const loadMyContributions = () => {
    $contributions.find('.my-contributions').empty();
    $contributions.find('h2').text('Your contributions');
    getMyContributions().then(result => {
      console.log(result);
      for (const contribution of result) {
        $contributions.find('.my-contributions').append(createContribution(contribution));
      }
    });
  };

  window.loadMyContributions = loadMyContributions;

});

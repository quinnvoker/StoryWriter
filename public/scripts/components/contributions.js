$(() => {
  const createContribution = (contribution) => {
    const $contribution = $(`
    <div  class="card col-lg-4 col-sm-12">
      <div class="card-body">
        <h5 class="card-title"></h5>
        <h6 class="card-subtitle mb-2 text-muted"></h6>
        <p class="card-text"></p>
        <i class="fas fa-thumbs-up"></i><span class="like-counter">${contribution.contribution_vote_count}</span>
        <a id="${contribution.contribution_id}" href="#" class="read-more text-right">Read more <i class="fas fa-chevron-right"></i></a>
      </div>
    </div>
    `);

    $contribution.find('h5').text(contribution.contribution_id);
    $contribution.find('p.card-text').text(contribution.contribution_content);
    $contribution.find('h6.text-muted').text(moment(contribution.contribution_created_at_time).format('MM/DD/YYYY'));

    return $contribution;
  };

  const $contributions = $(`<div class="content stories my-stories"><div class="story-container"><div class="row my-contributions"></div><div></div>`);
  window.$contributions = $contributions;

  const loadMyContributions = () => {
    $contributions.find('.my-contributions').empty();
    getMyContributions().then(result => {
      for (const contribution of result.contributions) {
        $contributions.find('.my-contributions').append(createContribution(contribution));
      }
    });
  };

  window.loadMyContributions = loadMyContributions;

});

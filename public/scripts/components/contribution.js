$(() => {

  const createContr = (contrObj) => {
    const $contrById = $(`
      <div class="card odd">
        <div class="card-body">
          <p class="user"></p>
          <p class="contribution-content"></p>
          <i class="fas fa-thumbs-up"></i><span class="like-counter"></span>
          <p class="create-at"></p>
        </div>
      </div>
    `);
    $contrById.find('.user').text(contrObj.contribution_author_name);
    $contrById.find('.contribution-content ').text(contrObj.contribution_content);
    $contrById.find('.like-counter').text(contrObj.contribution_vote_count);
    $contrById.find('.create-at').text(moment(contrObj.contribution_created_at).format('MM/DD/YYYY'));
    return $contrById;
  };

  window.createContr = createContr;

  const $contribution = $(`
  <div class="content stories my-stories">
    <div class="story-container">


    <div>
  </div>
  `);

  window.$contribution = $contribution;

  const generateContrView = (contrId) => {
    getContribution({ contribution_id: contrId })
      .then(result => {
        const $contrContent = $contribution.find('.story-container');
        $contrContent.empty();
        $contrContent.append(createContr(result));
      });
  };
  window.generateContrView = generateContrView;
});

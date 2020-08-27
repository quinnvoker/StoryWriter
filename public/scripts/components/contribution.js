$(() => {


  const createContr = (contrObj) => {
    const $contrById = $(`
      <div class="row">
        <div class="col-md-6 col-sm-12">
          <h4 class="title-tagline"></h4>
        </div>
        <div class="col-md-6 col-sm-12 text-right">
          <p>
            <span class="status"></span>
          </p>
        </div>
      </div>

      <div class="card odd">
        <div class="card-body">
          <p class="user"></p>
          <p class="contribution-content"></p>
          <i class="fas fa-thumbs-up vote-contribution"></i>
          <button class="approve-contribution">Approve</button>
          <span class="like-counter"></span>
          <p class="create-at"></p>
        </div>
      </div>
    `);

    const $voteButton = $contrById.find('.vote-contribution');
    const $approveButton = $contrById.find('.approve-contribution');

    $voteButton.hide();
    $approveButton.hide();

    if (contrObj.is_story_owner) {
      if (!contrObj.contribution_accepted_at) {
        $approveButton.show();
      }
    } else {
      $voteButton.show();
    }

    $contrById.find('.title-tagline').text(contrObj.story_title);
    const storyProgress = (contrObj.story_completed) ? `Completed` : `In progress`;
    $contrById.find('.status').text(storyProgress);
    $contrById.find('.user').text(contrObj.contribution_author_name);
    $contrById.find('.contribution-content ').text(contrObj.contribution_content);
    $contrById.find('.like-counter').text(`${contrObj.contribution_vote_count} votes`);
    $contrById.find('.create-at').text(moment(contrObj.contribution_created_at).format('MM/DD/YYYY'));

    $contrById.find('i.fa-thumbs-up').on('click', () => {
      const data = { contribution_id: contrObj.contribution_id };
      addVote(data)
        .then(resolve => {
          return getVote(data);
        })
        .then(resolve => {
          $contrById.find('.like-counter').text(`${resolve.vote_count} votes`);
        });
    });

    return $contrById;
  };

  window.createContr = createContr;

  const $contribution = $(`
  <div class="content stories my-stories">
    <div class="story-info"></div>
    <div class="story-container"><div>
  </div>
  `);
  window.$contribution = $contribution;

  const $button = $(`<button type="button" class="orange back-to-story" > <i class="fas fa-chevron-left"></i> Go back to the story </button>`);


  const generateContrView = (contrId) => {
    getContribution({ contribution_id: contrId })
      .then(result => {
        console.log(result);
        result.contribution_id = contrId;
        const $contrContent = $contribution.find('.story-container');
        $contrContent.empty();
        $contrContent.append(createContr(result));
        $contrContent.append($button);
        $button.on('click', () => {
          setTargetStory(result.story_id);
          views_manager.show('story');
        });

        // $contribution.find('h2').text(result)
      });
  };
  window.generateContrView = generateContrView;
});

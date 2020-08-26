$(() => {
  const createApprovedContr = (contrObj) => {
    const $approvedContr = $(`
      <div class="card odd">
        <div class="card-body">
          <p class="user"></p>
          <p class="contribution-content"></p>
        </div>
      </div>
    `);
    $approvedContr.find('.user').text(contrObj.contribution_author_name);
    $approvedContr.find('.contribution-content ').text(contrObj.contribution_content);
    return $approvedContr;
  };


  window.createApprovedContr = createApprovedContr;

  const createPendingContr = (contrObj) => {
    const $pendingContr = $(`
        <div  class="card col-lg-4 col-sm-12">
        <div class="card-body">
          <h5 class="card-title"></h5>
          <p class="card-text"></p>
          <i class="fas fa-thumbs-up vote-contribution"></i>
          <button class="approve-contribution">Approve</button>
          <span class="like-counter"></span>
          <a class="read-more text-right" href="#">Read more <i class="fas fa-chevron-right"></i></a>
        </div>
      </div>
    `);

    const $voteButton = $pendingContr.find('.vote-contribution');
    const $approveButton = $pendingContr.find('.approve-contribution');

    if (contrObj.is_story_owner) {
      $voteButton.hide();
      $approveButton.show();
    } else {
      $voteButton.show();
      $approveButton.hide();
    }

    $pendingContr.find('.card-title').text(contrObj.contribution_author_name);
    $pendingContr.find('.card-text').text(contrObj.contribution_content);
    $pendingContr.find('.like-counter').text(`${contrObj.contribution_vote_count} votes`);
    $pendingContr.find('.read-more').on('click',function() {
      generateContrView(contrObj.contribution_id);
      views_manager.show('contribution');
    });
    $voteButton.on('click', () => {
      const data = { contribution_id: contrObj.contribution_id };
      addVote(data)
        .then(resolve => getVote(data))
        .then(resolve => $pendingContr.find('.like-counter').text(`${resolve.vote_count} votes`));
    });


    return $pendingContr;
  };

  window.createPendingContr = createPendingContr;

  const createStoryInfo = (contrArray) => {
    const $storyInfo = $(`
    <div class="row">
      <div class="col-md-6 col-sm-12">
        <h4 class="title-tagline"></h4>
      </div>
      <div class="col-md-6 col-sm-12 text-right">
        <p><i class="fas fa-heart"></i> <span class="status"></span></p>
      </div>
    </div>
    `);
    let contrObj = contrArray[0];
    $storyInfo.find('.title-tagline').text(contrObj.story_title);
    $storyInfo.find('span.status').text(`${contrObj.completed ? 'Completed' : 'In Progress'}`);

    return $storyInfo;
  };

  window.createStoryInfo = createStoryInfo;

  const $story = $(`
  <div class="content stories my-stories">
    <div class="story-container">

      <div class="story-info"></div>
      <div class="approved-contributions"></div>

      <section class="contribution-form">
          <div class="jumbotron jumbotron-fluid">
            <div class="container">
              <h2 class="display-4 tagline"><span class="highlight">Continue</span> the adventure</h2>
              <p class="lead">A little blurb goes here.</p>
              <button type="button" class="orange" data-toggle="modal" data-target="#exampleModal">Submit a contribution <i class="fas fa-chevron-right"></i></button>
            </div>
          </div>
      </section>

      <div class="unapproved-contributions"><div class="row"></div></div>

    <div>
  </div>
  `);

  window.$story = $story;

  const generateStoryView = (storyId) => {
    const $storyInfo = $story.find('.story-info');
    const $approved = $story.find('.approved-contributions');
    const $pending = $story.find('.unapproved-contributions .row');
    const $contributionForm = $story.find('.contribution-form');

    // remove old element from last view
    $storyInfo.empty();
    $approved.empty();
    $pending.empty();

    // toggle pending contribution list and contribution form visibility if story is complete
    getStoryData({ story_id: storyId })
      .then(storyData => {
        if (storyData.completed) {
          $pending.hide();
          $contributionForm.hide();
        } else {
          $pending.show();
          $contributionForm.show();
        }
      });

    // create element for current view
    $.get(`/api/stories/${storyId}`)
      .then(apprContrs => {
        $storyInfo.append(createStoryInfo(apprContrs));
        for (const contribution of apprContrs) {
          $approved.append(createApprovedContr(contribution));
        }
      });
    $.get(`/api/contributions/story/${storyId}`)
      .then(pendContrs => {
        for (const contribution of pendContrs) {
          $pending.append(createPendingContr(contribution));
        }
      });

    return $story;
  };

  window.generateStoryView = generateStoryView;


});

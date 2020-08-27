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
    $approvedContr.find('.user').text(`${contrObj.contribution_author_name} wrote:`);
    $approvedContr.find('.contribution-content ').text(contrObj.contribution_content);
    return $approvedContr;
  };


  window.createApprovedContr = createApprovedContr;

  const createPendingContr = (contrObj) => {
    const $pendingContr = $(`
        <div  class="card col-lg-4 col-sm-12">
        <div class="card-body">
          <h5 class="card-title user"></h5>
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

    $pendingContr.find('.card-title').text(`${contrObj.contribution_author_name} added:`);
    $pendingContr.find('.like-counter').text(`${contrObj.contribution_vote_count} votes`);
    $pendingContr.find('.card-text').text(previewString(contrObj.contribution_content));

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

    $approveButton.on('click', () => {
      const data = { contribution_id: contrObj.contribution_id };
      updateContrAccepted(data)
        .then(resolve => views_manager.show('story'));
    });


    return $pendingContr;
  };

  window.createPendingContr = createPendingContr;

  const createStoryInfo = (story) => {
    const $storyInfo = $(`
    <div class="row">
      <div class="col-md-6 col-sm-12">
        <h4 class="title-tagline"></h4>
      </div>
      <div class="col-md-6 col-sm-12 text-right">
        <p>
          <i class="favourite-button fas fa-heart"></i>
          <span class="status"></span>
          <button class="orange complete-button">Mark Completed</button>
        </p>
      </div>
    </div>
    `);
    $storyInfo.find('.title-tagline').text(story.title);
    $storyInfo.find('span.status').text(`${story.completed ? 'Completed' : 'In Progress'}`);


    $storyInfo.find('.complete-button').hide();
    $storyInfo.find('.favourite-button').hide();

    $storyInfo.find('.favourite-button').on('click',()=>{
      addFavourites({story_id: story.id})
        .then(() =>{
          $storyInfo.find('.favourite-button').addClass('orange');
        })
    });


    $storyInfo.find('.complete-button').click(() => {
      updateStoryCompleted({story_id: story.id})
        .then(() => {
          views_manager.show('story');
        });
    });

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
              <button type="button" class="orange" data-toggle="modal" data-target="#exampleModal">Submit a contribution <i class="fas fa-chevron-right"></i></button>
            </div>
            <div class="overlay"></div>
          </div>
      </section>
      <div class="unapproved-contributions contribution-box"></div>
    <div>
  </div>
  `);

  window.$story = $story;

  const generateStoryView = (storyId) => {
    const $storyInfo = $story.find('.story-info');
    const $approved = $story.find('.approved-contributions');
    const $pending = $story.find('.unapproved-contributions');
    const $contributionForm = $story.find('.contribution-form');

    // remove old element from last view
    $storyInfo.empty();
    $approved.empty();
    $pending.empty();

    // hide pending and contribution form to prevent flicker on load
    $pending.hide();
    $contributionForm.hide();

    getStoryData({ story_id: storyId })
      .then(storyData => {
        $storyInfo.append(createStoryInfo(storyData));

        const $completeButton = $storyInfo.find('.complete-button');
        const $favouriteButton = $storyInfo.find('.favourite-button');

        if (storyData.is_owner) {
          if (!storyData.completed) {
            $completeButton.show();
          }
        } else {
          $favouriteButton.show();
        }

        if (!storyData.completed) {
          $pending.show();
          $contributionForm.show();
          $story.find('.jumbotron').css('background-image', 'url(' + storyData.cover_image_url + ')');
        }
      });

    // add accepted contributions
    $.get(`/api/stories/${storyId}`)
      .then(apprContrs => {
        for (const contribution of apprContrs) {
          $approved.append(createApprovedContr(contribution));
        }

        // toggle pending contribution list and contribution form visibility if story is complete
        const $completeButton = $storyInfo.find('.complete-button');
        const $favouriteButton = $storyInfo.find('.favourite-button');

        getStoryData({ story_id: storyId })
          .then(storyData => {
            if (storyData.is_owner) {
              if (!storyData.completed) {
                $completeButton.show();
              } else {
                $completeButton.hide();
              }
              $favouriteButton.hide();
            } else {
              $favouriteButton.show();
              $completeButton.hide();
            }

            if (storyData.completed) {
              $pending.hide();
              $contributionForm.hide();
            } else {
              $pending.show();
              $contributionForm.show();
              $story.find('.jumbotron').css('background-image', 'url(' + storyData.cover_image_url + ')');
              $story.find('.jumbotron').css('background-repeat', 'no-repeat');
              $story.find('.jumbotron').css('background-size', 'cover');
            }
          });
      });

    //
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

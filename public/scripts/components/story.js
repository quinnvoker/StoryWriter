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
          <span class="like-counter">${contrObj.contribution_vote_count} votes</span>
          <a class="read-more" href="#" class="read-more text-right">Read more <i class="fas fa-chevron-right"></i></a>
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
    $pendingContr.find('.like-counter').text(contrObj.contribution_vote_count);
    $pendingContr.find('.contribution-link').on('click',function() {
      generateContrView(contrObj.contribution_id);
      views_manager.show('contribution');
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

    $storyInfo.find('i.fa-heart').on('click',()=>{
      $storyInfo.find('i.fa-heart').addClass('voted');
    })

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

    // remove old element from last view
    $storyInfo.empty();
    $approved.empty();
    $pending.empty();

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

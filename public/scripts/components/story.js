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
          <i class="fas fa-thumbs-up"></i><span class="like-counter">${contrObj.contribution_vote_count} votes</span>
          <a id="${contrObj.contribution_id}" href="#" class="read-more text-right">Read more <i class="fas fa-chevron-right"></i></a>
        </div>
      </div>
    `);
    $pendingContr.find('.card-title').text(contrObj.contribution_author_name);
    $pendingContr.find('.card-text').text(contrObj.contribution_content);
    $pendingContr.find('.like-counter').text(contrObj.contribution_vote_count);
    $pendingContr.find('#contribution-1').on('click',function() {
      $('header').hide();
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
        <h2 class="title-tagline"></h2>
      </div>
      <div class="col-md-6 col-sm-12 text-right">
        <p class="status"></p>
      </div>
    </div>
    `);
    let contrObj = contrArray[0];
    $storyInfo.find('.title-tagline').text(contrObj.story_title);
    $storyInfo.find('.status').text(`${contrObj.completed ? 'Completed' : 'In Progress'}`);

    return $storyInfo;
  };

  window.createStoryInfo = createStoryInfo;

  const $story = $(`
  <div class="content stories my-stories">
    <div class="story-container">

      <div class="story-info"></div>

      <div class="approved-contributions"></div>

      <section class="contribution-form">
        <button type="button" class="orange" data-toggle="modal" data-target="#exampleModal">Continue the adventure</button>
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

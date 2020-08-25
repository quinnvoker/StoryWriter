$(() => {
  const createApprovedContr = (contrObj) => {
    const $approvedContr = $(`
    <section class="approved-contributions">
      <div class="card odd">
        <div class="card-body">
          <p class="author"></p>
          <p class="content"></p>
        </div>
      </div>
    </section>
    `);
    $approvedContr.find('.author').html(contrObj.contribution_author_name);
    $approvedContr.find('.content').html(contrObj.contribution_content);
    return $approvedContr;
  };

  window.createApprovedContr = createApprovedContr;

  const createPendingContr = (contrObj) => {
    const $pendingContr = $(`
      <section class="pending-contributions">
        <div  class="card" style="width: 18rem;">
          <div class="card-body" id="contribution-1">
            <h5 class="card-title author"></h5>
            <p class="card-text content"></p>
            <i class="fas fa-thumbs-up"></i><span class="like-counter"></span>
            <a id="contribution-1" href="#" class="read-more text-right">Read more <i class="fas fa-chevron-right"></i></a>
          </div>
        </div>
      </section>
    `);
    $pendingContr.find('.author').html(contrObj.contribution_author_name);
    $pendingContr.find('.content').html(contrObj.contribution_content);
    $pendingContr.find('.like-counter').html(contrObj.contribution_vote_count);
    return $pendingContr;
  };

  window.createPendingContr = createPendingContr;

  const createStoryInfo = (storyObj) => {
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
    $storyInfo.find('.title-tagline').text(storyObj.story_title);
    $storyInfo.find('.status').text(`${storyObj.completed ? 'Completed' : 'In Progress'}`);
  };

  window.createStoryInfo = createStoryInfo;

  const $story = $(`
  <div class="content stories">
    <div class="story-container">
      <div class="story-info></div>
      <div class="approved-container"></div>
      <section class="contribution-form">
        <button type="button" class="orange" data-toggle="modal" data-target="#exampleModal">Continue the adventure</button>
      </section>
      <div class="pending-container"></div>
    <div>
  </div>
  `);
  window.$story = $story;
  window.story = {};

  function addContributionEntry(contribution) {
    $story.append(contribution);
  }
  function clearStory() {
    $story.empty();
  }

  window.story.clearStory = clearStory;

  // function addContributions(contributions) {
  //   clearStory();
  //   for (const contributionId in contributions) {
  //     const contribution = contribution[contributionId];
  //     const contributionEntry = story.createContributionEntry(contribution);
  //     addContributionEntry(contributionEntry);
  //   }
  // }
  // // window.story.addContributions = addContributions;

  // function createContributionEntry(contribution) {
  //   return `
  //   <article class="property-listing">
  //       <section class="property-listing__preview-image">
  //         <img src="${property.thumbnail_photo_url}" alt="house">
  //       </section>
  //       <section class="property-listing__details">
  //         <h3 class="property-listing__title">${property.title}</h3>
  //         <ul class="property-listing__details">
  //           <li>number_of_bedrooms: ${property.number_of_bedrooms}</li>
  //           <li>number_of_bathrooms: ${property.number_of_bathrooms}</li>
  //           <li>parking_spaces: ${property.parking_spaces}</li>
  //         </ul>
  //         ${isReservation ?
  //           `<p>${moment(property.start_date).format('ll')} - ${moment(property.end_date).format('ll')}</p>`
  //           : ``}
  //         <footer class="property-listing__footer">
  //           <div class="property-listing__rating">${Math.round(property.average_rating * 100) / 100}/5 stars</div>
  //           <div class="property-listing__price">$${property.cost_per_night/100.0}/night</div>
  //         </footer>
  //       </section>
  //     </article>`
  // }

  window.$story.find('#contribution-1').on('click',function() {
    $('header').hide();
    views_manager.show('contribution');
  });
});

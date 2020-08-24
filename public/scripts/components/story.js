$(() => {

  const $story = $(`
  <div class="content stories">
    <div class="story-container">
      <h2 class="title-tagline"> Story Title </h2>
      <div class="progress">
        <div class="progress-bar" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
      <section class="approved-contributions">
      <div class="card odd">
      <div class="card-body">
        <p class="user"> User 1 wrote:</p>
        <p>text</p>
      </div>
    </div>
    <div class="card even">
      <div class="card-body">
        This is some text within a card body.
      </div>
    </div>
      </section>
      <section class="contribution-form compose-story">
      <h2>Add to the story</h2>
       <form id="new-story" method="POST" action="/tweets/">
         <textarea name="text" id="tweet-text" placeholder="Start your story..."></textarea>
         <input name="cover-image" placeholder="Cover image URL">
         <div>
           <button id="submit-story" type="submit">Post Story</button>
         </div>
       </form>
      </section>
      <section class="unapproved-contributions">
      <div class="row">
  <div class="col-sm-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
  <div class="col-sm-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
  <div class="col-sm-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
</div>
      </section>
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

  function addContributions(contributions) {
    clearStory();
    for (const contributionId in contributions) {
      const contribution = contribution[contributionId];
      const contributionEntry = story.createContributionEntry(contribution);
      addContributionEntry(contributionEntry);
    }
  }
  // window.story.addContributions = addContributions;

  function createContributionEntry(contribution) {
    return `
    <article class="property-listing">
        <section class="property-listing__preview-image">
          <img src="${property.thumbnail_photo_url}" alt="house">
        </section>
        <section class="property-listing__details">
          <h3 class="property-listing__title">${property.title}</h3>
          <ul class="property-listing__details">
            <li>number_of_bedrooms: ${property.number_of_bedrooms}</li>
            <li>number_of_bathrooms: ${property.number_of_bathrooms}</li>
            <li>parking_spaces: ${property.parking_spaces}</li>
          </ul>
          ${isReservation ?
            `<p>${moment(property.start_date).format('ll')} - ${moment(property.end_date).format('ll')}</p>`
            : ``}
          <footer class="property-listing__footer">
            <div class="property-listing__rating">${Math.round(property.average_rating * 100) / 100}/5 stars</div>
            <div class="property-listing__price">$${property.cost_per_night/100.0}/night</div>
          </footer>
        </section>
      </article>`
  }

  window.$myStories.find('#story-1').on('click',function() {
    $('header').hide();
    views_manager.show('story');
  });
});



$(() => {

  const $composeStory = $(`
    <section class="compose-story">
      <h2 class="tagline"><span class="highlight">Create.</span> Collaborate.</h2>
      <form id="new-story">
        <input id="new-story-title" name="title" placeholder="Story Title">
        <textarea name="text" id="contribution-content" placeholder="Start your story..."></textarea>
        <input id="new-story-cover" name="cover-image" placeholder="Cover image URL">
        <div>
          <div class="error-panel">
            <i class="fas fa-exclamation-triangle"></i>
            <span class="error"></span>
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <button id="submit-story">Post Story</button>
        </div>
      </form>
    </section>
  `);

  $composeStory.find('.error-panel').hide();

  window.$composeStory = $composeStory;

  $composeStory.find('#submit-story').click((event) => {
    event.preventDefault();

    const $errorPanel = $composeStory.find('.error-panel');

    const title = $composeStory.find('#new-story-title').val();
    const content = $composeStory.find('#contribution-content').val();
    const cover_image_url = $composeStory.find('#new-story-cover').val();

    if (title.length < 1 || content.length < 1) {
      $errorPanel.find('.error').text('Cannot submit story without title or content!');
      $errorPanel.slideDown();
      return;
    } else if ($errorPanel.is(':visible')) {
      $errorPanel.slideUp();
    }

    const storyData = {title, cover_image_url};
    addStory(storyData)
      .then(result => {
        const contributionData = { content, story_id: result.story_id, accepted: true };

        addContribution(contributionData)
          .then(result => {
            $composeStory.find('#new-story')[0].reset();
            console.log(result);
          });
      });
  });
});

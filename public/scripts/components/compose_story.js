$(() => {

  const $composeStory = $(`
    <section class="compose-story">
       <div class="error-panel">
         <p class="error"></p>
       </div>
       <h2 class="tagline"><span class="highlight">Create.</span> Collaborate.</h2>
       <form id="new-story">
        <input id="new-story-title" name="title" placeholder="Story Title">
         <textarea name="text" id="contribution-content" placeholder="Start your story..."></textarea>
         <input id="new-story-cover" name="cover-image" placeholder="Cover image URL">
         <div>
           <button id="submit-story">Post Story</button>
         </div>
       </form>
     </section>
  `);

  window.$composeStory = $composeStory;

  $composeStory.find('#submit-story').click((event) => {
    event.preventDefault();

    const title = $composeStory.find('#new-story-title').val();
    const cover_image_url = $composeStory.find('#new-story-cover').val();

    const storyData = {title, cover_image_url};
    addStory(storyData)
      .then(result => {
        const content = $composeStory.find('#contribution-content').val();
        const contributionData = { content, story_id: result.story_id, accepted: true };

        addContribution(contributionData)
          .then(result => {
            console.log(result);
          });
      });
  });
});

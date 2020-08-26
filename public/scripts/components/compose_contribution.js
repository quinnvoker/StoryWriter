$(() => {
  const $composeContribution = $(`
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form id="new-story">
            <textarea name="text" id="contribution-content" placeholder="Continue the adventure..."></textarea>
            <div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <div class="error-panel">
            <i class="fas fa-exclamation-triangle"></i>
            <span class="error"></span>
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <button type="button" class="secondary" data-dismiss="modal">Close</button>
          <button id="submit-contribution" type="button" class="orange">Submit</button>
        </div>
      </div>
    </div>
  </div>
  `);

  window.targetStoryId = -1;

  const setTargetStory = (storyId) => {
    window.targetStoryId = storyId;
  };
  window.setTargetStory = setTargetStory;

  $composeContribution.find('#submit-contribution')
    .click((event) => {
      event.preventDefault();
      const content = $composeContribution.find('#contribution-content').val();

      const contributionData = { content, story_id: window.targetStoryId };
      addContribution(contributionData)
        .then(result => {
          $composeContribution.modal('hide');
          console.log(result);
        });
    });

  window.$composeContribution = $composeContribution;
});

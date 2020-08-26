$(() => {
  const $composeContribution = $(`
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close exit" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="error-panel">
            <i class="fas fa-exclamation-triangle"></i>
            <span class="error"></span>
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <form id="new-story">
            <textarea name="text" id="contribution-content" placeholder="Continue the adventure..."></textarea>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="secondary exit" data-dismiss="modal">Close</button>
          <button id="submit-contribution" type="button" class="orange">Submit</button>
        </div>
      </div>
    </div>
  </div>
  `);

  const $errorPanel = $composeContribution.find('.error-panel');
  $errorPanel.hide();

  $composeContribution.find('#submit-contribution')
    .click((event) => {
      event.preventDefault();
      const content = $composeContribution.find('#contribution-content').val();

      if (content.length < 1) {
        $errorPanel.find('.error').text('Cannot submit contribution with no content!');
        $errorPanel.slideDown();
        return;
      } else if ($errorPanel.is(':visible')) {
        $errorPanel.slideUp();
      }

      const contributionData = { content, story_id: window.targetStoryId };
      addContribution(contributionData)
        .then(result => {
          $composeContribution.modal('hide');
          $composeContribution.find('#new-story')[0].reset();
          views_manager.show('story');
        });
    });

  $composeContribution.find('.exit')
    .click(() => {
      if ($errorPanel.is(':visible')) {
        $errorPanel.slideUp();
      }
    });

  window.$composeContribution = $composeContribution;
});

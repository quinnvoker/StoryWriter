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
          <form id="new-story" method="POST" action="/tweets/">
            <textarea name="text" id="tweet-text" placeholder="Continue the adventure..."></textarea>
            <div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="secondary" data-dismiss="modal">Close</button>
          <button id="submit-contribution" type="button" class="orange">Submit</button>
        </div>
      </div>
    </div>
  </div>
  `);

  window.$composeContribution = $composeContribution;
});

$(() => {

  const $composeStory = $(`
    <section class="compose-story">
       <div class="error-panel">
         <p class="error"></p>
       </div>
       <h2 class="tagline"><span class="highlight">Create.</span> Collaborate.</h2>
       <form id="new-story" method="POST" action="/tweets/">
        <input name="title" placeholder="Story Title">
         <textarea name="text" id="tweet-text" placeholder="Start your story..."></textarea>
         <input name="cover-image" placeholder="Cover image URL">
         <div>
           <button id="submit-story" type="submit">Post Story</button>
         </div>
       </form>
     </section>
  `);

  window.$composeStory = $composeStory;

});

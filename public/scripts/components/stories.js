$(() => {

  window.targetStoryId = -1;

  const setTargetStory = (storyId) => {
    window.targetStoryId = storyId;
  };
  window.setTargetStory = setTargetStory;

  const createStoryPreview = (story) => {
    const $story = $(`
    <figure id="story-${story.story_id}" class="effect-sadie story-preview">
      <img class="cover-image" alt="img01"/>
      <figcaption>
        <h4 class="story-preview-title"></h4>
        <a href="#">View more</a>
      </figcaption>
    </figure>
    `);

    $story.find('img').attr('src', story.story_cover_url);
    $story.find('h4').text(story.story_title);

    $story.on('click',() =>{
      setTargetStory(story.story_id);
      views_manager.show('story');
    });

    return $story;
  };

  const $stories = $(`<div class="content stories"><div class="story-container"><h2 class="tagline"></h2><div class="grid"></div></div></div>`);
  window.$stories = $stories;

  const loadAllStories = () => {
    $stories.find('.grid').empty();
    $stories.find('h2').text("Browse the Library");
    $stories.find('h2').addClass("all-stories-heading");
    $stories.find('h2').removeClass("my-stories-heading");
    getAllStories().then(stories => {
      for (const story of stories) {
        $stories.find('.grid').append(createStoryPreview(story));
      }
    });
  };
  window.loadAllStories = loadAllStories;

  const loadMyStories = () => {
    $stories.find('h2').text("Your stories");
    $stories.find('h2').addClass("my-stories-heading");
    $stories.find('h2').removeClass("all-stories-heading");
    $stories.find('.grid').empty();
    getMyStories().then(stories => {
      for (const story of stories) {
        $stories.find('.grid').append(createStoryPreview(story));
      }
    });
  };
  window.loadMyStories = loadMyStories;

});

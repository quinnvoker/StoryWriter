$(() => {
  const createStoryPreview = (story) => {
    const $story = $(`
    <figure id="story-${story.id}" class="effect-sadie">
      <img alt="img01"/>
      <figcaption>
        <h2></h2>
        <a href="#">View more</a>
      </figcaption>
    </figure>
    `);

    $story.find('img').attr('src', story.cover_image_url);
    $story.find('h2').text(story.title);

    return $story;
  };

  const $stories = $(`<div class="content stories grid"></div>`);
  window.$stories = $stories;

  const loadAllStories = () => {
    $stories.empty();
    getAllStories().then(result => {
      for (const story of result.stories) {
        $stories.append(createStoryPreview(story));
      }
    });
  };
  window.loadAllStories = loadAllStories;

  const loadMyStories = () => {
    $stories.empty();
    getMyStories().then(result => {
      for (const story of result.stories) {
        $stories.append(createStoryPreview(story));
      }
    });
  };
  window.loadMyStories = loadMyStories;

});

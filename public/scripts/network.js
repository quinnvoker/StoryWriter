const getAllStories = () => {
  return $.ajax('/stories');
};

const getMyStories = () => {
  return $.ajax('/stories/mystories');
};

const getStory = (data) => {
  const story_id = data.story_id;
  return $.ajax(`/stories`, { data });
};

const addStory = (data) => {
  return $.ajax('/stories', { data, method: 'POST'});
};

const deleteStory = (data) => {
  const story_id = data.story_id;
  return $.ajax(`/stories/${story_id}`, { data, method: 'Post'});
};

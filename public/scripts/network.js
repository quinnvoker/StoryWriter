const getAllStories = () => {
  return $.ajax('/api/stories');
};

const getMyStories = () => {
  return $.ajax('/api/stories/mystories');
};

const getStory = (data) => {
  const story_id = data.story_id;
  return $.ajax(`/api/stories`, { data });
};

const addStory = (data) => {
  return $.ajax('/api/stories', { data, method: 'POST'});
};

const deleteStory = (data) => {
  const story_id = data.story_id;
  return $.ajax(`/api/stories/${story_id}`, { data, method: 'POST'});
};

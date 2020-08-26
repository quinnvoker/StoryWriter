const getAllStories = () => {
  return $.ajax('/api/stories');
};

const getMyStories = () => {
  return $.ajax('/api/stories/mystories');
};

const getStory = (data) => {
  const story_id = data.story_id;
  return $.ajax(`/api/stories/${story_id}`);
};

const getStoryData = (data) => {
  const story_id = data.story_id;
  return $.ajax(`/api/stories/data/${story_id}`);
};

const addStory = (data) => {
  return $.ajax('/api/stories', { data, method: 'POST' });
};

const deleteStory = (data) => {
  const story_id = data.story_id;
  return $.ajax(`/api/stories/${story_id}`, { data, method: 'POST' });
};

const getMyContributions = () => {
  return $.ajax('/api/contributions');
};

const getContribution = (data) => {
  const contribution_id = data.contribution_id;
  return $.ajax(`/api/contributions/${contribution_id}`);
};


const addContribution = (data) => {
  return $.ajax('/api/contributions', { data, method: 'POST' });
};

const addVote = (data) => {
  const contr = data.contribution_id;
  return $.ajax(`/api/votes/${contr}`, { data, method: 'POST'  });
};

const getVote = (data) => {
  const contr = data.contribution_id;
  return $.ajax(`/api/votes/${contr}`, { data, method: 'GET'  });
};

const getMyFavourites = () => {
  return $.ajax('/api/favourites');
};

const addFavourites = (data) => {
  const story_id = data.story_id;
  return $.ajax(`/api/favourites/${story_id}`, { data, method: 'POST' });
};

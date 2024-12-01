const BASE_URL = "https://api.github.com/users/";

export const getGitHubProfile = async (username) => {
  const response = await fetch(`${BASE_URL}${username}`);
  if(!response.ok){
    console.log('Enter Valid Username');
  }

  const data = await response.json();
  return data;
};

export const getUserRepositories = async (username) => {
  const response = await fetch(`${BASE_URL}${username}/repos`);
  // if(!response.ok){
  //   console.log('Enter Valid Username');
  // }

  const data = await response.json();
  return data;
};

// Soon to be implemented
export const getUserOrganizations = async (username) => {
  const response = await fetch(`${BASE_URL}${username}/orgs`);
  const data = await response.json();
  return data;
};

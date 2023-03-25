// api.js

import axios from 'axios';

const API_KEY = '3'; // Replace with your TheSportsDB API key
const API_BASE_URL = 'https://www.thesportsdb.com/api/v1/json';

// Fetch the games for a specific season, week, and league
export const fetchNFLGames = async (season, week) => {
  try {
    // id=4328 r=38 s=2014-2015
    const leagueId = '4391' //NFL league ID
    const response = await axios.get(`${API_BASE_URL}/${API_KEY}/eventsround.php?id=${leagueId}&r=${week}&s=${season}`);

    return response.data;
  } catch (error) {
    console.error('Error fetching games:', error);
    return null;
  }
};

// Fetch the games for a specific season, week, and league
export const fetchMLSGames = async (season, week) => {
  try {
    const leagueId = '4328'; // MLS league ID
    const response = await axios.get(`${API_BASE_URL}/${API_KEY}/eventsround.php?id=${leagueId}&r=${week}&s=${season}`);

    return response.data;
  } catch (error) {
    console.error('Error fetching MLS games:', error);
    return null;
  }
};

// Save the user's selections to the database
export const saveSelections = async (selections) => {
  try {
    const response = await axios.post('OUR_API_ENDPOINT', { selections }); // Update to our endpoint once available
    return response.data;
  } catch (error) {
    console.error('Error saving selections:', error);
    return null;
  }
};

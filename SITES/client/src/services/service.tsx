import axios from "axios";

const SITES_BASE_URL = "http://localhost:3000/sites";

export const getSites = async (
  page = 1,
  perPage = 5,
  sort = "_id",
  reverse = "no"
) => {
  try {
    const response = await axios.get(`${SITES_BASE_URL}?perPage=${perPage}&page=${page}&sort=${sort}&reverse=${reverse}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching sites", error);
    throw error;
  }
};

export const getSiteById = async (_id: any) => {
  try {
    const response = await axios.get(`${SITES_BASE_URL}/${_id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching site", error);
    throw error;
  }
};

export const addSite = async (site: {
  name: string;
  url: string;
  image: string;
  score: number;
}) => {
  try {
    const response = await axios.post(SITES_BASE_URL, site);
    return response.data;
  } catch (error) {
    console.error("Error adding site", error);
    throw error;
  }
};

export const updateSite = async (
  _id: any,
  site: { name: string; url: string; image: string; score: number }
) => {
  try {
    const response = await axios.put(`${SITES_BASE_URL}/${_id}`, site);
    return response.data;
  } catch (error) {
    console.error(`Error updating site with id ${_id}`, error);
    throw error;
  }
};

export const deleteSite = async (_id: any) => {
  try {
    await axios.delete(`${SITES_BASE_URL}/${_id}`);
  } catch (error) {
    console.error(`Error deleting site with id ${_id}`, error);
    throw error;
  }
};

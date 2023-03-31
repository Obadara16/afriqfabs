import axios from "axios";
const baseUrl = process.env.REACT_APP_API;
const apiKey = process.env.REACT_APP_NEWS_KEY;

//post Request
export const postRequest = async (url, _obj) => {
  try {
    const saved = window.localStorage.getItem("__xTFTGweTHDeRTT__%");
    const accesstoken = JSON.parse(saved);
    const header = {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    };
    const data = await axios.post(baseUrl + url, _obj, header);
    return data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

//getRequest
export const getRequest = async (url) => {
  try {
    const saved = window.localStorage.getItem("__xTFTGweTHDeRTT__%");
    const accesstoken = JSON.parse(saved);
    const header = {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    };
    const data = await axios.get(baseUrl + url, header);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//patch request
export const updateRequest = async (url, _obj) => {
  try {
    const saved = window.localStorage.getItem("__xTFTGweTHDeRTT__%");
    const accesstoken = JSON.parse(saved);
    const header = {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    };
    const data = await axios.patch(baseUrl + url, _obj, header);
    return data;
  } catch (error) {
    return error.response;
  }
};

//GET NEWS
//getRequest
export const getnews = async () => {
  try {
    const data = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=ng&pageSize=10&apiKey=${apiKey}`
    );
    return data;
  } catch (error) {
    return error;
  }
};

//post Request
export const postAdminRequest = async (url, _obj) => {
  try {
    const saved = window.localStorage.getItem("__xTFTGweTHDeRTA__%");
    const accesstoken = JSON.parse(saved);
    const header = {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    };
    const data = await axios.post(baseUrl + url, _obj, header);
    return data;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

//getRequest
export const getAdminRequest = async (url) => {
  try {
    const saved = window.localStorage.getItem("__xTFTGweTHDeRTA__%");
    const accesstoken = JSON.parse(saved);
    const header = {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    };
    const data = await axios.get(baseUrl + url, header);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//patch request
export const updateAdminRequest = async (url, _obj) => {
  try {
    window.localStorage.getItem("__xTFTGweTHDeRTA__%");
    const accesstoken = JSON.parse(saved);
    const header = {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    };
    const data = await axios.patch(baseUrl + url, _obj, header);
    return data;
  } catch (error) {
    return error.response;
  }
};


//delete request
export const deleteAdminRequest = async (url) => {
  try {
    const saved = window.localStorage.getItem("__xTFTGweTHDeRTA__%");
    const accesstoken = JSON.parse(saved);
    const header = {
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    };
    const data = await axios.delete(baseUrl + url, header);
    return data;
  } catch (error) {
    return error.response;
  }
};

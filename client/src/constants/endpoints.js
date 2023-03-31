// user and authentication end points
const userurl = "/user/";
export const urlForUsers = {
  registraton: `${userurl}signup`,
  login: `${userurl}signin`,
  getUserprofile: `${userurl}profile`,
  getPublicUserprofile: `${userurl}profile`,
  updateUser: `${userurl}profile/update-bio`,
  resetPassword: `${userurl}reset-password`,
  otp: `${userurl}verify-email-address`,
  updateProfileImage: `${userurl}profile/update-img`,
  notification: `${userurl}notifications`,
  request_reset_Password: `${userurl}request-reset-password`,
};



//contents end points
const contentsurl = "/contents/";
export const urlForContents = {
  uploadContent: `${contentsurl}upload`,
  // getContents: `${contentsurl}`,
};

//categories endpoint
export const category_endpoint = {
  categories: "/categories/",
};

//spaces end points
const group = "/groups";
export const spaces_endpoint = {
  allspaces: `${group}`,
  createspace: `${group}/create`,
};

//NEWS APi
const key = "15112fde9d874ce2ab908b0085427025";
export const news = {
  getHeadlines: `https://newsapi.org/v2/top-headlines?country=nigeria&apiKey=${key}`,
};
// Advert end points
const advert = "/ads";
export const advert_endpoint = {
  postad: `${advert}/upload`,
};

//payment
export const payment = {
  pay: "/paystack/pay",
};
//contact us
export const contact = {
  contactUs: "/contact-us",
};

// admin user authentication end points
const adminurl = "/admin";
export const urlForAdmin = {
  login: `${adminurl}/signin`,
};


//admin  users endpoints
const users = "/admin/users";
export const user_url = {
  allusers: `${users}?page=`,
  activeUsers: `${users}/active-users?page=`,
  inactiveUsers: `${users}/inactive-users?page=`,
  blockedUsers: `${users}/blocked-users?page=`,
  blockUsers: `${users}`,
  unblockUsers: `${users}`,
};
//admin ads
const ads = "/admin/ads";
export const ads_endpoint = {
  allAds: `${ads}?page=`,
  pendingAds: `${ads}/pending-ads?page=`,
  approvedAds: `${ads}/approved-ads?page=`,
};

//admin posts
const posts = "/admin/contents";
export const posts_endpoint = {
  allPosts: `${posts}?page=`,
  pendingPosts: `${posts}/pending-posts?page=`,
  approvedPosts: `${posts}/approved-posts?page=`,
};

//admin spaces
const spaces = "/admin/groups";
export const getspaces_endpoint = {
  allSpaces: `${spaces}?page=`,
  pendingSpaces: `${spaces}/pending-spaces?page=`,
  approvedSpaces: `${spaces}/approved-spaces?page=`,
};

//admin get categories
const categories = "/admin/";
export const getcategories_endpoint = {
  allCategories: `${categories}categories`,
  createCategory: `${categories}category`,
};

//admin create category
const category = "/admin/categories/";
export const createcategory_endpoint = {
  createCategory: `${category}create`,
};

//admin search bar
const search = "/admin/users";
export const search_endpoint = {
  searchUser: `${search}/search?searchQuery=`,
};


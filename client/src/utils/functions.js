import { postRequest, getRequest } from "./api";

// test
export const testing = async (id, body, images, title, data, color) => {
  const response = await postRequest(`/category-contents/${id}upload`, {
    body: body,
    contentImgs: images,
    title: title,
  });
  if (response.status === 201) {
    alert("Conversation has been posted");
    window.location.reload();
  }
};

export const replyById = async (id) => {
  const response = await getRequest(`/content/comment/${id}/replies`);
  console.log(response);
};

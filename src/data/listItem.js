import axios from "axios"
import BASEURL from "./url"

export const getAllListItem = async (id) => {
  const listItem = await axios.get(`${BASEURL}/todo-items?activity_group_id=${id}`);

  console.log(listItem);

  return listItem;
}

export const getItemsById = async (id) => {
  const detailItem = await axios.get(`${BASEURL}/todo-items/${id}`);

  console.log(detailItem);

  return detailItem;
}

export const postListItem = async (data) => {
  const postItem = await axios.post(`${BASEURL}/todo-items`, data);

  console.log(postItem);

  return postItem;
}

export const patchListItem = async (data, id) => {
  const patchItem = await axios.patch(`${BASEURL}/todo-items/${id}`, data);

  console.log(patchItem);

  return patchItem;
}

export const delListItem = async (id) => {
  const deleteItem = await axios.delete(`${BASEURL}/todo-items/${id}`)

  console.log(deleteItem);

  return deleteItem;
}


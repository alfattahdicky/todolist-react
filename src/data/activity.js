import axios from "axios";
import BASEURL from "./url"

export const getAllActivity = async () => {
  const listActivity = await axios.get(`${BASEURL}/activity-groups?email=yoga%2B1%40skyshi.io`); 

  console.log(listActivity);

  return listActivity;
}

export const getActivity= async (id) => {
  const getActivityById  = await axios.get(`${BASEURL}/activity-groups/${id}`);

  console.log(getActivityById);

  return getActivityById;
}

export const postActivity = async (data) => {
  const createActivity = await axios.post(`${BASEURL}/activity-groups`, data);

  console.log(createActivity);

  return createActivity;
}

export const deleteActivity = async (id) => {
  const deleteActivityById = await axios.delete(`${BASEURL}/activity-groups/${id}`);

  return deleteActivityById;
}

export const patchActivity = async (title, id) => {
  const patchActivityById = await axios.patch(`${BASEURL}/activity-groups/${id}`, {title});

  console.log(patchActivityById);

  return patchActivityById;
}

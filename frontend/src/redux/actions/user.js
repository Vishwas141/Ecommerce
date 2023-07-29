import axios from "axios";
import { server } from "../../server";
import { loadUserRequest, loadUserSuccess, loadUserFail } from "../reducers/user"

// Action creator to load user details
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());

    const { data } = await axios.get(`${server}/user/loaduser-details`, {
      withCredentials: true,
    });

    // console.log("in action",data);

    dispatch(loadUserSuccess(data.user));
  } catch (err) {
    dispatch(loadUserFail(err.response.data.message));
  }
};

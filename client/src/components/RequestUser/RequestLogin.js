import axios from 'axios';
import { loginURL } from '../../URLs';

/**
 * @param {*} formData data of the form ()
 * @description takes in an object of {users_id, user_password}
 * and sends that as a POST request to login API ("domain/login")
 * @returns {string} JSON Web Token created for user
 */
export const loginRequest = async (formData) => {
  try {
    const { data } = await axios({
      url: loginURL(),
      method: "post",
      data: formData,
    });

    return data;
  } catch (e) {
    console.log(e.response);
    if (e.response.status === 401 || e.response.status === 500) {
      alert(e.response.data);
    }
    return;
  }
};
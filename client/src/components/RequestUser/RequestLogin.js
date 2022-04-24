import axios from 'axios';
import { loginURL } from '../../URLs';

/**
 * @param {*} formData data of the form ()
 * @description takes in an object of {users_id, user_password}
 * and sends that as a POST request to login API ("domain/login")
 * @returns JSON Web Token created for user
 */
export const loginRequest = async (formData) => {
  await axios({
    url: loginURL(),
    method: "post",
    data: formData,
  })
    .then((data) => { return data; })
    .catch((err) => {
      if (err.response.status === 401 || err.response.status ===500) {
        alert(err.response.data);
      }
      return;
    })
    .finally( () => {return;} )
};
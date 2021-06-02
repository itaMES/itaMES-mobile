import axios from 'axios';
import NetInfo from "@react-native-community/netinfo";
import { ToastAndroid } from 'react-native';
import UserStorage from '@/storage/user.storage'

export const request = async (
  url: string = '',
  method: string = 'GET',
  data: object = {},
  isUpload = false,
) => {
  const isConnected = await NetInfo.fetch().then(isConnected => { return isConnected; });
  if (!isConnected) {
    ToastAndroid.showWithGravity(
      'No internet connection. Please try again!',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
    );
    return {
      status: 503,
      message: 'No internet connection!'
    };
  }
  const options = {
    method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: '',
    },
    timeout: 60000, // 30s
    data: {},
  };
  const user = await UserStorage.getUserInfo() || {};
  const { token } = user;
  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  } else {
    // history.push('/user/login');
  }

  if (data && isUpload) {
    options.data = data;
    delete options.headers['Content-Type'];
  } else if (data) {
    options.data = JSON.stringify(data);
  }

  return new Promise((resolve, reject) => {
    axios
      .request({
        url,
        ...options,
      })
      .then((response) => {
        const { data: successData = {}, status } = response;
        const dataHandle = { ...successData, status, ok: true };
        return resolve(dataHandle);
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          const { data: errorData, status } = error.response;
          return resolve(errorData);
        }
        if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          // cannot connect to server
          console.log(error.request);
          return resolve({
            status: 408,
            error: 'ECONNABORTED',
            message: 'Không thể kết nối tới máy chủ.',
          });
        }
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        return reject(error);

        // console.log(error.config);
      });
  });
}

import { removeNullProperties } from '@utils/common';
import axios, { AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

// eslint-disable-next-line no-shadow
enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
}
interface RequestConfig extends AxiosRequestConfig {
  mode: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const request: any = async (url = '', method = Method.GET, data: object = {}, isUpload = false) => {
  let token: string | null = null;
  try {
    token = await AsyncStorage.getItem('@token');
    console.log('token', token);
  } catch (e) {
    // error reading value
  }
  const options: RequestConfig = {
    method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: '',
    },
    timeout: 2 * 60 * 1000, // 2'
    data: {},
  };

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  } else {
    // TODO: Show message and redirect to login page
  }

  if (data && isUpload) {
    options.data = data;
    delete options.headers['Content-Type'];
  } else if (data) {
    const body = removeNullProperties(data);
    options.data = body;
  }

  return new Promise((resolve, reject) => {
    axios
      .request({
        url,
        ...options,
      })
      .then(response => {
        const { data: successData = {}, status } = response;
        const dataHandle = { ...successData, status, ok: true };
        return resolve(dataHandle);
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response);
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          const { data: errorData, status } = error.response;
          // const dataHandle = { ...errorData, status };
          // send to bugsnag
          if (status >= 400 && status < 600 && status && status !== 401) {
            // if (bugsnagClient) {
            //   bugsnagClient.notify(new Error(JSON.stringify({ response: dataHandle, url, data })));
            // }
          }
          if (status === 500) {
            // cannot connect to server
            // notification.error({
            //   key: '500_Server_Internal_Error',
            //   message: 'Máy Chủ Lỗi',
            //   description: 'Máy chủ lỗi. Vui Lòng thử lại sau',
            // });
          }
          if (token) {
            if (status === 401) {
              const { error: { message = '' } = {} } = errorData;
              // handleUnAuthorized(message);
            }
            return resolve(errorData);
          }
          return resolve(errorData);
        }
        if (error.request) {
          // send to bugsnag
          // if (bugsnagClient) {
          //   bugsnagClient.notify(new Error(JSON.stringify({ url, status: 408 })));
          // }
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          // cannot connect to server
          console.log(error.request);
          // notification.error({
          //   key: '408_Cant_Connect_To_Server',
          //   message: 'Lỗi Mạng',
          //   description: 'Không thể kết nối tới máy chủ.',
          // });
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
};

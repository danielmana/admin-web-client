import 'whatwg-fetch';
import defaultsDeep from 'lodash/defaultsDeep';
import set from 'lodash/set';

import storage from 'utils/storage';

/**
 * Through error if necessary or return response
 *
 * @param  {object} response A handled responsed from a network request
 *
 * @return {object|undefined} A handled responsed from a network request
 */
function handleIfErrors(response) {
  if (response === null || (response && !response.throwError)) {
    return response;
  }
  throw response;
}

/**
 * Resolves the appropriate value from the network reponse
 *§
 * @param  {object} response   A response from a network request
 *
 * @return {promise} Returns promise that should resolve into the response json or the response itself
 */
function handleResponse(response) {
  if (response.status === 401) {
    // logout and redirect on 401 errors
    storage.removeUser();
    window.location.reload();
    return;
  }
  return new Promise((resolve) => {
    if (response.status >= 200 && response.status < 300) {
      const header = response.headers.get('Authorization');
      if (header) {
        storage.setUser(header);
      }
      response.json().then((json) => resolve(json));
    } else if (response.bodyUsed) {
      response.json().then((json) => {
        Object.assign(json, { throwError: true });
        resolve(json);
      });
    } else {
      Object.assign(response, { throwError: true });
      resolve(response);
    }
  });
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} endpoint  The endpoint we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(endpoint, options) {
  const url = `${process.env.REACT_APP_API_BASE_PATH}${endpoint}`;
  const currentUser = storage.getUser();

  const defaults = {
    headers: {
      Authorization: currentUser || '',
    },
  };

  // use json for put/post
  if (options && options.body && /put|post/i.test(options.method) && !/\/documents$/.test(endpoint)) {
    set(options, 'body', JSON.stringify(options.body));
  }

  return fetch(url, defaultsDeep({}, options, defaults))
    .then(handleResponse)
    .then(handleIfErrors);
}

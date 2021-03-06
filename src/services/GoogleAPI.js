/* eslint-disable */

import { CLIENT_ID, SCOPES, SPREADSHEET_ID } from "../config.json";

let gapi;
try {
  window.gapi.client;
  gapi = window.gapi;
} catch (e) {
  gapi = require("./GoogleAPI.mock");
}

/**
* Check if current user has authorized this application.
*/
export const authorize = immediate => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        gapi.auth.authorize(
          {
            client_id: CLIENT_ID,
            scope: SCOPES.join(" "),
            immediate: immediate
            // 'cookie_policy': 'single_host_origin'
          },
          authResult => {
            if (authResult && !authResult.error) {
              resolve(authResult);
            } else {
              reject(authResult.error);
            }
          }
        );
      },
      1000
    );
  });
};

export const signOut = () => {
  // var token = gapi.auth.getToken();
  // if (token) {
  //   var accessToken = gapi.auth.getToken().access_token;
  //   if (accessToken) {
  //     // console.log(accessToken)
  //     // make http get request towards: 'https://accounts.google.com/o/oauth2/revoke?token=' + accessToken
  //     // In angular you can do it like this:
  //     fetch({
  //       method: 'GET',
  //       url: 'https://accounts.google.com/o/oauth2/revoke?token=' + accessToken
  //     });
  //   }
  // }
  // gapi.auth.setToken(null);
  gapi.auth.signOut();
};

/**
 * Load profile data
 *  Should return an array contains :
 *  - [0] : an Array of all talks
 *  - [1] : an Object contains all members name who already vote once
 * @param {array} range
 * @returns
 *
 * @memberOf GoogleAPI
 */
export const batchGet = (ranges, majorDimension) => {
  var discoveryUrl = "https://sheets.googleapis.com/$discovery/rest?version=v4";

  return new Promise((resolve, reject) => {
    gapi.client.load(discoveryUrl).then(() => {
      gapi.client.sheets.spreadsheets.values
        .batchGet({
          spreadsheetId: SPREADSHEET_ID,
          ranges: ranges,
          majorDimension: majorDimension || "DIMENSION_UNSPECIFIED"
        })
        .then(
          response => {
            resolve(response.result);
          },
          response => reject(response.result.error)
        );
    });
  });
};

export const batchUpdate = (range, values) => {
  return gapi.client.sheets.spreadsheets.values.batchUpdate({
    spreadsheetId: SPREADSHEET_ID,
    valueInputOption: "RAW",
    data: [
      {
        range: range,
        values: values
      }
    ]
  });
};

/**
 * Load profile data
 *
 * @returns
 *
 * @memberOf GoogleAPI
 */
export const requestPeople = () => {
  return gapi.client.request({
    path: "https://people.googleapis.com/v1/people/me",
    params: {
      personFields: "names,photos,emailAddresses"
    }
  });
};

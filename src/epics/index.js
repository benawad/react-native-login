import { fromPromise } from 'rxjs/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import { combineEpics } from 'redux-observable';
import { startSubmit, stopSubmit } from 'redux-form';

import axios from 'axios';
import feathers from 'feathers-client';
import rest from 'feathers-rest/client';

import { AsyncStorage } from 'react-native';

const host = 'http://5f020b7a.ngrok.io';
const userPath = host + '/users';
const app = feathers()
  .configure(rest(host).axios(axios))
  .configure(feathers.hooks())
  .configure(feathers.authentication());

const users = app.service('users');

const signupEpic = (action$, { getState, dispatch }) =>
  action$.ofType('SIGNUP_REQUESTED')
    .do(action => {
      dispatch(startSubmit('signup'));
    })
    .mergeMap(action =>
      fromPromise(axios.post(userPath, action.payload))
        .map(response => {
          dispatch(stopSubmit('signup', {}));
          return {
            type: 'SIGNUP_SUCCEEDED',
            response
          }
        })
        .catch(({ response: { data } }) => { 
          let error = {};
          if (data && data.errors && data.errors.length) {
            const e1 = data.errors[0];
            if (e1.path === 'username') {
              error[e1.path] = 'Username taken';
            } else if (e1.path === 'email') {
              error[e1.path] = 'This email already has an account';
            } else {
              error[e1.path] = e1.message;
            }

          } else if (data && data.code === 500) {
            error.username = 'Max 12 characters exceeded';
          } else {
            error.room_num = 'Something went wrong :( try again later.';
          }
          dispatch(stopSubmit('signup', error));
          return Observable.of({
            type: 'SIGNUP_FAILED',
            error
          })
        })
    );

const loginEpic = (action$, { getState, dispatch }) =>
  action$.ofType('LOGIN_REQUESTED')
    .do(action => {
      dispatch(startSubmit('login'));
    })
    .mergeMap(action =>
      fromPromise(app.authenticate({
        type: 'local',
        ...action.payload
      }))
        .map(response => {
          dispatch(stopSubmit('login', {}));
          return { 
            type: 'LOGIN_SUCCEEDED',
            response 
          };
        })
      .catch(error => {
        dispatch(stopSubmit('login', {
          password: 'Wrong password',
        }));
        return Observable.of({
          type: 'LOGIN_FAILED',
          error
        });
      })
    );

async function saveToken(token) {
  try {
    await AsyncStorage.setItem('@bananahub:token', token);
  } catch (error) {
    console.log('Error setting item for AsyncStorage');
    console.log(error);
  }
}

const saveTokenEpic = action$ =>
  action$.ofType('LOGIN_SUCCEEDED')
    .mergeMap(action =>
      fromPromise(saveToken(action.response.token))
        .map(x => ({
          type: 'SET_ITEM_SUCCEEDED',
        }))
    );

export default combineEpics(
  signupEpic,
  loginEpic,
  saveTokenEpic
);

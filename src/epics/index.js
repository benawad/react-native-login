import { fromPromise } from 'rxjs/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import { combineEpics } from 'redux-observable';
import { startSubmit, stopSubmit } from 'redux-form';

import axios from 'axios';
import feathers from 'feathers-client';
import rest from 'feathers-rest/client';

import { AsyncStorage } from 'react-native';

const host = 'http://5f020b7a.ngrok.io';
const app = feathers()
  .configure(rest(host).axios(axios))
  .configure(feathers.hooks())
  .configure(feathers.authentication());

const users = app.service('users');

const signupEpic = action$ =>
  action$.ofType('SIGNUP_REQUESTED')
    .mergeMap(action =>
      fromPromise(users.create(action.payload))
        .map(response => ({
          type: 'SIGNUP_SUCCEEDED',
          response
        }))
        .catch(error => Observable.of({
          type: 'SIGNUP_FAILED',
          error
        }))
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

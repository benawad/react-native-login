import { fromPromise } from 'rxjs/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import { combineEpics } from 'redux-observable';

import axios from 'axios';
import feathers from 'feathers-client';
import rest from 'feathers-rest/client';

const host = 'http://5f020b7a.ngrok.io';
const app = feathers()
  .configure(rest(host).axios(axios))
  .configure(feathers.hooks())
  .configure(feathers.authentication({ storage: window.localStorage }));

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

export default combineEpics(
  signupEpic
);

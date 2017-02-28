import { ajax } from 'rxjs/observable/dom/ajax';
import { combineEpics } from 'redux-observable';

import superagent from 'superagent';
import feathers from 'feathers-client';
import rest from 'feathers-rest/client';

const host = 'http://5f020b7a.ngrok.io';
const app = feathers()
  .configure(rest(host).superagent(superagent))
  .configure(feathers.hooks())
  .configure(feathers.authentication({ storage: window.localStorage }));

const users = app.service('users');

const signupEpic = action$ =>
  action$.ofType('SIGNUP_REQUESTED')
    .mergeMap(action =>
      users.create(action.payload)
        .map(response => ({type: 'Yo'}))
    );

export default combineEpics(
  signupEpic
);

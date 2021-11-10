import { app, authentication } from '@microsoft/teams-js';
import React, { ReactElement } from 'react';

import { noHostSdkMsg } from '../App';
import BoxAndButton from './BoxAndButton';

const AuthenticationAPIs = (): ReactElement => {
  const [getTokenRes, setGetTokenRes] = React.useState('');
  const [getUserRes, setGetUserRes] = React.useState('');
  const [notifyFailureRes, setNotifyFailureRes] = React.useState('');
  const [notifySuccessRes, setNotifySuccessRes] = React.useState('');
  const [authenticateRes, setAuthenticateRes] = React.useState('');
  const [initializeRes, setInitializeRes] = React.useState('');

  const authGetToken = (unformattedAuthParams: string): void => {
    setGetTokenRes('authentication.getToken()' + noHostSdkMsg);
    const authParams: authentication.AuthTokenRequestParameters = JSON.parse(unformattedAuthParams);
    authentication
      .getAuthToken(authParams)
      .then(result => setGetTokenRes('Success: ' + result))
      .catch(reason => setGetTokenRes('Failure: ' + reason));
  };

  const authGetUser = (): void => {
    setGetUserRes('authentication.getUser()' + noHostSdkMsg);
    authentication
      .getUser()
      .then(user => setGetUserRes('Success: ' + JSON.stringify(user)))
      .catch(reason => setGetUserRes('Failure: ' + reason));
  };

  const authNotifyFailure = (reason: string): void => {
    authentication.notifyFailure(reason);
    setNotifyFailureRes('called');
  };

  const authNotifySuccess = (result: string): void => {
    authentication.notifySuccess(result);
    setNotifySuccessRes('called');
  };

  const initialize = (): void => {
    app.initialize();
    setInitializeRes('called');
  };

  const authAuthenticate = (unformattedAuthParams: string): void => {
    setAuthenticateRes('authentication.authenticate()' + noHostSdkMsg);
    const authParams: authentication.AuthenticatePopUpParameters = JSON.parse(unformattedAuthParams);
    authentication
      .authenticate(authParams)
      .then(token => setAuthenticateRes('Success: ' + token))
      .catch((reason: Error) => setAuthenticateRes('Failure: ' + reason.message));
  };

  return (
    <>
      <h1>authentication</h1>
      <BoxAndButton
        handleClick={initialize}
        output={initializeRes}
        hasInput={false}
        title="Initialize"
        name="initialize"
      />
      <BoxAndButton
        handleClickWithInput={authGetToken}
        output={getTokenRes}
        hasInput={true}
        title="Get Auth Token"
        name="getAuthToken"
      />
      <BoxAndButton handleClick={authGetUser} output={getUserRes} hasInput={false} title="Get User" name="getUser" />
      <BoxAndButton
        handleClickWithInput={authNotifyFailure}
        output={notifyFailureRes}
        hasInput={true}
        title="authentication.notifyFailure"
        name="authentication.notifyFailure"
      />
      <BoxAndButton
        handleClickWithInput={authNotifySuccess}
        output={notifySuccessRes}
        hasInput={true}
        title="authentication.notifySuccess"
        name="authentication.notifySuccess"
      />
      <BoxAndButton
        handleClickWithInput={authAuthenticate}
        output={authenticateRes}
        hasInput={true}
        title="authentication.authenticate"
        name="authentication.authenticate"
      />
    </>
  );
};

export default AuthenticationAPIs;
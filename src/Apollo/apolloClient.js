import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import {
  ApolloClient, ApolloLink, HttpLink, InMemoryCache,
} from '@apollo/client';
import _ from 'lodash';
import { createUploadLink } from 'apollo-upload-client';
// import { Auth } from 'aws-amplify';
import Auth from '@aws-amplify/auth';

import emitter from '../Ultis/emitter';
import packageJson from '../../package.json';
import AppFlowActions from '../Constants';

// const APOLLO_HOST = 'http://graphqldashboard.fiot.vn/graphql';
const APOLLO_HOST = 'http://ec2-13-250-19-171.ap-southeast-1.compute.amazonaws.com/graphql'; // nano HOST


const cache = new InMemoryCache({ addTypename: false });
const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

const createClient = async (isUsingCache = false, isNotShowDisconnect = false) => {
  // console.log('isUsingCache', isUsingCache, isNotShowDisconnect);
  try {
    const currentSession = await Auth.currentSession();
    const token = currentSession.accessToken.jwtToken;
    console.log('The token: ', token);
    const authLink = setContext((_, { headers }) => ({
      headers: { ...headers, authorization: token ? `Bearer ${token}` : '' },
    }));
    return new ApolloClient({
      link: authLink.concat(
        ApolloLink.from([
          onError(({
            graphQLErrors, networkError, response, operation, forward,
          }) => {
            console.log({
              graphQLErrors, networkError, response, forward,
            });
            if (graphQLErrors) {
              console.log({ graphQLErrors });
              graphQLErrors.map(({ message, extensions }) => {
                if (_.includes(message, '403') || _.includes(message, '400') || extensions.code === 'UNAUTHENTICATED') {
                  // TODO: Go to Login screen, clear data
                  emitter.emit(AppFlowActions.LOGOUT_REQUEST, 'request');
                }
              });
            }
            if (networkError) {
              console.log(`[Network error]: ${networkError}`);
              if (!isNotShowDisconnect) {
                // openPopupDisconnect();
              }
              return { error: networkError };
            }
          }),
          new HttpLink({
            uri: APOLLO_HOST,
            credentials: 'same-origin',
          }),
        ]),
      ),
      cache,
      defaultOptions: isUsingCache ? undefined : defaultOptions,
      name: 'web',
      version: packageJson.version,
    });
  } catch (error) {
    console.log('errrror: ', error);
    return { error };
  }
};

const createUploadClient = async (isUsingCache = false) => {
  try {
    const currentSession = await Auth.currentSession();
    const token = currentSession.accessToken.jwtToken;
    console.log('The token: ', token);
    const uploadLink = createUploadLink({
      uri: APOLLO_HOST,
      headers: {
        'keep-alive': 'true',
      },
    });
    const authLink = setContext((_, { headers }) => ({
      headers: { ...headers, authorization: token ? `Bearer ${token}` : '' },
    }));
    return new ApolloClient({
      link: authLink.concat(uploadLink),
      name: 'web',
      cache,
      defaultOptions: isUsingCache ? undefined : defaultOptions,
    });
  } catch (error) {
    console.log('errrror: ', error);
    return { error };
  }
};

export { createUploadClient };
export default createClient;

export const resetStore = async () => {
  const client = await createClient();
  return client.resetStore();
};

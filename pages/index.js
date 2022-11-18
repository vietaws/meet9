import styles from '../styles/Home.module.css';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Amplify, { API, Auth } from 'aws-amplify';

Amplify.configure({
  aws_project_region: 'us-east-1',
  aws_cognito_region: 'us-east-1',
  aws_user_pools_id: 'us-east-1_XldThiv7W',
  aws_user_pools_web_client_id: 'm3l2hqe4ggnj91ireftueedrc',

  aws_mandatory_sign_in: 'enable',
  aws_cloud_logic_custom: [
    {
      name: 'meet9',
      endpoint: 'https://ohsyplmqwh.execute-api.us-east-1.amazonaws.com/dev',
      region: 'us-east-1',
    },
  ],
});

export default function Home() {
  const getData = async () => {
    const user = await Auth.currentAuthenticatedUser();
    const idToken = user.signInUserSession.idToken.jwtToken;
    console.log('user', idToken);
    const requestHeader = {
      headers: {
        Authorization: idToken,
      },
    };
    const data = await API.get('meet9', '/hello', requestHeader);
    console.log('data', data);
  };
  return (
    <div className={styles.container}>
      <h1>VietAWS | Meetup #9 | Serverless Workshop</h1>
      <Authenticator
        signUpAttributes={['name']}
        socialProviders={['amazon', 'apple', 'facebook', 'google']}
      >
        {({ signOut, user }) => (
          <main>
            <h3>
              Congratulations! Welcome {user.attributes.name} (
              {user.attributes.email})
            </h3>
            <button onClick={getData}>Get API</button> <br />
            <button onClick={signOut}>Sign out</button>
          </main>
        )}
      </Authenticator>
    </div>
  );
}

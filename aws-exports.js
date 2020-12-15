const awsmobileDev = {
  aws_project_region: 'us-east-1',
  aws_cognito_identity_pool_id: 'us-east-1:0f4eee71-6306-4617-b7e1-27327fa5217b',
  aws_cognito_region: 'us-east-1',
  aws_user_pools_id: 'us-east-1_pPLty8X2X',
  aws_user_pools_web_client_id: '3nfundvqe4ubd22fpn1nov7bj3',
  oauth: {
    domain: 'biocaredemoe12ef6d0-e12ef6d0-dev.auth.us-east-1.amazoncognito.com',
    scope: [
      'phone',
      'email',
      'openid',
      'profile',
      'aws.cognito.signin.user.admin',
    ],
    redirectSignIn: 'https://biotricity.com/',
    redirectSignOut: 'https://biotricity.com/',
    responseType: 'code',
  },
  federationTarget: 'COGNITO_USER_POOLS',
  aws_mobile_analytics_app_id: 'e21acad99fd3417c9ae3169e7a9c8f3a',
  aws_mobile_analytics_app_region: 'us-east-1',
  aws_user_files_s3_bucket: 'biocare-demof07d7277a0ab4feeb10d3c57f92eecc9dev-dev',
  aws_user_files_s3_bucket_region: 'us-east-1',
};

const awsmobile = awsmobileDev;

export default awsmobile;

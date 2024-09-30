import { defineAuth } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      saml: {
        name: 'OneLoginLogUInSAML',
        metadata: {
          metadataContent: 'https://liveu.onelogin.com/saml/metadata/d2fa03e5-9ea5-4af7-ad1f-c0773094f4e8', // or content of the metadata file
          metadataType: 'URL', // or 'FILE'
        },
      },
      logoutUrls: ['https://main.d159opxp4nlbj5.amplifyapp.com/'],
      callbackUrls: [
        'https://main.d159opxp4nlbj5.amplifyapp.com/'
      ],
    },
  },
});

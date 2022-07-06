"use strict";

module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: '@strapi-community/strapi-provider-upload-google-cloud-storage',
      providerOptions: {
        serviceAccount: env.json('GCS_SERVICE_ACCOUNT'),
        bucketName: env('GOOGLE_BUCKET_NAME'),
        //baseUrl: env('GCS_BASE_URL'),
      },
    },
  },
});
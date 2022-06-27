"use strict";

module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'strapi-provider-upload-google-cloud-storage',
      providerOptions: {
        serviceAccount: env.json('GCS_SERVICE_ACCOUNT'),
        bucketName: env('GCS_BUCKET_NAME'),
        baseUrl: env('GCS_BASE_URL'),
      },
    },
  },
});
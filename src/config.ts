function config() {
  switch (process.env.VUE_APP_APP_ENV) {
    case 'staging':
      return {
        baseURL: process.env.VUE_APP_STAGING_API_URL,
        serverURL: process.env.VUE_APP_STAGING_SERVER_URL,
      };
    case 'production':
      return {
        baseURL: process.env.VUE_APP_API_URL,
        serverURL: process.env.VUE_APP_SERVER_URL,
      };
    default:
      return {
        baseURL: process.env.VUE_APP_DEV_API_BASE_URL,
        serverURL: process.env.VUE_APP_DEV_SERVER_URL,
      };
  }
}

export default config();
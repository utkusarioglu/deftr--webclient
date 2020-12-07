import { compose } from 'redux';

declare global {
  namespace NodeJS {
    /**
     * Custom environment variables used by the app
     */
    interface ProcessEnv {
      NODE_ENV: 'development' | 'test' | 'production';
      GENERATE_SOURCEMAP: boolean;
      REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID: string;
      REACT_APP_SERVER_PORT: string;
      /**
       * This is used for determining whether to use http/https - ws/wss
       */
      REACT_APP_SECURE_SCHEMES: 'FALSE' | 'TRUE';
      /**
       * This is intended to be an override of window.location.hostname,
       * in case it is needed. The check and parse of this value is made
       * at config module.
       * */
      REACT_APP_HOSTNAME?: string;
    }
  }

  /**
   * Custom properties received from public/index.php
   * Note that development and production values of these properties are
   * populated by public/index.php while test values are populated by jest
   * in src/setupTest.js
   */
  interface Window {
    /** Used by redux */
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
  }
}

export {};

import { compose } from 'redux';

declare global {
  namespace NodeJS {
    /**
     * Custom environment variables used by the app
     */
    interface ProcessEnv {
      REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID: string;
      GENERATE_SOURCEMAP: boolean;
      HTTP_PORT: number;
      NODE_ENV: 'development' | 'test' | 'production';
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

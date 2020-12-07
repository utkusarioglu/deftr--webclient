const {
  REACT_APP_SERVER_PORT,
  REACT_APP_SECURE_SCHEMES,
  REACT_APP_HOSTNAME,
} = process.env;

/**
 * Single source of config for the app, .env is mapped here as well.
 */
const CONFIG = {
  serverPort: parseInt(REACT_APP_SERVER_PORT),
  secureSchemes: REACT_APP_SECURE_SCHEMES === 'TRUE',

  // the bottom are computed using .env values
  hypertextScheme: REACT_APP_SECURE_SCHEMES === 'TRUE' ? 'https' : 'http',
  websocketScheme: REACT_APP_SECURE_SCHEMES === 'TRUE' ? 'wss' : 'ws',
  hostname: REACT_APP_HOSTNAME || window.location.hostname,
};

export default CONFIG;

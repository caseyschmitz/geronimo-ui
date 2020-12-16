import Service from '@ember/service';
import { computed } from '@ember/object';
import config from 'geronimo/config/environment';

//export default Service.extend({
export default class AuthService extends Service {

  /**
   * Configure our auth0 instance
   */
  @computed
  get auth0() {
    return new auth0.WebAuth({
      // setting up the config file will be covered below
      domain: config.auth0.domain, // domain from auth0
      clientID: config.auth0.clientId, // clientId from auth0
      redirectUri: config.auth0.callbackUrl,
      audience: `https://${config.auth0.domain}/userinfo`,
      responseType: 'token',
      scope: 'openid profile' // adding profile because we want username, given_name, etc
    });
  }

  /**
   * Send a user over to the hosted auth0 login page
   */
  login() {
    this.auth0.authorize();
  }

  /**
   * When a user lands back on our application
   * Parse the hash and store user info
   */
  handleAuthentication() {
    return new Promise((resolve) => {
      this.auth0.parseHash((err, authResult) => {
        if (err) return false;

        if (authResult && authResult.accessToken) {
          this.setUser(authResult.accessToken);
        }

        return resolve();
      });
    });
  }

  /**
   * Computed to tell if a user is logged in or not
   * @return boolean
   */
  @computed
  get isAuthenticated() {
    return this.checkLogin();
  }

  /**
   * Use the token to set our user
   */
  setUser(token) {
    // once we have a token, we are able to go get the users information
    this.auth0
      .client
      .userInfo(token, (err, profile) => this.set('user', profile))
  }

  /**
   * Check if we are authenticated using the auth0 library's checkSession
   */
  checkLogin() {
    // check to see if a user is authenticated, we'll get a token back
    this.auth0
      .checkSession({}, (err, authResult) => {
        // if we are wrong, stop everything now
        if (err) return err;
        this.setUser(authResult.accessToken);
      });
  }

  /**
   * Get rid of everything in sessionStorage that identifies this user
   */
  logout() {
    this.auth0.logout({
      clientID: config.auth0.clientId,
      returnTo: 'http://localhost:4200'
    });
  }
};
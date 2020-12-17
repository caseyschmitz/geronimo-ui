import EmberRouter from '@ember/routing/router';
import config from 'geronimo/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('dashboard');
  this.route('callback');
  this.route('speed-test');
  this.route('speed-test-client');
  //this.route('speed-test-client', { path: '/speed-test-clients/:node_id' });
  this.route('login');
  this.route('register');
});

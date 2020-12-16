import EmberRouter from '@ember/routing/router';
import config from 'geronimo/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('dashboard');
  this.route('callback');
  this.route('home');
  this.route('speedtest');
  this.route('test-node');
  //this.route('test-node', { path: '/test-nodes/:node_id' });
});

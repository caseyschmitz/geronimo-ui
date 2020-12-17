import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default class SpeedTestClientRoute extends Route.extend(AuthenticatedRouteMixin) {
    @service store;

    model() {
        return this.store.findAll('speed-test-client');
    }

    /*
    model(params) {
        console.log('getting speed-test-client ' + params.nodeId);
        return this.store.findRecord('speed-test-client', params.nodeId);
    }
    */
}

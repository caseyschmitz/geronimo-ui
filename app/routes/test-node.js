import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default class TestNodeRoute extends Route.extend(AuthenticatedRouteMixin) {
    @service store;

    model() {
        return this.store.findAll('test-node');
    }

    /*
    model(params) {
        console.log('getting test-node ' + params.nodeId);
        return this.store.findRecord('test-node', params.nodeId);
    }
    */
}

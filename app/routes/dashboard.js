import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import { inject as service } from '@ember/service';

export default class DashboardRoute extends Route.extend(AuthenticatedRouteMixin) {
    @service session;
    
    //beforeModel(transition) {
    //    this.get('session').requireAuthentication(transition, 'login');
    //}
    
}

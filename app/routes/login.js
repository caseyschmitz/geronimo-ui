import Route from '@ember/routing/route';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
import { inject as service } from '@ember/service';

export default class LoginRoute extends Route.extend(UnauthenticatedRouteMixin) {
    @service session;
    routeIfAlreadyAuthenticated = 'dashboard';
    /*
    beforeModel(transition) {
        this.get('session').prohibitAuthentication('index');
    }
    */
}

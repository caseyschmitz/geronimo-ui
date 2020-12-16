import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class DashboardRoute extends Route {
    @service auth;
    beforeModel() {
        if (!this.auth.isAuthenticated) {
            this.transitionTo('/');
          }
    }
}
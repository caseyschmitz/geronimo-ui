import Route from '@ember/routing/route';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';
import { inject as service } from '@ember/service';

// adapted from https://github.com/simplabs/ember-simple-auth/blob/master/guides/managing-current-user.md
// and https://embersteps.com/ember-simple-auth-access-current-user-model-hook/

export default class ApplicationRoute extends Route.extend(ApplicationRouteMixin) {
    @service session;

    routeAfterAuthentication = 'dashboard';

    @service currentUser;

    beforeModel() {
        return this._loadCurrentUser();
    }

    sessionAuthenticated() {
        super.sessionAuthenticated(...arguments);
        this._loadCurrentUser();
    }

    async _loadCurrentUser() {
        try {
            await this.currentUser.load();
        } catch(err) {
            await this.session.invalidate();
        }
    }
}

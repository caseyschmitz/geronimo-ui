import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class AppNavComponent extends Component {
    @service router;
    @service auth;
    /**
     * From service/auth, starting the login process
     */
    @action login() {
        this.auth.login();
    }

    @action goHome() {
        this.router.transitionTo('home');
    }

    @action goDashboard() {
        this.router.transitionTo('dashboard');
    }

    /**
     * From service/auth, removing the saved token from the session.
     */
    @action logout() {
        this.auth.logout()
    }
}
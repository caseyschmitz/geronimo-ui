import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { computed } from '@ember/object';

export default class AppNavComponent extends Component {
    @service router;
    @service session;

    @computed
    get currentUser() {
        console.log(this.get('session'));
        return this.session.data.authenticated.currentUser;
    }
    
    @action login() {
        this.get('session').login();
    }
    
    @action goHome() {
        this.router.transitionTo('index');
    }

    @action goDashboard() {
        this.router.transitionTo('dashboard');
    }

    @action goSpeedTestClient() {
        this.router.transitionTo('speed-test-client');
    }

    @action goSpeedTest() {
        this.router.transitionTo('speed-test');
    }

    @action invalidateSession() {
        this.session.invalidate();
    }
}
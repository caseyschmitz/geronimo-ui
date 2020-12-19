import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from "@glimmer/tracking";

export default class LoginController extends Controller {
    @tracked errorMessage;
    @service session;

    @action
    async authenticate(e) {
        e.preventDefault();
        const credentials = this.getProperties('username', 'password');
        const authenticator = 'authenticator:token';

        try {
            this.session.authenticate(
                authenticator, 
                credentials
            );
        } catch(error) {
            this.errorMessage = error.error || error;
        }
    }

    @action
    updateUsername(e) {
        this.username = e.target.value;
    }

    @action
    updatePassword(e) {
        this.password = e.target.value;
    }
}

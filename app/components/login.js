import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from "@glimmer/tracking";

export default class LoginComponent extends Component {
    @service session;
    @tracked errorMessage;
    @tracked username;
    @tracked password;

    @action
    async authenticate() {
        const credentials = {username: this.username, password: this.password}
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
}

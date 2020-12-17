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
        let {identification, password} = this;

        try {
            this.get('session').authenticate(
                'authenticator:drf-token-authenticator', 
                identification, 
                password
            ).then(() => {
                this.setProperties({identification: identification})
            });
        } catch(error) {
            this.errorMessage = error.error || error;  
        }

        if (this.session.isAuthenticated) {
            console.log('authenticated ' + identification);
        }
    }

    @action
    updateIdentification(e) {
        this.identification = e.target.value;
    }

    @action
    updatePassword(e) {
        this.password = e.target.value;
    }
}

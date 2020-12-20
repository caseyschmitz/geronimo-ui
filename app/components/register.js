import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from "@glimmer/tracking";

export default class RegisterComponent extends Component {
    @service store;
    @service router;

    @tracked user = {}

    @tracked username;
    @tracked email;
    @tracked password;
    @tracked confirm_password;

    @action register() {
       return this.store.createRecord('user',
           this.user
       ).save().then(() => {
           this.router.transitionTo('login');
       })
    }

    UserNameValidation = [{
        message: "Please enter valid User Name. (alphanum, _, @, +, and -)",
        validate: (input) => {
            let usernamepattern = /^[a-zA-Z0-9\_\@\+\-]{3,150}$/;
            return usernamepattern.test(input);
        }
    }]


    PasswordMatchValidation = [{
        message: "Passwords do not match.",
        validate: (input) => {
            return this.user.password == input;
        }
    }]
}

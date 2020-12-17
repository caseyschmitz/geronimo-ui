import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import jQuery from 'jquery';
import ENV from 'geronimo/config/environment';

export default class RegisterController extends Controller {
    @service store;
    @service router;

    @action register() {
        let {username, email, password, confirm_password} = this.getProperties(
            'username',
            'email',
            'password',
            'confirm_password'
        );
        /*
        jQuery.ajax({
            url: ENV.host + '/api/users/register',
            type: 'POST',
            data: JSON.stringify({
                data: {
                    username: username,
                    email: email,
                    password: password,
                    confirm_password: confirm_password
                }
            }),
            contentType: 'application/vnd.api+json',
            dataType: 'json'
            }).then((response) => {
            this.set('signupComplete', true);
            }, (xhr, status, error) => {
            this.set('error', xhr.responseText);
            });
        */
       return this.store.createRecord('user',
            {
                'username': username,
                'email': email,
                'password': password,
                'confirm_password': confirm_password
            }
       ).save().then(() => {
           this.router.transitionTo('login');
       })
    }
}

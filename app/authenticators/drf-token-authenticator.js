import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
import ENV from 'geronimo/config/environment';
import { inject as service } from '@ember/service';
import jQuery from 'jquery';

export default class DRFTokenAuthenticator extends Base {
    @service store;

    restore(data) {
        return new Ember.RSVP.Promise((resolve, reject) => {
        if (!Ember.isEmpty(data.token)) {
            resolve(data);
        } else {
            reject();
        }
        });
    }
    authenticate(username, password) {
        return new Ember.RSVP.Promise((resolve, reject) => {
        jQuery.ajax({
            url: ENV.host + '/api/api-auth-token/',
            type: 'POST',
            data: JSON.stringify({
                username: username,
                password: password
            }),
            contentType: 'application/json;charset=utf-8',
            dataType: 'json'
        }).then((response) => {
                Ember.run(function() {
                    resolve({
                        token: response.token
                    });
                });
                this.transitionTo('dashboard');
            }, (xhr, status, error) => {
                var response = xhr.responseText;
                Ember.run(function() {
                    reject(response);
                });
            });
        });
        
    }
  
}
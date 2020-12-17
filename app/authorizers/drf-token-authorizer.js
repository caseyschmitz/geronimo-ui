import Base from 'ember-simple-auth/authorizers/base';
import Ember from 'ember';
import { inject as service } from '@ember/service';

export default class DRFTokenAuthorizer extends Base {
    @service session;

    authorize(sessionData, block) {
        if (this.get('session').isAuthenticated && !Ember.isEmpty(sessionData.token)) {
            block('Authorization', 'Token ' + sessionData.token);
        }
    }
}
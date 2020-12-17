import JSONAPIAdapter from '@ember-data/adapter/json-api';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import { computed } from '@ember/object';
import { pluralize } from 'ember-inflector';
import { capitalize } from '@ember/string';
import { inject as service } from '@ember/service';
import ApplicationAdapter from 'geronimo/adapters/application';
import ENV from 'geronimo/config/environment';

export default class UserAdapter extends ApplicationAdapter {
    @service session;
    /*
    @computed
    get host() {
        return ENV.host;
    }

    @computed('session.data.authenticated.token')
    get headers() {
        let headers = {
            'Content-Type': 'application/vnd.api+json',
            'Accept': 'application/vnd.api+json'
        };
        console.log(this.session);
        if (this.session.isAuthenticated) {
          headers['Authorization'] = `Token ${this.session.data.authenticated.token}`;
        }
    
        return headers;
      }
      */
    
    namespace = "api";

    pathForType(modelName) {
        return pluralize(modelName) + '/register';
    }
}

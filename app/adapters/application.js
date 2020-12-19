import JSONAPIAdapter from '@ember-data/adapter/json-api';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import TokenAdapterMixin from 'ember-simple-auth-token/mixins/token-adapter';
import { computed } from '@ember/object';
import { pluralize } from 'ember-inflector';
import { inject as service } from '@ember/service';
import ENV from 'geronimo/config/environment';

export default class ApplicationAdapter extends JSONAPIAdapter.extend(TokenAdapterMixin) {
    @service session;

    @computed
    get host() {
        return ENV.host;
    }

    /*
    @computed('session.data.authenticated.token')
    get headers() {
        let headers = {
            'Content-Type': 'application/vnd.api+json',
            'Accept': 'application/vnd.api+json'
        };
        if (this.session.isAuthenticated) {
          headers['Authorization'] = `Token ${this.session.data.authenticated.token}`;
        }
    
        return headers;
      }
    */
    
    namespace = "api";
}

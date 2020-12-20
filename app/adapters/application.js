import JSONAPIAdapter from '@ember-data/adapter/json-api';
import TokenAdapterMixin from 'ember-simple-auth-token/mixins/token-adapter';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import ENV from 'geronimo/config/environment';

export default class ApplicationAdapter extends JSONAPIAdapter.extend(TokenAdapterMixin) {
    @service session;

    @computed
    get host() {
        return ENV.host;
    }
   
    namespace = "api";

}

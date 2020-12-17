import JSONAPIAdapter from '@ember-data/adapter/json-api';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import { computed } from '@ember/object';
import { pluralize } from 'ember-inflector';
import { capitalize } from '@ember/string';
import { inject as service } from '@ember/service';
import ApplicationAdapter from './application';
import ENV from 'geronimo/config/environment';

export default class UserAdapter extends ApplicationAdapter {
    @service session;

    pathForType(modelName) {
        return pluralize(modelName) + '/register';
    }
}

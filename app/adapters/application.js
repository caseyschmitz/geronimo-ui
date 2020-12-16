import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { computed } from '@ember/object';
import { pluralize } from 'ember-inflector';

export default class ApplicationAdapter extends JSONAPIAdapter {
    @computed
    get host() {
        return 'http://192.168.0.154:8888';
    }
    pathForType(modelName) {
        return pluralize(modelName) + '/';
    }
    namespace = "api";
    headers = {
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
    }
}

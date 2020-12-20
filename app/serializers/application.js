import JSONAPISerializer from '@ember-data/serializer/json-api';
import { classify, underscore, dasherize } from '@ember/string';

export default class ApplicationSerializer extends JSONAPISerializer {
    // take field names as returned from api, rather than with dashes
    keyForAttribute(key) {
        return key;
    }

    // change how the 'type' payload field is set
    // this changes something like speed-tests to SpeedTests, which is what the backend expects
    serialize(snapshot, options) {
        let json = super.serialize(...arguments);

        json.data.type = classify(json.data.type);
        return json;
    }

    /*
      payloadKeyFromModelName(modelName) {
        console.log('model: ' + modelName);
        if (modelName === 'speed-test-client') {
          return 'SpeedTestClients';
        } else if (modelName === 'user') {
            return 'Users';
        } else {
          return super.payloadKeyFromModelName(modelName);
        }
      }
      */
}

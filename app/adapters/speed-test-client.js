import ApplicationAdapter from './application';
import { inject as service } from '@ember/service';

export default class SpeedTestClientAdapter extends ApplicationAdapter {
    @service session;
}

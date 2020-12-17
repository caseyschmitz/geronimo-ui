import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class SpeedTestRoute extends Route {
    @service store;
    model() {
        this.store.findAll('speed-test');
    }
}

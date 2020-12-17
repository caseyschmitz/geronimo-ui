import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { computed } from '@ember/object';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SpeedTestClientContainerComponent extends Component {
    @tracked selectedClient = null;
    @service store;

    @computed
    get clientData() {
        console.log('clientData: ' + this.args.data);
        return this.args.data;
    }

    @computed
    get selectedClient() {
        return this.selectedClient;
    }

    @action
    detailToggled(client) {
        console.log(client);
        console.log('detail toggled for client ' + client.id);
        this.selectedClient = this.store.peekRecord('speed-test-client', client.id);
        console.log(this.selectedClient);
    }
}

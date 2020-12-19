import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class SpeedTestContainerComponent extends Component {
    @service session;
    @service store;

    @tracked selectedUser;
    
    @tracked users = this.store.findAll('user');
}

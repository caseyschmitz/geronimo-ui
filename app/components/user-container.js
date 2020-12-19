import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { computed } from '@ember/object';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class UserContainerComponent extends Component {
    @service session;
    @tracked errorMessage;
    @tracked selectedClient = null;
    @tracked showDialog;

    @computed
    get userData() {
        return this.args.data;
    }

    @action
    closeDialog(arg) {
        console.log('closing dialog with ' + arg);
        this.showDialog = !this.showDialog;
    }

    @action
    detailToggled(user) {
        console.log(user);
        console.log('detail toggled for user ' + user.id);
        this.selectedUser = this.store.peekRecord('user', user.id);
        console.log(this.selectedUser);
    }

    @action
    bulkAction(type) {
        var selected = this.userData.filter((user) => {
            return user.selected;
        })

        if (type == "delete") {
            selected.forEach(record => {
                record.deleteRecord();
                record.save();
            });
        }

        // other types: change_owner, activate/deactivate, etc
    }
}

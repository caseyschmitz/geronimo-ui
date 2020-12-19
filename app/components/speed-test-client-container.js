import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { computed } from '@ember/object';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SpeedTestClientContainerComponent extends Component {
    @service store;
    
    @tracked errorMessage;
    @tracked selectedClient = null;
    @tracked showDialog;

    @tracked client_id;
    @tracked name;
    @tracked uri;
    @tracked active;

    @computed
    get clientData() {
        return this.args.data;
    }

    @computed
    get selectedClient() {
        return this.selectedClient;
    }

    @action
    bulkAction(type) {
        var selected = this.clientData.filter((client) => {
            return client.selected;
        })

        if (type == "delete") {
            selected.forEach(record => {
                record.deleteRecord();
                record.save();
            });
        }

        // other types: change_owner, activate/deactivate, etc
    }

    @action
    submitSpeedTestClient(data) {
        this.store.createRecord('speed-test-client', {
            name: this.name,
            uri: this.uri,
            active: this.active
        }).save().then(() => {
            this.name = null;
            this.uri = null;
            this.active = false;
        this.toggleDialog('submitted');
        }, reason => {
            this.errorMessage = reason.errors[0].detail;
        });
    }

    @action
    updateSpeedTestClient(client) {
        if (this.client_id) {
            console.log('should be updating');
        }
        // need to check for error before saving
        this.store.findRecord('speed-test-client', {
            name: this.name,
            uri: this.uri,
            active: this.active
        }).save().then(() => {
            this.name = null;
            this.uri = null;
            this.active = false;
        this.toggleDialog('submitted');
        }, reason => {
            this.errorMessage = reason.errors[0].detail;
        });
    }

    @action
    closeToast() {
        this.errorMessage = null;
    }

    @action
    toggleDialog(arg) {
        console.log('toggling dialog with ' + arg);
        if (arg != "edit") { 
            this.clientId = null;
            this.name = null;
            this.uri = null;
            this.active = null;
        }
        this.showDialog = !this.showDialog;
    }

    @action
    editDialog(client) {
        console.log(client);
        this.name = client.name;
        this.uri = client.uri;
        this.active = client.active;
        this.client_id = client.id;
        this.toggleDialog('edit');
    }

    @action
    detailToggled(client) {
        console.log(client);
        console.log('detail toggled for client ' + client.id);
        this.selectedClient = this.store.peekRecord('speed-test-client', client.id);
        console.log(this.selectedClient);
    }

    NameValidation = [{
        message: "Please enter valid URL.",
        validate: (input) => {
            return (input.length > 3 && input.length <= 128);
        }
    }]

    URLValidation = [{
        message: "Please enter valid URL.",
        validate: (input) => {
            let urlpattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
            return urlpattern.test(input);
        }
    }]
}

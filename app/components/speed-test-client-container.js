import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { computed } from '@ember/object';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SpeedTestClientContainerComponent extends Component {
    @service store;
    
    @tracked errorMessage;
    @tracked showForm;

    @tracked client_id;
    /*
    @tracked name;
    @tracked uri;
    @tracked active;
    */
    @tracked formData = {};

    @computed
    get clientData() {
        return this.args.data;
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
        // same handler for POST and PATCH
        if (this.client_id) {
            console.log('should be updating');
            console.log(this.client_id);
            this.updateSpeedTestClient();
        } else {
            this.store.createRecord('speed-test-client', this.formData).save().then(
                (client) => {
                   // consider creating a toast
                   this.formData = {};
            this.toggleForm('submitted');
            }, reason => {
                this.errorMessage = reason.errors[0].detail;
            });
        }
    }

    updateSpeedTestClient() {
        // PATCH handler
        if (this.client_id) {
            console.log('updating ' + this.client_id);
        }
        this.store.findRecord('speed-test-client', this.client_id).then(
            (client) => {
                client.name = this.formData.name;
                client.uri = this.formData.uri;
                client.active = this.formData.active;
                client.save().then(
                    () => {
                        // consider creating a toast
                        this.client_id = null;
                        this.formData = {};
                        this.toggleForm('submitted');
                    }, reason => {
                        this.errorMessage = reason.errors[0].detail;
                    }
                );
            }, reason => {
                this.errorMessage = reason.errors[0].detail;
            }
        );
    }

    @action
    toggleForm(arg) {
        console.log('toggling dialog with ' + arg);
        if (arg != "edit") { 
            this.client_id = null;
            this.formData = {};
        }
        this.showForm = !this.showForm;
    }

    @action
    editDialog(client) {
        console.log(client);
        
        this.client_id = client.id;
        this.formData.name = client.name;
        this.formData.uri = client.uri;
        this.formData.active = client.active;
        this.toggleForm('edit');
    }

    @action
    closeToast() {
        this.errorMessage = null;
    }

    NameValidation = [{
        message: "Please enter valid Name.",
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

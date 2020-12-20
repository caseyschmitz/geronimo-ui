import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SpeedTestContainerComponent extends Component {
    @service store;
    
    @tracked errorMessage;
    @tracked showForm = false;

    @tracked test_id;
    @tracked formData = {};

    @computed
    get speedtestclient() {
        return this.store.findAll('speed-test-client');
    }

    @computed
    get user() {
        return this.store.findAll('user');
    }

    @computed
    get testData() {
        return this.args.data;
    }

    @action
    bulkAction(type) {
        var selected = this.testData.filter((test) => {
            return test.selected;
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
    submitForm(data) {
        // same handler for POST and PATCH
        if (this.test_id) {
            console.log('should be updating');
            console.log(this.test_id);
            this.updateForm();
        } else {
            this.store.createRecord('speed-test', this.formData).save().then(
                (test) => {
                   // consider creating a toast
                   this.formData = {};
            this.toggleForm('submitted');
            }, reason => {
                this.errorMessage = reason.errors[0].detail;
            });
        }
    }

    updateForm() {
        // PATCH handler
        if (this.test_id) {
            console.log('updating ' + this.test_id);
        }
        this.store.findRecord('speed-test', this.test_id).then(
            (test) => {
                test = this.formData;
                test.save().then(
                    () => {
                        // consider creating a toast
                        this.test_id = null;
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
            this.test_id = null;
            this.formData = {};
        }
        this.showForm = !this.showForm;
    }

    @action
    editForm(test) {
        console.log(test);
        console.log(test.id);
        this.test_id = test.id;
        this.formData = test;
        this.toggleForm('edit');
    }

    @action
    closeToast() {
        this.errorMessage = null;
    }
}

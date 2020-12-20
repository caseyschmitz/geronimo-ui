import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { computed } from '@ember/object';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class UserContainerComponent extends Component {
    @service session;
    @service store;
    @service router;

    @tracked errorMessage;
    @tracked selecteduser = null;
    @tracked user_id;
    @tracked formData = {};
    @tracked showForm;

    @computed
    get userData() {
        return this.args.data;
    }

    @action
    toggleDialog(arg) {
        console.log('toggling dialog with ' + arg);
        this.showForm = !this.showForm;
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

    @action
    submitForm(data) {
        // same handler for POST and PATCH
        if (this.user_id) {
            console.log('should be updating');
            console.log(this.user_id);
            this.updateForm();
        } else {
            this.store.createRecord('user', this.formData).save().then(
                (user) => {
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
        if (this.user_id) {
            console.log('updating ' + this.user_id);
        }
        this.store.findRecord('user', this.user_id).then(
            (user) => {
                user = this.formData;
                user.save().then(
                    () => {
                        // consider creating a toast
                        this.user_id = null;
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
            this.user_id = null;
            this.formData = {};
        }
        this.showForm = !this.showForm;
    }

    @action
    editForm(user) {
        console.log(user);
        console.log(user.id);
        this.user_id = user.id;
        this.formData = user;
        this.toggleForm('edit');
    }

    @action
    closeToast() {
        this.errorMessage = null;
    }

    UserNameValidation = [{
        message: "Please enter valid User Name. (alphanum, _, @, +, and -)",
        validate: (input) => {
            let usernamepattern = /^[a-zA-Z0-9\_\@\+\-]{3,150}$/;
            return usernamepattern.test(input);
        }
    }]

    PasswordMatchValidation = [{
        message: "Passwords do not match.",
        validate: (input) => {
            return this.formData.password == input;
        }
    }]


}

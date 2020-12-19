import Model, { attr, hasMany } from '@ember-data/model';
import { computed } from '@ember/object';

export default class UserModel extends Model {
    @attr('string') username;
    @attr('string') first_name;
    @attr('string') last_name;
    @attr('string') email;
    @attr('string') password;
    @hasMany('group', {async: false}) groups;
    @attr('string') user_permissions;
    @attr('boolean') is_staff;
    @attr('boolean') is_active;
    @attr('boolean') is_superuser;
    @attr('date') last_login;
    @attr('date') date_joined;

    /*
    @computed
    get isAdmin() {
        console.log('isAdmin...');
        console.log(this.groups);
        return this.groups.has('API Superuser');
    }
    */
}

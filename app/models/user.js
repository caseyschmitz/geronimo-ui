import Model, { attr } from '@ember-data/model';

export default class UserModel extends Model {
    @attr('string') username;
    @attr('string') first_name;
    @attr('string') last_name;
    @attr('string') email;
    @attr('string') password;
    @attr('string') groups;
    @attr('string') user_permissions;
    @attr('boolean') is_staff;
    @attr('boolean') is_active;
    @attr('boolean') is_superuser;
    @attr('date') last_login;
    @attr('date') date_joined;
}

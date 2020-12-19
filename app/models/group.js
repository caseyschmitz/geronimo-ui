import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

class PermissionModel extends Model {
    @attr('string') name;
    @attr('string') content_type;
    @attr('string') codename;
}

export default class GroupModel extends Model {
    @attr('string') name;
    @hasMany('permission') permissions;
}

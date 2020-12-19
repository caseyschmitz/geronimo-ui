import Model, { attr, belongsTo } from '@ember-data/model';

export default class SpeedTestClientModel extends Model {
    @attr('string') name;
    @attr('string') uri;
    @attr('string') url;
    @belongsTo('user') owner;
    @attr('boolean') active;
}

import Model, { attr, belongsTo } from '@ember-data/model';

export default class SpeedTestClientModel extends Model {
    @attr('string') name;
    @attr('string') uri;
    @belongsTo('user') owner;
    @attr('boolean') active;
}

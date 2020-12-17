import Model, { attr } from '@ember-data/model';

export default class SpeedTestClientModel extends Model {
    @attr('string') name;
    @attr('string') uri;
    @attr('string') url;
    @attr('string') owner;
    @attr('boolean') active;
}

import Model, { attr, belongsTo } from '@ember-data/model';

export default class SpeedTestModel extends Model {
    @attr('number') type;
    @belongsTo('user') owner;
    @belongsTo('speed-test-client') client;
    @attr('date') created;
    @attr('date') modified;
    @attr('date') scheduled;
    @attr('date') started;
    @attr('date') completed;
    @belongsTo('speed-test-result') result;
}

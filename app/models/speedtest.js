import Model, { attr } from '@ember-data/model';

export default class SpeedtestModel extends Model {
    @attr('number') type;
    @attr('string') owner;
    @attr('string') client;
    @attr('date') created;
    @attr('date') modified;
    @attr('date') scheduled;
    @attr('date') started;
    @attr('date') completed;
    @attr('string') result;
}

import Model, { attr, belongsTo } from '@ember-data/model';

export default class SpeedTestResultModel extends Model {
    @attr('date') timestamp;
    @belongsTo('speed-test-server') server;
    @attr('number') ping;
    @attr('number') bytes_received;
    @attr('number') bytes_sent;
    @attr('number') download_bytes;
    @attr('number') upload_bytes;
    @attr('string') image_url;
}

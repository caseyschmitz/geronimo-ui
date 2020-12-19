import Model, { attr, belongsTo } from '@ember-data/model';

export default class SpeedTestServerModel extends Model {
    @attr('string') host;
    @attr('number') server_id;
    @attr('string') name;
    @attr('string') sponsor;
    @attr('string') country;
    @attr('string') country_code;
    @attr('number') distance_km;
    @attr('number') latitude;
    @attr('number') longitude;
}

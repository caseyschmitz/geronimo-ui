import Model, { attr } from '@ember-data/model';

export default class TestNodeModel extends Model {
    @attr('string') name;
    @attr('string') uri;
    @attr('string') url;
    @attr('boolean') active;
}

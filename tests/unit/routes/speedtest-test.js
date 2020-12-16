import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | speedtest', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:speedtest');
    assert.ok(route);
  });
});

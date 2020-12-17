import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | speed-test', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:speed-test');
    assert.ok(route);
  });
});

import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Adapter | speed test client', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let adapter = this.owner.lookup('adapter:speed-test-client');
    assert.ok(adapter);
  });
});

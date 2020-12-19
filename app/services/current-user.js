import Service from '@ember/service';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class CurrentUserService extends Service {
  @service session;
  @service store;

  /*
  async load() {
    if (this.session.isAuthenticated) {
      let user = await this.store.queryRecord('user', { me: true });
      this.set('user', user);
    }
  }
  */
  
  async load() {
    let userId = this.session.data.authenticated.user_id;
    if (userId) {
      let user = await this.store.findRecord('user', userId);
      console.log(user);
      this.set('user', user);
    } else {
        return resolve();
    }
  }
};
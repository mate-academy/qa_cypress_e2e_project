import { PageObject } from './PageObject';

export class FollowPage extends PageObject {
  visitProfile(username) {
    super.visit(`/profile/${username}`);
  }

  follow() {
    this.getByQa('follow-button').click();
  }

  unfollow() {
    this.getByQa('unfollow-button').click();
  }
}

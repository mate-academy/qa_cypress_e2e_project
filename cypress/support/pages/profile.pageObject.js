import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  visitUser(username) {
    this.visit(`/#/@${username}`);
  }

  get followBtn() {
    return this.getByQa('profile-follow');
  }

  get unfollowBtn() {
    return this.getByQa('profile-unfollow');
  }

  follow() {
    this.followBtn.click();
  }

  unfollow() {
    this.unfollowBtn.click();
  }

  assertFollowing() {
    this.unfollowBtn.should('be.visible');
  }

  assertNotFollowing() {
    this.followBtn.should('be.visible');
  }
}

export default ProfilePageObject;

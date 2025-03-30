import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  get followUnfollowBtn() {
    return cy.get('.col-xs-12 > div > .btn');
  }

  clickFollowBtn() {
    this.followUnfollowBtn.contains('Follow').click();
  }

  clickUnfollowBtn() {
    this.followUnfollowBtn.contains('Unfollow').click();
  }
}

export default UserPageObject;

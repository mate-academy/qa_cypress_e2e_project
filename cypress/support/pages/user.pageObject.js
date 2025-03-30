import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = '/#/editor';

  get followBtn () {
    return cy.getByDataCy('follow-user');
  }

  get unFollowBtn () {
    return cy.getByDataCy('unfollow-user');
  }

  clickFollowBtn() {
    this.followBtn.click();
  }

  assertFollowUser() {
    this.followBtn.should('not.disabled');
  }
}

export default UserPageObject;

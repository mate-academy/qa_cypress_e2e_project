import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  get followBtn() {
    return cy.getByDataCy('follow-btn');
  }

  get unFollowBtn() {
    return cy.getByDataCy('un-follow-btn');
  }

  clickFollowBtn() {
    this.followBtn.click();
  }

  clickUnFollowBtn() {
    this.unFollowBtn.click();
  }
}

export default UserPageObject;
import PageObject from '../PageObject';

class UsersProfilePageObject extends PageObject {
  get followButton() {
    return cy.getByDataQa('follow-button');
  }

  get clickOnFollowBtn() {
    return this.followButton.click();
  }

  get clickOnUnfollowBtn() {
    return this.followButton.click();
  }

  visitUsersProfile(username) {
    return cy.visit(`/#/@${username}`);
  }
}

export default UsersProfilePageObject;

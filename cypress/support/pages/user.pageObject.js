import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get followButton() {
    return cy.getByDataQa('user-follow');
  }

  get unfollowButton() {
    return cy.getByDataQa('user-unfollow');
  }

  clickFollow() {
    this.followButton.click();
  }

  clickUnfollow() {
    this.unfollowButton.click();
  }
}

export default HomePageObject;

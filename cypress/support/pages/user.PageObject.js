import PageObject from "../PageObject";

class UserPageObject extends PageObject {

  url = '/#/';

  get followBtn () {
    return cy.getByDataCy('follow-user-btn');
  }

  get unfollowBtn () {
    return cy.getByDataCy('unfollow-user-btn');
  }

  get articlesContentContainer () {
    return cy.getByDataCy('articles-content');
  }

  accertFollowerUser () {
    this.followBtn.should('contain', 'Unfollow');
  }

  accertUnfollowerUser () {
    this.unfollowBtn.should('contain', 'Follow');
  }

  clickFollowBtn () {
    this.followBtn.click();
  }

  clickUnfollowBtn () {
    this.unfollowBtn.click();
  }

  visit (username) {
    cy.visit(`/#/@${username}`);
  }

}

export default UserPageObject;
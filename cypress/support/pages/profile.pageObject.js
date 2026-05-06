import PageObject from "../PageObject";

export default class ProfilePageObject extends PageObject {
  visit(username) {
    cy.visit(`/#/@${username}`);
  }

  get followBtn() {
    return cy.getByDataCy("follow-btn");
  }

  get unfollowBtn() {
    return cy.getByDataCy("unfollow-btn");
  }

  clickFollowBtn() {
    this.followBtn.click();
  }

  clickUnfollowBtn() {
    this.unfollowBtn.click();
  }
}

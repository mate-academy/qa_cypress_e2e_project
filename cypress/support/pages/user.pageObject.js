import PageObject from "../PageObject";

class UserPageObject extends PageObject {
  url = "/#/";

  assertFollowBtnExist() {
    this.followBtn.should("include", "Follow");
  }

  get followBtn() {
    return cy.getByDataQa("follow-btn");
  }
  clickFollowBtn() {
    this.followBtn.eq(0).click();
  }

  get updateBio() {
    return cy.getByDataQa("profile-banner");
  }

  get unfollowBtn() {
    return cy.getByDataQa("follow-btn");
  }
  clickUnfollowBtn() {
    this.unfollowBtn.eq(0).click();
  }
}

export default UserPageObject;

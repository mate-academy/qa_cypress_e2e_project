import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  url = '/@:username';

  get username() {
    return cy.getByDataCy('profile-username');
  }

  get bio() {
    return cy.getByDataCy('profile-bio');
  }

  get followBtn() {
    return cy.getByDataCy('profile-follow-btn');
  }

  get unfollowBtn() {
    return cy.getByDataCy('profile-unfollow-btn');
  }

  clickFollowBtn() {
    this.followBtn
      .click();
  }

  clickUnfollowBtn() {
    this.unfollowBtn
      .click();
  }

  assertH4ContainContent(field, expectedText) {
    return this[field].should('contain', expectedText);
  }

  asserBtnExist(btn) {
    return this[btn].should('be.visible');
  }
}

export default ProfilePageObject;

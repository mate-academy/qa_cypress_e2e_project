import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  get profileInfo() {
    return cy.getByDataCy('profileInfo');
  }

  assertProfileBio(bio) {
    this.profileInfo.should('contain', bio);
  }
  get unFollowBtn() {
    return cy.getByDataCy('unFollowBtn').eq(0);;
  }
  clickunFollowBtn() {
    this.unFollowBtn
      .click();
  }
  get followBtn() {
    return cy.getByDataCy('followBtn').eq(0);;
  }
  clickfollowBtn() {
    this.followBtn
      .click();
  }
}

export default ProfilePageObject;

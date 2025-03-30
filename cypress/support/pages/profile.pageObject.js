import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  url = '/#/';

  assertFollowBtnExist() {
    this.followBtn.should('contain', 'Follow');
  }

  get followBtn() {
    return cy.get('.btn-outline-secondary');
  }

  clickFollowBtn() {
    this.followBtn.eq(0).click();
  }

  get updateBio() {
    return cy.getByDataQa('profile-banner');
  }

  get unfollowBtn() {
    return cy.get('.btn-outline-secondary');
  }

  clickUnfollowBtn() {
    this.unfollowBtn.eq(0).click();
  }

  get clickableTitle() {
    return cy.getByDataQa('preview-title');
  }

  clickClickableTitle() {
    this.clickableTitle.click();
  }
}

export default ProfilePageObject;

import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  url = '/#/';

  get profileInfoContainer() {
    return cy.getByDataQa('profile-info');
  }

  assertProfileInfo(bio) {
    this.profileInfoContainer
      .should('contain', bio);
  }

  get followBtn() {
    return cy.getByDataQa('follow-btn').eq(0);
  }

  clickFollowBtn() {
    this.followBtn.click();
  }

  assertFollowBtnExist() {
    this.followBtn
      .should('contain', 'Unfollow');
  }
}

export default ProfilePageObject;
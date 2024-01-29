import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  get followBtn() {
    return cy.getByDataCy('follow-user-btn');
  }

  clickOnFollowBtn() {
    this.followBtn.click();
  }

  assertFollowBtn() {
    this.followBtn.should('contain', 'Follow')
  }

  assertUnfollowBtn() {
    this.followBtn.should('contain', 'Unfollow')
  }
}

  
export default ProfilePageObject;
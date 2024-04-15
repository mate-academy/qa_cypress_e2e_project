import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  visit(username) {
    cy.visit(`#/@${username}`);
  }

  get bioField() {
    return cy.getByDataCy('username-link');
  }

  get followBtn() {
    return cy.getByDataCy('follow-button-profile');
  }

  // commands to asserts
  assertBioField(bio) {
    this.bioField.should('contain', bio);
  }

  assertFollowBth() {
    this.followBtn.should('include.text', 'Unfollow');
  }

  // commands to click on buttons
  clickFollowBtn() {
    this.followBtn.click();
  }
}

export default ProfilePageObject;

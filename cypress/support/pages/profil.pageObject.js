import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  get userInfo() {
    return cy.getByDataQa('user-profile-info');
  }

  visitProfilePage(username) {
    cy.visit(`#/@${username}`);
  }

  assertBio(bio) {
    this.userInfo
      .should('contain', bio);
  }
}
export default ProfilePageObject;

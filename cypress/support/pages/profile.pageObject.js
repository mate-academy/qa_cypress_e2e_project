import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  get profileBio() {
    return cy.getByDataCy('bio');
  }

  get followBtn() {
    return cy.getByDataCy('follow-btn');
  }

  clickFollow() {
    this.followBtn.click();
  }

  assertFollow() {
    this.followBtn.should('contain', 'Unfollow');
  }

  assertBio(bio) {
    this.profileBio
      .should('contain', bio);
  }

  login(email, username, password) {
    cy.login(email, username, password);
  }

  register(email, username, password) {
    cy.login(email, username, password);
  }
}

export default ProfilePageObject;

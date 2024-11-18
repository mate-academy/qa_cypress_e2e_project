import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  get bioLink() {
    return cy.getByDataCy('bio-ProfilePage');
  }

  assertBioContainNewBio(username) {
    this.bioLink
      .should('contain', username);
  }
}

export default ProfilePageObject;

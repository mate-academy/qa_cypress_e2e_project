import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  get bio() {
    return cy.getByDataCy('bio-profile');
  }

  assertContainBio(text) {
    this.bio
      .should('contain', text);
  }
}

export default ProfilePageObject;

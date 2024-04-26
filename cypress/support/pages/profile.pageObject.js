import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  get bio() {
    return cy.get('p');
  }

  assertBio(text) {
    this.bio
      .should('contain', text);
  }
}

export default ProfilePageObject;

import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  assertProfileBio(newBio) {
    cy.getByDataQa('profile-info')
      .should('contain', newBio);
  }
}

export default ProfilePageObject;

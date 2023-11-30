import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  assertProfileBio(newBio) {
    cy.getByDataCy('profile-info')
      .should('contain', newBio);
  }
}


export default ProfilePageObject;
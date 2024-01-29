import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  get profileInfo() {
    return cy.getByDataQa('profile-info');
  }

  assertProfileBio(bio) {
    this.profileInfo.should('contain', bio);
  }
}

export default ProfilePageObject;

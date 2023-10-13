import PageObject from "../PageObject";


class ProfilePageObject extends PageObject {
  
  get bioParagraph () {
    return cy.getByDataCy('profile-bio');
  }

  get usernameParagraph () {
    return cy.getByDataCy('profile-username');
  }

  accertNewBio (bio) {
    this.bioParagraph.should('contain', bio);
  }

  accertUsername (username) {
    this.usernameParagraph.should('contain', username);
  }
}

export default ProfilePageObject;
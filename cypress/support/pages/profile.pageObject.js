import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  get articleDescription() {
    return cy.getByDataQa('profile-page-article-description'); 
  }

  get profileBio() {
    return cy.getByDataQa('profile-page-bio');
  }

  checkArticleDescription(description) {
    return this.articleDescription.should('contain.text', description);
  }

  checkProfileBio(bio) {
    return this.profileBio.should('contain.text', bio);
  }
}

export default ProfilePageObject;

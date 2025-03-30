import PageObject from '../PageObject';

class UserProfilePageObject extends PageObject {
  get previewArticleTitle() {
    return cy.getByDataCy('previewArticleTitle');
  }

  assertArticleDeletedByTitle(title) {
    this.previewArticleTitle.should('not.contain.text', title);
  }
}

export default UserProfilePageObject;

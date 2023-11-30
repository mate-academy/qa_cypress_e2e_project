import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  get emptyArticlesField() {
    return cy.get('.article-preview');
  }

  assertEmptyArticlesField() {
    this.emptyArticlesField
      .should('contain', 'No articles');
  }

  assertBio(bio) {
    cy.getByDataQa('user-profile').should('contain', bio);
  }

  assertHeaderContainUsername(username) {
    cy.getByDataQa('user-profile').should('contain', username);
  }
}

export default ProfilePageObject;

import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  get Username() {
    return cy.get('h4');
  }

  get myArticlesToggle() {
    return cy.get('.articles-toggle > .nav > :nth-child(1) > .nav-link');
  }

  get favoritedArticlesToggle() {
    return cy.get('.articles-toggle > .nav > :nth-child(2) > .nav-link');
  }

  get previewArticles() {
    return cy.get('.article-preview');
  }

  get editProfileSettingsBtn() {
    return cy.get('.btn');
  }

  assertUsername(username) {
    this.Username
      .should('contain', username);
  }

  assertPreviewArticles(title) {
    this.previewArticles
      .should('not.contain', title);
  }
}

export default UserPageObject;

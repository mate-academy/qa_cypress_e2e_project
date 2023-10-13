import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }
  get modalWindow() {
    return cy.get('.swal-modal');
  }

  get navbar() {
    return cy.get('.navbar');
  }

  get articlePreview() {
    return cy.get('.article-preview');
  }

  checkArticlesList() {
    cy.get('.article-preview').should('contain', 'No articles are here... yet.');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }
}

export default HomePageObject;

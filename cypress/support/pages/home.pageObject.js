import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

  get modalWindow() {
    return cy.get('.swal-modal');
  }
  get navbar() {
    return cy.get('.swal-modal');
  }
  get articlePreview() {
    return cy.get('.article-preview');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }
  checkArticlesList() {
    cy.get('.article-preview').should('contain', 'No articles');
}
}

export default HomePageObject;

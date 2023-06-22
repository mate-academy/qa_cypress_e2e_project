import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  loggedUser(email, password) {
    cy.login(email, password);
  }

  assertUsernameLink(username) {
    cy.getByDataCy('username-link')
      .should('contain', username);
  }

  assertNoArticleTitle() {
    cy.getByDataCy('article-title').should('not.exist');
  }
  
}

export default HomePageObject;

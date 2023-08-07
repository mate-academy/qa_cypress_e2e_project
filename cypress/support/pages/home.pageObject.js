import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  assertUsernameLink(username) {
    cy.get('a')
      .should('contain', username);
  }

  registeredUser() {
    cy.login();
  }

  assertHomePageUrl() {
    cy.url()
      .should('eq', 'http://localhost:1667/#/');
  }

  clearDatabase() {
    cy.task('db:clear');
  }
};

export default HomePageObject;

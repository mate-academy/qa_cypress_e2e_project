import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  cheackArticlesList() {
    cy.get('.article-preview')
      .should('contain', 'No articles');
  }

  checkRegistration() {
    cy.get('.swal-text')
      .should('contain', 'Your registration was successful!');
  }

  clickOnOkBtn() {
    cy.get('.swal-button')
      .click();
  }

  get navMenu() {
    return cy.get('.navbar-light');
  }

  assertLogOUtHomePage() {
    cy.getByDataCy('navbar-links-logout')
      .should('contain', 'Home')
      .and('contain', 'Sign in')
      .and('contain', 'Sign up');
  }
}

export default HomePageObject;

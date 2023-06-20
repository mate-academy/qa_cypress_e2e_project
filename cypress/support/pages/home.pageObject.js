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
}

export default HomePageObject;

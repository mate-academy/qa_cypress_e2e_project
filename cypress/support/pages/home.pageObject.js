import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

 assertHomePageUrl(){
    cy.url().should('include', '/#/');
  }
}

export default HomePageObject;

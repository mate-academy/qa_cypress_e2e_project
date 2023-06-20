import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

  checkUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  checkHomeUrl(){
    cy.url().should('include', '/#/');
  }
}

export default HomePageObject;

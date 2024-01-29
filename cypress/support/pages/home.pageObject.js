import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  get header() {
    return cy.getByDataCy('header-of-page')
  }

  assertHeaderNotContainUsername(username) {
    this.header.should('not.contain', username);
  }
    
}

export default HomePageObject;

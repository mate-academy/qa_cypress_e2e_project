import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  assertHeaderContainUsername = (username) => {
    this.usernameLink.should('contain', username);
  };

  clickNewArticle() {
    cy.get('a.nav-link').contains('New Article').click();
  }

  clickSettings() {
    cy.get('a.nav-link').contains('Settings').click();
  }

  clickUsernameLink(username) {
    cy.getByDataCy('username-link').contains(username).click();
  }
}

export default HomePageObject;

import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

  get clickableUsername() {
    return cy.getByDataQa('clickable-username');
  }

  get followUser() {
    return cy.getByDataQaBtn('btn btn-sm btn-outline-secondary');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  clickOnUsername() {
    this.usernameLink
      .click();
  }

  assertHeaderNotContainUsername() {
    this.usernameLink
      .should('not.exist');
  }
}

export default HomePageObject;
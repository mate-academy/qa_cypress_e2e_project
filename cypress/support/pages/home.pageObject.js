import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.get('[data-qa="username-link"]');
  }

  get userContainer() {
    return cy.get('div[data-qa="user-info"]');
  }

  get header() {
   return cy.get('[data-qa="header-section"]');
  }

  get signInLink() {
    return cy.get('[data-qa="sign-in-link"]');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertHeaderNotContainUsername(username) {
    this.header
      .should('not.contain', username);
  }

  clickOnUsernameLink() {
    this.usernameLink
      .click();
  }

  clickOnSignInLink() {
    this.signInLink
      .click();
  }

  assertUpdatedBio(userBio) {
    this.userContainer
      .should('contain', userBio);
  }
  
}

export default HomePageObject;

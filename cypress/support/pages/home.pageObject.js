import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.get('[data-cy="username-link"]');
  };

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', `${username}`);
  }

  get signInBtn() {
    return cy.get('[data-qa="Sign-in-btn"]');
  }

  visitHomePage() {
    cy.visit('/#/');
  }

  clickSignInBtn() {
    this.signInBtn.click();
  }
}

export default HomePageObject;

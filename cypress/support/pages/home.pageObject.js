import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  get signInLink() {
    return cy.getByDataCy('sign-in-link');
  }

  get modalWelcome() {
    return cy.get('.swal-modal');
  }

  get confirmButton() {
    return cy.get('.swal-button--confirm');
  }

  clickUsernameLink() {
    this.usernameLink
      .click();
  }

  clickConfirmButton() {
    this.confirmButton
      .click();
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertModal() {
    this.modalWelcome
      .should('be.visible');
  }

  assertModalWellcome() {
    this.modalWelcome
      .should('contain', 'Welcome!');
  }

  assertModalRegistrarionSuccessful() {
    this.modalWelcome
      .should('contain', 'Your registration was successful!');
  }

  assertsignInLinkOnTheHome() {
    this.signInLink
      .should('contain', 'Sign in');
  }
}

export default HomePageObject;

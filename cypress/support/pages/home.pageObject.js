import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  get checkArticlePreview() {
    return cy.getByDataQa('articles-preview');
  }

  get alertWindow() {
    return cy.get('.swal-modal');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertArticles() {
    this.checkArticlePreview
      .should('contain', 'No articles');
  }

  successfulRegistration() {
    this.alertWindow
      .should('contain', 'Your registration was successful!');
  }

  alertUserNameEmpty() {
    this.alertWindow
      .should('contain', 'Username field required.');
  }

  alertEmailEmpty() {
    this.alertWindow
      .should('contain', 'Email field required.');
  }

  alertPasswordEmpty() {
    this.alertWindow
      .should('contain', 'Password field required.');
  }

  alertShortCred() {
    this.alertWindow
      .should('contain', 'Password must be 8 characters long and include 1 number, 1 uppercase letter, and 1 lowercase letter.');
  }

  alertInvalidEmail() {
    this.alertWindow
      .should('contain', 'Email must be a valid email.');
  }

  alertInvalidCred() {
    this.alertWindow
      .should('contain', 'Invalid user credentials.');
  }

  successfulUpdate() {
    this.alertWindow
      .should('contain', 'Update successful!');
  }

  checkLogOut() {
    this.checkArticlePreview
      .should('contain', 'No articles');
  }
}

export default HomePageObject;

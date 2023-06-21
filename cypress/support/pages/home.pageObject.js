import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataQA('username-link');
  }

  clickUsernameLink() {
    this.usernameLink
      .click();
  }

  checkSuccessfulLogin(username) {
    this.usernameLink
      .should('contain', username);
  }

  checkAfterArticleDelete() {
    cy.get('.article-preview')
      .should('contain', 'No articles are here... yet.');
  }

  checkRegistration() {
    cy.get('.swal-text')
      .should('contain', 'Your registration was successful!');
  }

  checkNewUsername(newUsername) {
    this.usernameLink
      .should('contain', newUsername);
  }
}

export default HomePageObject;

import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

  assertUsername(username) {
    this.usernameLink.should('contain', username);
  }

  get globalFeed() {
    return cy.getByDataQa('Global-Feed');
  }

  get NoArticleMessage() {
    return cy.getByDataQa('no-article');
  }

  assertAfterDeleteArticle() {
    this.globalFeed.should('contain', 'Global Feed');
    this.NoArticleMessage.should('contain', 'No articles are here... yet.');
  }

  assertLogOUtHomePage() {
    cy.getByDataCy('navbar-links-logout')
      .should('contain', 'Home')
      .and('contain', 'Sign in')
      .and('contain', 'Sign up');
  }

  get registrationSuccessModal() {
    return cy.get('.swal-modal');
  }

  assertRegistrationSuccessModal(message) {
    this.registrationSuccessModal.should('contain', message);
  }

  get successModalOkBtn() {
    return cy.contains('.swal-button', 'OK');
  }

  clickOnModalOkBtn() {
    this.successModalOkBtn.click();
  }
}

export default HomePageObject;

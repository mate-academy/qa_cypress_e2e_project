import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  assertHeaderContainSignUp() {
    cy.contains('.nav-link', 'Sign up').should('be.visible');
  }

  assertHeaderContainSignIn() {
    cy.contains('.nav-link', 'Sign in').should('be.visible');
  }

  assertWindowForSucsessSignUp(message) {
    cy.get('.swal-modal').should('contain', message);
  }

  clickOnOkBtnOnSignUpModal() {
    cy.contains('.swal-button', 'OK').click();
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertEditingDescription(title, description) {
    cy.contains('.preview-link', title).should('contain', description);
  }

  clickYourFeedLink() {
    cy.getByDataCy('your-feed-tab').click();
  }

  assertNoArticles(massage) {
    cy.get('.article-preview').should('contain', massage);
  }

  clickUserLink() {
    cy.getByDataCy('athor-of-article').click();
  }
}

export default HomePageObject;

import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  get signInLink() {
    return cy.getByDataCy('sign-in-link');
  }

  get articlePreview() {
    return cy.get('[data-cy="article-preview"]');
  }

  get myArticlesToggle() {
    return cy.getByDataCy('home-page-your-article-toggle');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertUserLogOut() {
    this.signInLink
      .should('contain', 'Sign in');
  }

  clickOnUsernameLink() {
    this.usernameLink
      .click();
  }

  clickOnArticlePreview() {
    this.articlePreview
      .click();
  }

  closeThePopUp() {
    cy.get('.swal-button').click();
  }

  clickOnToggle() {
    this.myArticlesToggle
      .click();
  }
}

export default HomePageObject;

import PageObject from '../PageObject';
class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

  get successfulAlert() {
    return cy.get('.swal-modal');
  }

  get BtnSuccessfulAlert() {
    return cy.contains('.swal-button', 'OK');
  }

  get navBar() {
    return cy.getByDataQa('navbar');
  }

  get articlePrewiew() {
    return cy.getByDataQa('article-preview-link');
  }

  get globalFeedSection() {
    return cy.getByDataQa('global-feed');
  }

  clickSuccessfulAlert() {
    this.BtnSuccessfulAlert.click();
  }

  clickProfileLink() {
    this.usernameLink.click();
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  assertHeaderWithoutUsername(username) {
    this.navBar
      .should('not.contain', username);
  }

  assertRegistrationSuccessful() {
    this.successfulAlert.should('contain', 'Your registration was successful!');
  }

  assertArticleComponentsExist(title, description, tag) {
    this.articlePrewiew
      .should('contain', title)
      .and('contain', description)
      .and('contain', tag);
  }

  assertArticleDeleted(title, description, tag) {
    this.globalFeedSection
      .should('not.contain', title)
      .and('not.contain', description)
      .and('not.contain', tag);
  }
}

export default HomePageObject;

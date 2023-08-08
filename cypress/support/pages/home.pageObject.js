/* eslint-disable */
import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  get signUpComplete() {
    return cy.get('.swal-button');
  }

  get yourFeed() {
    return cy.get('.feed-toggle > .nav > :nth-child(1) > .nav-link');
  }

  clickYourFeed() {
    this.yourFeed
      .click();
  }

  get authorLink() {
    return cy.get('.author');
  }

  clickAuthorLink() {
    this.authorLink
      .click();
  }

  clickSignUpCompleteBtn() {
    this.signUpComplete
      .click();
  }

  get newArticleLink() {
    return cy.get('.container > .nav > :nth-child(2) > .nav-link');
  }

  clickArticleLink() {
    this.newArticleLink
      .click();
  }

  get settingsLink() {
    return cy.get(':nth-child(3) > .nav-link');
  }

  clickSettingsLink() {
    this.settingsLink
      .click();
  }
}

export default HomePageObject;

import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.get(':nth-child(4) > .nav-link');
  }

  get logoOnHomePage() {
    return cy.get('h1');
  }

  get signInLink() {
    return cy.get(':nth-child(2) > .nav-link');
  }

  get newArticleLink() {
    return cy.get('.container > .nav > :nth-child(2) > .nav-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain.text', username);
  }

  assertHeaderContainH1Text(logoName) {
    this.logoOnHomePage
      .should('contain.text', logoName);
  }

  clickOnUsernameLinkInHeader() {
    this.usernameLink.click();
  }

  clickOnSignInLinkInHeader() {
    this.signInLink.click();
  }

  clickOnNewArticleLink() {
    this.newArticleLink
      .click();
  }
}

export default HomePageObject;

import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink.should('contain', username);
  }

  get articleBtn() {
    return cy.getByDataCy('article-btn');
  }

  clickNewArticleBtn() {
    this.articleBtn.click();
  }

  get signUpBtn() {
    return cy.getByDataCy('sign-up-btn');
  }

  get homeBtn() {
    return cy.getByDataCy('home-btn');
  }

  clickSignUpBtn() {
    this.signUpBtn.click();
  }

  get settingsBtn() {
    return cy.getByDataCy('settings-btn');
  }

  clickSettingsBtn() {
    this.settingsBtn.click();
  }

  clickHomeBtn() {
    this.homeBtn.click();
  }
}

export default HomePageObject;

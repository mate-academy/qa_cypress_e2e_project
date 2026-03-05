import PageObject from './PageObject.js';

class HeaderPage extends PageObject {
  clickHomeLogo() {
    this.getHomeLogoLink().click();
  }

  clickHomeLinkAnon() {
    this.getHomeLinkAnon().click();
  }

  clickHomeLinkAuth() {
    this.getHomeLinkAuth().click();
  }

  clickSignInLink() {
    this.getSignInLink().click();
  }

  clickSignUpLink() {
    this.getSignUpLink().click();
  }

  clickNewArticleLink() {
    this.getNewArticleLink().click();
  }

  clickSettingsLink() {
    this.getSettingsLink().click();
  }

  clickProfileLink() {
    this.getProfileLink().click();
  }

  shouldShowSignInLink() {
    this.getSignInLink().should('be.visible');
  }

  shouldShowNewArticleLink() {
    this.getNewArticleLink().should('be.visible');
  }

  shouldShowProfileLink() {
    this.getProfileLink().should('be.visible');
  }
}

export default new HeaderPage();

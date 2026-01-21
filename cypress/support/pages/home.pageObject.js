import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

  get newArticleBtn() {
    return cy.getByDataQa('new-article-btn');
  }

  get editProfileSettingsBtn() {
    return cy.getByDataQa('edit-profile-settings-btn');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  clickNewArticleBtn() {
    this.newArticleBtn.click();
  }

  clickEditProfileSettingsBtn() {
    this.editProfileSettingsBtn.click();
  }
}

export default HomePageObject;

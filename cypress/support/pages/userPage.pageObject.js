import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  url = `/#/@riot2`;

  get emailField() {
    return cy.getByDataCy('email-sign-in');
  }
  get passwordField() {
    return cy.getByDataCy('password-sign-in');
  }
  get clickSubmitButton() {
    return cy.getByDataCy('sign-in-btn');
  }
  get newArticleTitle() {
    return cy.getByDataCy('article-title-new-article');
  }
  get newArticleDescription() {
    return cy.getByDataCy('article-about-new-article');
  }
  get newArticleBody() {
    return cy.getByDataCy('article-body-new-article'); 
  }
  get newArticleTags(){
    return cy.getByDataCy('article-tag');
}
  get settingsLink() {
    return cy.getByDataCy('settings-link');
  }
  get logoutButton() {
    return cy.getByDataCy('settings-logout');
  }
  get followUnfollowButton() {
    return cy.getByDataCy('follow-unfollow-button')
  }
  get followedCounter() {
    return cy.getByDataCy('followed-users-counter')
  }
}

export default UserPageObject;
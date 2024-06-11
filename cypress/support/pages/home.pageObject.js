import PageObject from '../PageObject';
import generateData from '../generate/index';
import SignInPageObject from './signIn.pageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  signIn = new SignInPageObject();

  genData = generateData();

  get signInBtn() {
    return cy.getByDataCy('header-sign-in-btn');
  }

  get signUpBtn() {
    return cy.getByDataCy('header-sign-up-btn');
  }

  get newArticleBtn() {
    return cy.getByDataCy('header-new-article-btn');
  }

  get settingsBtn() {
    return cy.getByDataCy('header-settings-btn');
  }

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  signInBtnClick() {
    this.signInBtn.click();
  }

  signUpBtnClick() {
    this.signUpBtn.click();
  }

  newArticleBtnClick() {
    this.newArticleBtn.click();
  }

  settingsBtnClick() {
    this.settingsBtn.click();
  }

  assertHeaderContainUsername(username) {
    this.usernameLink.should('contain', username);
  }

  logInProcess() {
    cy.register(
      this.genData.user.email.default,
      this.genData.user.username,
      this.genData.user.password.passwordDefault
    );

    cy.window().then((win) => {
      const userFromLocal = JSON.parse(win.localStorage.getItem('user'));

      cy.visit(`/#/@${userFromLocal.username}/`);
    });
  }

  goToTheArticle() {
    cy.window().then((win) => {
      const articleFromLocal = JSON.parse(win.localStorage.getItem('article'));

      cy.visit(`/#/articles/${articleFromLocal.slug}`);
    });
  }

  urlAssertion(option) {
    if (option === 'edit article page') {
      cy.url().should('include', 'editor');
    }
  }
}

export default HomePageObject;

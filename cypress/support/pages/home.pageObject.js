import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get visitMainPage() {
    return cy.visit('http://localhost:1667/#/');
  }

  get visitSignInPage() {
    return cy.visit('http://localhost:1667/#/user/login');
  }

  get usernameLink() {
    return cy.getByDataCy('username-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink.should('contain', username);
  }

  assertHeaderNotContainUsername(username) {
    this.usernameLink.should('not.exist');
  }

  get clickSettingsLink() {
    return cy.getByDataCy('SettingsNavLink').click();
  }

  get clickSignInLink() {
    return cy.getByDataCy('SignInLink').click();
  }

  get clickSignUpLink() {
    return cy.getByDataCy('signUpLink').click();
  }

  loginUser(email, username, password) {
    return cy.login(email, username, password);
  }
}

export default HomePageObject;

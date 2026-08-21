import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return this.getByQa('username-link');
  }

  get signInLink() {
    return this.getByQa('nav-sign-in');
  }

  get signUpLink() {
    return this.getByQa('nav-sign-up');
  }

  get newArticleLink() {
    return this.getByQa('nav-new-article');
  }

  get settingsLink() {
    return this.getByQa('nav-settings');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink.should('contain', username);
  }

  assertLoggedOut() {
    this.signInLink.should('be.visible');
    this.signUpLink.should('be.visible');
    cy.get('[data-qa="username-link"]').should('not.exist');
  }
}

export default HomePageObject;

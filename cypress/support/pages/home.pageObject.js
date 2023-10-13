import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.get('[data-qa="username-link"]');
  }

  get signInLink() {
    return cy.get('[href="#/login"]');
  }

  get checkArticle() {
    return cy.get('[class="article-preview"]').eq(0);
  }

  assertNoArticle() {
    this.checkArticle.should('contain', 'No articles are here... yet.');
  }

  assertcheckLogOut() {
    this.checkArticle.should('contain', 'No articles are here... yet.');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username);
  }

  clickOnSignInLink() {
    this.signInLink.click();
  }
}

export default HomePageObject;

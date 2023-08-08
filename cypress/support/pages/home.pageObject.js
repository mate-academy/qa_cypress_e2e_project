import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/';

  assernoArticlesAreHere() {
    cy.contains(`.article-preview`, 'No articles are here... yet.')
      .should(`be.visible`);
  }

  userPageOpen() {
    cy.getByDataCy('username-link').click();
  }

  assertUsernameFromUserPage(username) {
    cy.contains(`h4`, username)
      .should(`be.visible`);
  }

  goToSignInPage() {
    cy.contains(`a`, 'Sign in')
      .click();
  }

  assertSignUpLinkAndClick() {
    cy.contains(`a`, 'Sign up')
      .should(`be.visible`).click();
  }
}

export default HomePageObject;

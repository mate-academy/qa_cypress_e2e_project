import PageObject from '../PageObject';

export class HomePageObject extends PageObject {
  url = '/';

  get usernameLink() {
    return cy.getByDataQa('username-link');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink.should('contain', username);
  }

  get userInfo() {
    return cy.getByDataQa('user-info');
  }

  assertUserBio(bio) {
    this.userInfo.should('contain', bio);
  }

  get feedSection() {
    return cy.getByDataQa('feed-section');
  }
}

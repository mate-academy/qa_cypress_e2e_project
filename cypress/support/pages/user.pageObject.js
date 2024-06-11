import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  visitUserPage(username) {
    cy.visit(`/#/@${username}/`);
  }

  get articlePreview() {
    return cy.getByDataCy('no-articles-here');
  }

  assertNoArticle() {
    this.articlePreview.should('contain', 'No articles are here... yet.');
  }

  get usernameInBanner() {
    return cy.getByDataCy('username');
  }

  get bioInBanner() {
    return cy.getByDataCy('bio');
  }

  assertBannerContainUsername(username) {
    this.usernameInBanner
      .should('contain', username);
  }

  assertBannerContainBio(bio) {
    this.bioInBanner
      .should('contain', bio);
  }
}

export default UserPageObject;

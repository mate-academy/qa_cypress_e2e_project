import PageObject from '../PageObject';

class HomePageObject extends PageObject {
  url = '/#/';

  get usernameLink() {
    return cy.get('a[href*="/profile/"]');
  }

  assertHeaderContainUsername(username) {
    this.usernameLink
      .should('contain', username.toLowerCase());
  }

  clickInGlobalFeed() {
    return cy.contains('a', 'Global Feed')
      .click();
  }

  clickInAuthor() {
    return cy.get('.author')
      .first()
      .click();
  }

  followUser() {
    return cy.contains('.btn', 'Follow')
      .click();
  }

  assertFollowedUser() {
    return cy.contains('.btn', 'Unfollow').should('exist');
  }

  unfollowUser() {
    return cy.contains('.btn', 'Unfollow')
      .click();
  }

  assertUnfollowedUser() {
    return cy.contains('.btn', 'Follow').should('exist');
  }
}

export default HomePageObject;

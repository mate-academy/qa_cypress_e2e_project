import PageObject from '../PageObject';

class UserPageObject extends PageObject {
  constructor() {
    super();
    this.followBtn = () => cy.get('[data-qa="follow-btn"]');
    this.followerCount = () => cy.get('[data-qa="follower-count"]');
  }

  visitProfile(username) {
    super.visit(`/profile/${username}`);
    cy.url().should('include', `/profile/${username}`);
  }

  clickFollow() {
    this.followBtn().should('be.visible').and('not.be.disabled').click();
  }

  assertFollowButtonText(expectedText) {
    this.followBtn().should('have.text', expectedText);
  }

  assertFollowerCount(expected) {
    this.followerCount().should('contain.text', expected);
  }
}

export default UserPageObject;

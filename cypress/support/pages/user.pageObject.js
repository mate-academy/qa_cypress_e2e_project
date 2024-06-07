class UserPageObject {
  visit(username) {
    cy.visit(`/@${username}`);
  }

  followUser() {
    cy.get('[data-qa="follow-user-btn"]').click();
  }

  unfollowUser() {
    cy.get('[data-qa="unfollow-user-btn"]').click();
  }

  assertUserFollowed(username) {
    cy.get('[data-qa="user-profile"]').should('contain', `@${username}`);
    cy.get('[data-qa="unfollow-user-btn"]').should('be.visible');
  }

  assertUserUnfollowed(username) {
    cy.get('[data-qa="user-profile"]').should('contain', `@${username}`);
    cy.get('[data-qa="follow-user-btn"]').should('be.visible');
  }
}

export default UserPageObject;

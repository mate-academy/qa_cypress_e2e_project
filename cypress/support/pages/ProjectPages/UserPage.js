class UserPage {
  AssertUserUsername(edit) {
    cy.url().should('include', edit.username);
  }

  AssertUserBio(edit) {
    cy.getByDataCy('user-bio-field').should('contain', edit.bio);
  }

  ClickFollowBtn() {
    cy.getByDataCy('follow-btn').click();
  }

  AssertFollowing(text) {
    cy.getByDataCy('follow-btn').should('include.text', text);
  }

  ClickUnfollowBtn() {
    cy.getByDataCy('unfollow-btn').click();
  }

  VisitUserPage(user) {
    cy.visit(`/#/@${user.username}/`);
  }
}

export const userPage = new UserPage();

class ProfilePage {
  visit(username) {
    cy.visit(`/profile/${username}`);
  }

  get followBtn() {
    return cy.getByDataCy('follow-btn');
  }

  get unfollowBtn() {
    return cy.getByDataCy('unfollow-btn');
  }

  clickFollowBtn() {
    this.followBtn.click();
  }

  clickUnfollowBtn() {
    this.unfollowBtn.click();
  }

  verifyFollowBtnText(expectedText) {
    this.followBtn.should('contain', expectedText);
  }

  verifyUnfollowBtnText(expectedText) {
    this.unfollowBtn.should('contain', expectedText);
  }
}

export default ProfilePage;

import PageObject from '../PageObject';

class ProfilePageObject extends PageObject {
  visit(username) {
    cy.visit(`/#/@${username}`);
  }

  get followBtn() {
    return cy.getByDataQa('follow-btn');
  }

  get unfollowBtn() {
    return cy.getByDataQa('unfollow-btn');
  }

  get bioField() {
    return cy.get('.user-info p');
  }

  get articlePreview() {
    return cy.get('.article-preview');
  }

  clickFollowBtn() {
    return this.followBtn.click();
  }

  clickUnfollowBtn() {
    return this.unfollowBtn.click();
  }

  assertFollowBtnVisible() {
    return this.followBtn.should('be.visible');
  }

  assertUnfollowBtnVisible() {
    return this.unfollowBtn.should('be.visible');
  }

  assertBioContains(bio) {
    return this.bioField.should('contain', bio);
  }

  assertNoArticles() {
    return this.articlePreview
      .should('contain', 'No articles');
  }
}

export default ProfilePageObject;

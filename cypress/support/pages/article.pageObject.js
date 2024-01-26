import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  get followBtn() {
    return cy.getByDataCy('user-follow-btn').eq(0);
  }

  get unfollowBtn() {
    return cy.getByDataCy('user-unfollow-btn').eq(0);
  }

  clickOnTheFollowBtn() {
    this.followBtn.click();
  }

  clickOnTheUnfollowBtn() {
    this.unfollowBtn.click();
  }

  assertFollowBtnName(text) {
    this.followBtn
      .should('contain.text', text);
  }

  assertUnfollowBtnName(text) {
    this.unfollowBtn
      .should('contain.text', text);
  }
}

export default ArticlePageObject;

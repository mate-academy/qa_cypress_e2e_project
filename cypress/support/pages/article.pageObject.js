import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  visitArticlePage(slug) {
    cy.visit(`/#/articles/${slug}/`);
  }

  get articleTitle() {
    return cy.getByDataCy('article-title');
  }

  get articleBody() {
    return cy.getByDataCy('article-body');
  }

  get editBtn() {
    return cy.getByDataCy('edit-btn').eq(0);
  }

  get deleteBtn() {
    return cy.getByDataCy('delete-btn').eq(0);
  }

  get followBtn() {
    return cy.getByDataCy('follow-btn').eq(0);
  }

  assertArticleTitle(title) {
    this.articleTitle.should('contain', title);
  }

  assertArticleBody(body) {
    this.articleBody.should('contain', body);
  }

  clickEditBtn() {
    this.editBtn.click();
  }

  clickDeleteBtn() {
    this.deleteBtn.click();
  }

  clickFollowBtn() {
    this.followBtn.click();
  }

  assertFollowBtnChangeUnfollow() {
    this.followBtn.should('contain', 'Unfollow');
  }

  assertUnfollowBtnChangeFollow() {
    this.followBtn.should('contain', 'Follow');
  }
}

export default ArticlePageObject;

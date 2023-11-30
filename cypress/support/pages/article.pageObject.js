import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get articleTitle() {
    return cy.getByDataQa('article-title-field');
  }

  get articleDescription() {
    return cy.getByDataQa('article-description-field');
  }

  get articleContent() {
    return cy.getByDataQa('article-body-field');
  }

  get articlePublishBtn() {
    return cy.getByDataQa('publish-article-btn');
  }

  get articleBanner() {
    return cy.getByDataQa('article-banner');
  }

  get articleBody() {
    return cy.getByDataQa('article-body');
  }

  get editArticleBtn() {
    return cy.getByDataQa('edit-article-btn');
  }

  get deleteArticleBtn() {
    return cy.getByDataQa('delete-article-btn');
  }

  typeArticleTitle(title) {
    this.articleTitle.type(title);
  }

  typeArticleDescription(description) {
    this.articleDescription.type(description);
  }

  typeArticleContent(content) {
    this.articleContent.type(content, { delay: 5 });
  }

  clickArticlePublishBtn() {
    this.articlePublishBtn.click();
  }

  clickArticleEditBtn() {
    this.articleBanner.contains('Edit Article').click();
  }

  clickArticleDeleteBtn() {
    this.articleBanner.contains('Delete Article').click();
  }

  clickFollowUserBtn() {
    this.articleBanner.contains('Follow').click();
  }

  clickUnfollowUserBtn() {
    this.articleBanner.contains('Unfollow').click();
  }

  assertBannerContainTitle(title) {
    this.articleBanner
      .should('contain', title);
  }

  assertBannerContainEditBtn() {
    this.editArticleBtn
      .should('be.visible');
  }

  assertBannerContainDeleteBtn() {
    this.deleteArticleBtn
      .should('be.visible');
  }

  assertContentContainBody(body) {
    this.articleBody
      .should('contain', body);
  }

  assertContainUnfollowBtn() {
    this.articleBanner.should('contain', 'Unfollow');
  }

  assertContainFollowBtn() {
    this.articleBanner.should('contain', 'Follow');
  }
}

export default ArticlePageObject;

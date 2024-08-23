import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '#/editor';

  articleTitleType(articleTitle) {
    cy.getByDataCy('article-title-field').type(articleTitle);
  }

  articleAboutType(articleAbout) {
    cy.getByDataCy('article-about-field').type(articleAbout);
  }

  articleBodyType(articleBody) {
    cy.getByDataCy('article-body-field').type(articleBody);
  }

  articleTagsType(articleTags) {
    cy.getByDataCy('article-tags-field').type(articleTags);
  }

  publishArticleBtn() {
    cy.getByDataCy('publish-article-btn').click();
  }

  newArticleLinkClick() {
    cy.getByDataCy('new-article-link').click();
  }

  bannerArticleCheck(title) {
    cy.getByDataCy('title-article-banner').contains(title);
  }

  bodyArticleCheck(body) {
    cy.getByDataCy('article-content').contains(body);
  }

  editArticleBtn() {
    cy.getByDataCy('edit-article-btn').eq(0).click();
  }

  deleteArticleBtn() {
    cy.getByDataCy('delete-article-btn').eq(0).click();
  }

  usernameLinkClick() {
    cy.getByDataCy('username-link').click();
  }

  articlePreviewCheck(article) {
    cy.getByDataCy('article-preview').should('not.contain', article);
  }
}

export default ArticlePageObject;

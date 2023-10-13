import PageObject from "../PageObject";

class ArticlePageObject extends PageObject {

  get articleTitle () {
    return cy.getByDataCy('article-title');
  }

  get articleContent () {
    return cy.getByDataCy('article-content');
  }

  get articleUsername () {
    return cy.getByDataCy('username-article');
  }

  get editArticleBtn () {
    return cy.getByDataCy('banner-edit-article-btn').first();
  }

  get deleteArticleBtn () {
    return cy.getByDataCy('delete-article-btn').first();
  }

  clickEditArticleBtn () {
    this.editArticleBtn.click();
  }

  clickDeleteArticleBtn () {
    this.deleteArticleBtn.click();
  }

  accertArticleTitle (title) {
    this.articleTitle.should('contain', title);
  }

  accertArticleDescription (content) {
    this.articleContent.should('contain', content);
  }

  accertAuthorUsername (username) {
    this.articleUsername.should('contain', username);
  }

  accertArticleCreated (title, content, username) {
    this.accertArticleTitle(title);
    this.accertArticleContent(content);
    this.accertArticleUsername(username);
  }

  accertArticleUpdated (title, content, username) {
    this.accertArticleTitle(title);
    this.accertArticleDescription(content);
    this.accertAuthorUsername(username);
  }

}

export default ArticlePageObject;
import PageObject from '../PageObject';
class ArticlePageObject extends PageObject {
  url = '/#/editor';

   get articleTitleField() {
    return cy.getByDataCy('article-title-field');
  }

  get articleTopicField() {
    return cy.getByDataCy('article-topic-field');
  }

  get articleBodyField() {
    return cy.getByDataCy('article-body-field');
  }

  get articlePublishBtn() {
    return cy.getByDataCy('article-publish-btn');
  }

  typeArticleTitle(title) {
    this.articleTitleField
      .type(title);
  }

  typeArticleTopic(topic) {
    this.articleTopicField
      .type(topic);
  }

  typeArticleBody(body) {
    this.articleBodyField
      .type(body);
  }

  clickArticlePublishBtn() {
    this.articlePublishBtn
      .click();
  }
get userInfoBanner() {
  return cy.getByDataCy('article-info')
}
  assertArticlePublish(title) {
    this.userInfoBanner
      .should('contain', title);
  }

  get articleEditBtn() {
    return cy.getByDataCy('edit-article-btn').eq(0);
  }

  get articleInfo() {
    return cy.getByDataCy('article-body')
  }

  get articleDeleteBtn() {
    return cy.getByDataCy('delete-article-btn').eq(1);
  }
  clickArticleEditBtn() {
    this.articleEditBtn.click()
  }

  updateArticleTitleField(newTitle) {
    this.articleTitleField.clear();
    this.articleTitleField.type(newTitle);
  }

  updateArticleTopicField(newTopic) {
    this.articleTopicField.clear();
    this.articleTopicField.type(newTopic)
  }

  updateArticleBodyField(newBody) {
    this.articleBodyField.clear();
    this.articleBodyField.type(newBody)
  }

  assertTitleEdit(newTitle) {
    this.userInfoBanner
      .should('contain', newTitle);
  }

  assertBodyEdit(newBody) {
    this.articleInfo
    .should('contain', newBody)
  }

  clickArticleDeleteBtn() {
    this.articleDeleteBtn.click()
  }
}

export default ArticlePageObject;
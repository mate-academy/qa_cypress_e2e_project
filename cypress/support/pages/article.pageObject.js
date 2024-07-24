import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/login';

  get findNewArticleLink() {
    return cy.getByDataCy('new-article-link');
  }

  clickArticleLink() {
    this.findNewArticleLink.click();
  }

  get findTitleField() {
    return cy.getByDataCy('article-title-field');
  }

  inputTitle(title) {
    this.findTitleField.type(title);
  }

  get findTopicField() {
    return cy.getByDataCy('article-topic-field');
  }

  inputTopic(topic) {
    this.findTopicField.type(topic);
  }

  get findBodyField() {
    return cy.getByDataCy('article-body-field');
  }

  inputBody(body) {
    this.findBodyField.type(body);
  }

  get findTagsField() {
    return cy.getByDataCy('article-tags-field');
  }

  inputTags(tags) {
    this.findTagsField.type(tags);
  }

  get findPublishArticleBtn() {
    return cy.getByDataCy('publish-article-btn');
  }

  clickPublishBtn() {
    this.findPublishArticleBtn.click();
  }

  get findCreatedArticle() {
    return cy.getByDataCy('edit-article-link');
  }

  checkCreatedArticle(title) {
    this.findCreatedArticle.first().should('have.attr', 'href', `#/editor/${title}`);
  }

  get findYourFeedTab() {
    return cy.get('a[href="#/my-feed"]');
  }

  clickYourFeedTab() {
    this.findYourFeedTab.click();
  }

  get findArticlesList() {
    return cy.getByDataCy('created-articles-list');
  }

  clickArticleThatWasCreated(title) {
    this.findArticlesList.find('a.preview-link').should('have.attr', 'href', `#/articles/${title}`).click();
  }

  clickEditLink(title) {
    this.findCreatedArticle.first().should('have.attr', 'href', `#/editor/${title}`).click();
  }

  get findEditTitle() {
    return cy.getByDataCy('article-title');
  }

  checkEditedArticle(newTitle) {
    this.findEditTitle.should('contain.text', newTitle);
  }

  get findDeleteBtn() {
    return cy.getByDataCy('delete-article-btn');
  }

  clickDeleteBtn() {
    this.findDeleteBtn.first().click();
  }

  articleWasDeletedSuccessfully(title) {
    this.findArticlesList.should('not.contain.text', title);
  }
}

export default ArticlePageObject;

import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get titleField() {
    return this.getByQa('article-title');
  }

  get descriptionField() {
    return this.getByQa('article-description');
  }

  get bodyField() {
    return this.getByQa('article-body');
  }

  get publishBtn() {
    return this.getByQa('article-publish');
  }

  get articleTitle() {
    return this.getByQa('article-heading');
  }

  get editBtn() {
    return this.getByQa('article-edit');
  }

  get deleteBtn() {
    return this.getByQa('article-delete');
  }

  fillArticle(article) {
    this.titleField.clear().type(article.title);
    this.descriptionField.clear().type(article.description);
    this.bodyField.clear().type(article.body);
  }

  publish() {
    this.publishBtn.click();
  }

  editTitle(title) {
    this.editBtn.first().click();
    this.titleField.clear().type(title);
    this.publish();
  }

  delete() {
    this.deleteBtn.first().click();
  }

  assertArticleTitle(title) {
    this.articleTitle.should('contain.text', title);
  }
}

export default ArticlePageObject;

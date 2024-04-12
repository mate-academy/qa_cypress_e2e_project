import PageObject from '../PageObject';

class NewArticlePage extends PageObject {
  url = '/#/editor';

  get titleArticleField() {
    return cy.getByDataCy('title-article-field');
  }

  get aboutArticleField() {
    return cy.getByDataCy('about-article-field');
  }

  get bodyArticleField() {
    return cy.getByDataCy('body-article');
  }

  get tagArticleField() {
    return cy.get('input[data-cy="tag-field"]');
  }

  get publishArticleButton() {
    return cy.getByDataCy('publish-article-btn');
  }

  typeTitle(title) {
    this.titleArticleField.type(title);
  }

  typeAbout(about) {
    this.aboutArticleField.type(about);
  }

  typeBody(body) {
    this.bodyArticleField.type(body);
  }

  typeTag(tag) {
    this.tagArticleField.type(tag);
  }
}

export default NewArticlePage;

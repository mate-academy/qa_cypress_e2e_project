import PageObject from '../PageObject';

class NewArticlePageObject extends PageObject {
  url = 'editor';

  get titleField() {
    return cy.getByDataCy('article-title-field');
  }

  get descriprtionField() {
    return cy.getByDataCy('article-desc-field');
  }

  get articleField() {
    return cy.getByDataCy('article-body-field');
  }

  get tagsField() {
    return cy.get('input[data-cy="article-tag-field"]');
  }

  get publishArticleBtn() {
    return cy.getByDataCy('publish-article-btn');
  }

  typeData(title, description, body, tag) {
    this.titleField.type(title);
    this.descriprtionField.type(description);
    this.articleField.type(body);
    this.tagsField.type(tag);
  }

  editData(title, description, body, tag) {
    this.titleField.clear().type(title);
    this.descriprtionField.clear().type(description);
    this.articleField.clear().type(body);
    this.tagsField.clear().type(tag);
  }

  clickPublishArticleBtn() {
    this.publishArticleBtn.click();
  }
}

export default NewArticlePageObject;

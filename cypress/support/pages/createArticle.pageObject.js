import PageObject from '../PageObject';

class createArticlePageObject extends PageObject {
  url = '/#/editor';

  get articleTitleField() {
    return cy.getByDataCy('article-title');
  };

  get articleDescriptionField() {
    return cy.getByDataCy('article-description');
  };

  get articleBodyField() {
    return cy.getByDataCy('article-body');
  };

  get articleTagsField() {
    // eslint-disable-next-line spaced-comment
    //return cy.getByDataCy('article-tags');
    return cy.findByPlaceholder('Enter tags');
  };

  get PublishBtn() {
    return cy.getByDataCy('publish-article-btn');
  }

  get EditBtn() {
    return cy.contains('.btn', 'Edit Article');
  }

  get DeleteBtn() {
    return cy.contains('.btn', 'Delete Article');
  }

  typeTitle(title) {
    this.articleTitleField
      .type(title);
  }

  typeDescription(description) {
    this.articleDescriptionField
      .type(description);
  }

  typeBody(body) {
    this.articleBodyField
      .type(body);
  }

  typeTags(tag) {
    this.articleTagsField.type(tag);
  }

  clickPublishBtn() {
    this.PublishBtn
      .click();
  }

  clickEditArticleBtn() {
    this.EditBtn.click();
  }

  clearFieldDataCy(datacy) {
    cy.getByDataCy(datacy).clear();
  }

  clearFieldPlaceholder(placeholder) {
    cy.findByPlaceholder(placeholder).clear();
  }

  clickDeleteArticle() {
    this.DeleteBtn.click();
  }
}

export default createArticlePageObject;

import PageObject from '../PageObject';

class ArticleEditorPageObject extends PageObject {
  constructor(slug) {
    super();

    this.url = slug ? `#/editor/${slug}` : `#/editor`;
  }

  get titleField() {
    return cy.getByDataQa('title-article');
  }

  get descriptionField() {
    return cy.getByDataQa('description-article');
  }

  get bodyField() {
    return cy.getByDataQa('body-article');
  }

  get tagField() {
    return cy.getByDataQa('tag-article');
  }

  get publishArticleBtn() {
    return cy.getByDataQa('btn-publish-article');
  }

  assertArticleFormExists(publishBtn) {
    if (publishBtn) {
      this.titleField
        .should('exist')
        .and('be.visible');

      this.descriptionField
        .should('exist')
        .and('be.visible');

      this.bodyField
        .should('exist')
        .and('be.visible');

      this.tagField
        .should('exist')
        .and('be.visible');

      this.publishArticleBtn
        .should('exist')
        .and('be.visible')
        .and('contain.text', publishBtn);
    } else {
      this.publishArticleBtn
        .should('exist')
        .and('be.visible');
    }
  }

  fillFormAndSubmit(articleData, part) {
    const {
      title,
      description,
      body,
      tag
    } = articleData;

    this.titleField
      .type(part || title);

    this.descriptionField
      .type(part || description);

    this.bodyField
      .type(part || body);

    this.tagField
      .children(this.tagField)
      .type(tag);

    this.publishArticleBtn
      .click();
  }

  editFormAndSubmit(newArticleData) {
    const {
      title,
      description,
      body,
      tag
    } = newArticleData;

    this.titleField
      .clear()
      .type(title);

    this.descriptionField
      .clear()
      .type(description);

    this.bodyField
      .clear()
      .type(body);

    this.tagField
      .find('.ti-actions')
      .click();

    this.tagField
      .children()
      .type(tag);

    this.publishArticleBtn
      .click();
  }

  typeTitle(articleTitle) {
    this.titleField
      .type(articleTitle);
  }

  typeDescription(articleDescription) {
    this.descriptionField
      .type(articleDescription);
  }

  typeBody(articleBody) {
    this.bodyField
      .type(articleBody);
  }

  typeTag(articleTag) {
    this.tagField
      .children(this.tagField)
      .type(articleTag);
  }

  clickOnPublishArticleBtn() {
    this.publishArticleBtn
      .click();
  }

  assertArticleFormContainsArticleParts(articleData) {
    const {
      title,
      description,
      body,
      tag
    } = articleData;

    this.titleField
      .should('contain.value', title);

    this.descriptionField
      .should('contain.value', description);

    this.bodyField
      .should('contain.value', body);

    this.tagField
      .find('.ti-content')
      .should('contain.text', tag);
  }
}

export default ArticleEditorPageObject;

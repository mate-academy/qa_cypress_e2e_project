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
      title: articleTitle,
      description,
      body,
      tag
    } = articleData;

    cy.get('@testTitle').then((title) => {
      if (title.includes(`empty 'Enter Tags' field`)) {
        this.typeTitle(articleTitle, part);
        this.typeDescription(description, part);
        this.typeBody(body, part);
      } else if (title.includes(`empty 'Article Title' field`)) {
        this.typeDescription(description, part);
        this.typeBody(body, part);
        this.typeTag(tag);
      } else {
        this.typeTitle(articleTitle, part);
        this.typeDescription(description, part);
        this.typeBody(body, part);
        this.typeTag(tag);
      }
    });

    this.clickOnPublishArticleBtn();
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

    // remove tag from field:
    this.tagField
      .find('.ti-actions')
      .click();

    // after removing previous one, type new tag:
    this.typeTag(tag);

    this.clickOnPublishArticleBtn();
  }

  typeTitle(articleTitle, part) {
    this.titleField
      .type(part || articleTitle);
  }

  typeDescription(articleDescription, part) {
    this.descriptionField
      .type(part || articleDescription);
  }

  typeBody(articleBody, part) {
    this.bodyField
      .type(part || articleBody);
  }

  typeTag(articleTag) {
    this.tagField
      .children()
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

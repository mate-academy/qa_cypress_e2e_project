import PageObject from './PageObject.js';

class ArticleEditorPage extends PageObject {
  getPage() {
    return cy.get('[data-qa="article-editor-page"]');
  }

  getArticleEditorForm() {
    return cy.get('[data-qa="article-editor-form"]');
  }

  getTitleInput() {
    return cy.get('[data-qa="article-title-input"]');
  }

  getDescriptionInput() {
    return cy.get('[data-qa="article-description-input"]');
  }

  getBodyTextarea() {
    return cy.get('[data-qa="article-body-textarea"]');
  }

  getTagsInput() {
    return cy.get('[data-qa="article-tags-input"]');
  }

  getPublishArticleButton() {
    return cy.get('[data-qa="publish-article-button"]');
  }

  fillArticleForm(articleData) {
    this.getTitleInput().clear().type(articleData.title);
    this.getDescriptionInput().clear().type(articleData.description);
    this.getBodyTextarea().clear().type(articleData.body);
    if (articleData.tags) {
      articleData.tags.forEach((tag) => {
        this.getTagsInput().find('input').type(tag + '{enter}');
      });
    }
  }

  submitArticleForm() {
    this.getPublishArticleButton().click();
  }

  visit(slug = '') {
    if (slug) {
      cy.visit(`/#/editor/${slug}`);
    } else {
      cy.visit('/#/editor');
    }
    this.getPage().should('be.visible');
  }
}

export default new ArticleEditorPage();

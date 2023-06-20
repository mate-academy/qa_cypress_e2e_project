import PageObject from '../PageObject';

class ArticleEditorPageObject extends PageObject {
  url = '/#/editor';

  typeArticleTitleField(articleTitle) {
    cy.getByDataCy('article-title-field').clear().type(articleTitle);
  }

  typeArticleDescriptionField(articleDescription) {
    cy.getByDataCy('article-description-field').clear().type(articleDescription);
  }

  typeArticleBodyField(articleBody) {
    cy.getByDataCy('article-body-field').clear().type(articleBody);
  }

  get publishArticleBtn() {
    return cy.getByDataCy('publish-article-btn');
  }
}

export default ArticleEditorPageObject;

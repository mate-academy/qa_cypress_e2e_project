import PageObject from '../PageObject';

class EditorPageObject extends PageObject {
  url = '/#/editor';

  typeArticleTitle(title) {
    cy.getByDataQa('title-editor')
      .type(title);
  }

  typeArticleDescription(description) {
    cy.getByDataQa('description-editor')
      .type(description);
  }

  typeArticleBody(body) {
    cy.getByDataQa('body-editor')
      .type(body);
  }

  typeArticleTags(tag) {
    cy.getByDataQa('tags-editor')
      .eq(1)
      .type(tag + '{enter}')
      .type(tag + '{enter}');
  }

  clickPublishBtn() {
    cy.getByDataQa('publish-btn-editor')
      .click();
  }
};

export default EditorPageObject;
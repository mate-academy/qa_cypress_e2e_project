import PageObject from '../PageObject';

class EditArticlePageObject extends PageObject {
  url = '#/editor';

  typeEditArticleTitle(title) {
    cy.findByPlaceholder('Article Title')
      .clear()
      .type(title);
  }

  typeEditArticleDescription(description) {
    cy.findByPlaceholder('What\'s this article about?')
      .clear()
      .type(description);
  }

  typeEditArticleBody(body) {
    cy.findByPlaceholder('Write your article (in markdown)')
      .clear()
      .type(body);
  }
};

export default EditArticlePageObject;

import PageObject from '../PageObject';

class NewArticlePageObject extends PageObject {
  url = '#/editor';

  typeNewArticleTitle(title) {
    cy.findByPlaceholder('Article Title')
      .type(title);
  }

  typeNewArticleDescription(description) {
    cy.findByPlaceholder('What\'s this article about?')
      .type(description);
  }

  typeNewArticleBody(body) {
    cy.findByPlaceholder('Write your article (in markdown)')
      .type(body);
  }

  typeNewArticleTag(tag) {
    cy.findByPlaceholder('Enter tags')
      .type(tag);
  }

  clickPublishArticleBtn() {
    cy.contains('.btn', 'Publish Article')
      .click();
  }
}
export default NewArticlePageObject;

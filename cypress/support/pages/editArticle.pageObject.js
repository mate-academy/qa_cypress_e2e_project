import PageObject from '../PageObject';

class EditArticlePageObject extends PageObject {
  url = '/#/editor';

  editArticle(editArticle) {
    cy.contains('.btn', 'Edit Article').click();
  }

  editTitle(title) {
    cy.findByPlaceholder('Article Title').clear().type(title);
  }

  editDescription(description) {
    // eslint-disable-next-line max-len
    cy.get('[placeholder="What\'s this article about?"]').clear().type(description);
  }

  editBody(body) {
    cy.findByPlaceholder('Write your article (in markdown)').clear().type(body);
  }

  editTag(tag) {
    cy.findByPlaceholder('Enter tags').clear().type(tag);
  }

  publishArticle(publishArticle) {
    cy.contains('.btn', 'Publish Article').click();
  }
}

export default EditArticlePageObject;

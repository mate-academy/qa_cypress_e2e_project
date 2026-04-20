/// <reference types='cypress' />
/// <reference types='../support' />

import ArticleEditorPageObject from '../support/pages/articleEditor.pageObject';

const editorPage = new ArticleEditorPageObject();

describe('Article', () => {
  let article;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((createdUser) => {
      const { username, email, password } = createdUser;

      cy.login(email, username, password);
    }).then(() => {
      editorPage.visit();
    });

    cy.task('generateArticle').then((createdArticle) => {
      article = createdArticle;
    });
  });

  it('should be created using New Article form', () => {
    const { title, body, description, tag } = article;

    editorPage.typeTitle(title);
    editorPage.typeDescription(description);
    editorPage.typeBody(body);
    editorPage.typeTags(tag);
    editorPage.clickSubmitBtn();

    cy.get('h1').should('contain', title);
  });

  it('should be edited using Edit button', () => {
    const { title, body, description, tag } = article;

    editorPage.typeTitle(title);
    editorPage.typeDescription(description);
    editorPage.typeBody(body);
    editorPage.typeTags(tag);
    editorPage.clickSubmitBtn();

    cy.get('h1').should('contain', title);

    editorPage.clickArticleEditBtn();
    editorPage.titleField.should('be.visible');
  });

  it('should be deleted using Delete button', () => {
    const { title, body, description, tag } = article;

    editorPage.typeTitle(title);
    editorPage.typeDescription(description);
    editorPage.typeBody(body);
    editorPage.typeTags(tag);
    editorPage.clickSubmitBtn();

    cy.get('h1').should('contain', title);

    editorPage.clickArticleDeleteBtn();
    editorPage.deletedMessage.should('contain', 'Deleted the article');
  });
});

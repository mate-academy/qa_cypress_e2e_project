import EditorPageObject from '../support/pages/editor.pageObject';
import faker from 'faker';

const editorPage = new EditorPageObject();

describe('Article', () => {
  let user;
  let article;

  beforeEach(() => {
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });
  });

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.login(user.email, user.username, user.password);
    });
  });

  it('should be created using New Article form', () => {
    editorPage.visit();
    editorPage.typeTitle(article.title);
    editorPage.typeDescription(article.description);
    editorPage.typeBody(article.body);
    editorPage.typeTags(article.tag);
    editorPage.clickPublishBtn();
    editorPage.assertArticleTitle(article.title);
    editorPage.assertArticleBody(article.body);
  });

  it('should be edited using Edit button', () => {
    const newbody = faker.lorem.words();
    cy.get('@user').then((user) => {
      cy.createArticle(
        user.id, article.title, article.description, article.body
      )
        .then((response) => {
          const slug = response.body.article.slug;
          cy.visit(`/#/articles/${slug}`);
        });
    });

    editorPage.clickEditBtn();
    editorPage.typeBody(newbody);
    editorPage.clickPublishBtn();
    editorPage.assertArticleBody(newbody);
  });

  it('should be deleted using Delete button', () => {
    cy.get('@user').then((user) => {
      cy.createArticle(
        user.id, article.title, article.description, article.body
      )
        .then((response) => {
          const slug = response.body.article.slug;
          cy.visit(`/#/articles/${slug}`);
        });
    });

    editorPage.clickDeleteBtn();
    cy.get('.article-preview')
      .should('contain.text', 'No articles are here... yet.');
  });
});

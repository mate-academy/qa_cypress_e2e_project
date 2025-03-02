/// <reference types="cypress" />
import EditorPageObject from '../support/pages/editor.pageObject';
import { faker } from '@faker-js/faker';

const editorPage = new EditorPageObject();
let article;

describe('Article', () => {
  beforeEach(() => {
    cy.task('db:clear');

    article = {
      title: faker.lorem.sentence(),
      description: faker.lorem.sentences(2),
      body: faker.lorem.paragraphs(3),
      tag: faker.lorem.word()
    };
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
    const newBodyContent = faker.lorem.paragraph();

    editorPage.visit();
    editorPage.typeTitle(article.title);
    editorPage.typeDescription(article.description);
    editorPage.typeBody(article.body);
    editorPage.typeTags(article.tag);
    editorPage.clickPublishBtn();

    editorPage.clickEditBtn();
    editorPage.typeBody(newBodyContent);
    editorPage.clickPublishBtn();

    editorPage.assertArticleBody(newBodyContent);
  });

  it('should be deleted using Delete button', () => {
    editorPage.visit();
    editorPage.typeTitle(article.title);
    editorPage.typeDescription(article.description);
    editorPage.typeBody(article.body);
    editorPage.typeTags(article.tag);
    editorPage.clickPublishBtn();

    editorPage.clickDeleteBtn();

    cy.get('.article-preview')
      .should('contain.text', 'No articles are here... yet.');
  });
});


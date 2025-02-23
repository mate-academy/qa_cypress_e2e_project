/// <reference types='cypress' />
/// <reference types='../support' />

import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import EditorPageObject from '../support/pages/editor.pageObject';
import { faker } from '@faker-js/faker';
import ArticlePageObject from '../support/pages/article.pageObject';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const editorPage = new EditorPageObject();
const articlePage = new ArticlePageObject();

const title = faker.lorem.words(3);
const newTitle = faker.lorem.words(3);
const description = faker.lorem.sentence();
const newDescription = faker.lorem.sentence();
const textBody = faker.lorem.paragraph(3);
const newTextBody = faker.lorem.paragraph(3);

// Lepsza metoda generowania slugów, obsługuje znaki specjalne i wielokrotne spacje
const generateSlug = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-') // Zamienia wszystkie niealfanumeryczne znaki na '-'
    .replace(/^-+|-+$/g, ''); // Usuwa myślniki na początku i końcu

const titleSlug = generateSlug(title);

describe('Article', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((response) => {
      user = response;

      cy.register(user.email, user.username, user.password);

      signInPage.visit();
      signInPage.typeEmail(user.email);
      signInPage.typePassword(user.password);
      signInPage.clickSignInBtn();
      homePage.pressNewArticleLink();
      editorPage.typeTitle(title);
      editorPage.typeDescription(description);
      editorPage.typeBody(textBody);
    });
  });

  it('should be created using New Article form', () => {
    editorPage.titleField.should('have.value', title);
    editorPage.descriptionField.should('have.value', description);
    editorPage.bodyField.should('have.value', textBody);
    editorPage.pressPublishBtn();
    articlePage.assertPageURL('/articles/' + titleSlug);
    articlePage.title.should('contain.text', title);
    articlePage.body.should('contain.text', textBody);
    homePage.pressHomeLink();
    homePage.pressYourFeed();
    homePage.articlePreview.should('contain.text', title);
    homePage.articlePreview.should('contain.text', description);
    homePage.pressGlobalFeed();
    homePage.articlePreview.should('contain.text', title);
    homePage.articlePreview.should('contain.text', description);
  });

  it('should be edited using Edit button', () => {
    editorPage.pressPublishBtn();
    articlePage.pressEditBtn();
    editorPage.titleField.clear();
    editorPage.typeTitle(newTitle);
    editorPage.descriptionField.clear();
    editorPage.typeDescription(newDescription);
    editorPage.bodyField.clear();
    editorPage.typeBody(newTextBody);
    editorPage.pressPublishBtn();
    articlePage.title.should('contain.text', newTitle);
    articlePage.description.should('contain.text', newDescription);
    articlePage.body.should('contain.text', newTextBody);
  });

  it('should be deleted using Delete button', () => {
    editorPage.pressPublishBtn();
    articlePage.pressDeleteBtn();
    homePage.pressYourFeed();
    homePage.articlePreview.should('not.exist');
  });
});

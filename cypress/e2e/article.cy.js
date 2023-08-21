/// <reference types='cypress' />
/// <reference types='../support' />
import ArticlePage from '../support/pages/article.pageObject';
import SignInPageObject from '../support/pages/signIn.pageObject';
import HomePageObject from '../support/pages/home.pageObject';
import faker from 'faker';
import '../support/commands';

const signInPage = new SignInPageObject();
const homePage = new HomePageObject();
const articlePage = new ArticlePage();

describe('Article Page', () => {
  let user;
  let title;
  let description;
  let content;
  let tags;

  before(() => {
    cy.task('db:clear');
  });

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;

      cy.registerUser(user.email, user.username, user.password);
      cy.visit('/#/login');
      signInPage.login(user.email, user.password);
      homePage.clickNewArticle();

      title = faker.lorem.words(2);
      description = faker.lorem.words(3);
      content = faker.lorem.words(4);
      tags = ['tag1', 'tag2', 'tag3'];
      const tagsString = tags.join(', ');

      articlePage.fillTitle(title);
      articlePage.fillDescription(description);
      articlePage.fillContent(content);
      articlePage.fillTags(tagsString);
      articlePage.submitArticle();
    });
  });

  it('should be created using New Article form', () => {
    cy.get('.banner h1').should('contain', title);
    cy.get('.article-content').should('contain', content);
  });

  it('should be edited using Edit button', () => {
    cy.get('a.btn-outline-secondary span').contains('Edit Article').click();

    const editedTitle = faker.lorem.words(2);
    const editedDescription = faker.lorem.words(2);
    const editedContent = faker.lorem.paragraphs(1);
    const editedTag = ['mag1', 'mag2'];
    const editedTagsString = editedTag.join(', ');

    articlePage.fillTitle(editedTitle);
    articlePage.fillDescription(editedDescription);
    articlePage.fillContent(editedContent);
    articlePage.fillTags(editedTagsString);

    cy.get('button.btn-primary').contains('Publish Article').click();
    cy.visit(`/#/@${user.username}/`);
    cy.get('a.preview-link h1').contains(editedTitle).should('exist');
  });

  it('should be deleted using Delete button', () => {
    cy.get('button.btn-outline-danger').contains('Delete Article').click();

    homePage.clickUsernameLink(user.username);
    cy.get('h1').should('not.contain', title);
  });
});

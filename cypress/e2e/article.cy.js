/// <reference types='cypress' />
/// <reference types='../support' />

import HomePageObject from '../support/pages/home.pageObject';
import ProfilePageObject from '../support/pages/profile.pageObject';
import ArticlePageObject from '../support/pages/article.pageObject';
import EditorPageObject from '../support/pages/editor.pageObject';

const homePage = new HomePageObject();
const profilePage = new ProfilePageObject();
const articlePage = new ArticlePageObject();
const editorPage = new EditorPageObject();

describe('Article', () => {
  let user;
  let article;
  let newTitle;

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
      cy.register(user.email, user.username, user.password);
      cy.login(user);
    });

    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
      newTitle = article.title + ' new';
    });

    cy.visit('/');
  });

  it('should be created using New Article form', () => {
    homePage.clickOnNewArticleLink();
    editorPage.typeArticleTitle(article.title);
    editorPage.typeArticleDescription(article.description);
    editorPage.typeArticleBody(article.body);
    editorPage.typeArticleTag(article.tag);
    editorPage.clickOnPublishArticleButton();
    articlePage.assertArticleIsPublished(article.title);
  });

  it('should be edited using Edit button', () => {
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slugUr = response.body.article.slug;
        homePage.clickOnUsernameLinkInHeader();
        articlePage.assertArticleIsPublished(article.title);
        profilePage.clickOnArticleOnProfilePage(article.title);
        articlePage.clickOnEditButton();
        editorPage.typeArticleTitle(newTitle);
        editorPage.clickOnUpdateArticleButton();
        cy.visit(`article/${slugUr}`);
        articlePage.assertArticleIsEdited(newTitle);
      });
  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(article.title, article.description, article.body)
      .then((response) => {
        const slugUr = response.body.article.slug;
        homePage.clickOnUsernameLinkInHeader();
        articlePage.assertArticleIsPublished(article.title);
        profilePage.clickOnArticleOnProfilePage(article.title);
        articlePage.clickOnDeleteButton();
        articlePage.confirmDelete();
        cy.visit(`article/${slugUr}`);
        articlePage.assertArticleOnProfilePageIsDeleted();
      });
  });
});

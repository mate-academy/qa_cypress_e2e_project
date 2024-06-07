/// <reference types='cypress' />
/// <reference types='../support' />

import PageObject from '../support/PageObject';
import EditPageObject from '../support/pages/edit.pageObject';
import ArticlePageObject from '../support/pages/artilce.pageObject';

const pageObject = new PageObject();
const editPage = new EditPageObject();
const articlePage = new ArticlePageObject();

describe('Article', () => {
  let data;

  beforeEach(() => {
    cy.task('db:clear');
    cy.task('generateData').then((generateData) => {
      data = generateData;
    });
    cy.visit('/#/');
  });

  it('should be created using New Article form', () => {
    cy.publishArticle(data);
    pageObject.assertUrlContainsText(data.title);
    articlePage.assertTitleContainText(data.title);
    articlePage.assertBodyContainText(data.body);
  });

  it('should be edited using Edit button', () => {
    cy.publishArticle(data);
    pageObject.assertUrlContainsText(data.title);
    articlePage.assertTitleContainText(data.title);
    articlePage.assertBodyContainText(data.body);

    articlePage.clickEditArticleBtn();
    editPage.typeTitle(data.title);
    editPage.typeAbout(data.about);
    editPage.typeBody(data.body);
    editPage.clickPublishArticleBtn();

    pageObject.assertUrlContainsText(data.title);
    articlePage.assertTitleContainText(`${data.title}${data.title}`);
    articlePage.assertBodyContainText(`${data.body}${data.body}`);
  });

  it('should be deleted using Delete button', () => {
    cy.publishArticle(data);
    pageObject.assertUrlContainsText(data.title);
    articlePage.assertTitleContainText(data.title);
    articlePage.assertBodyContainText(data.body);

    articlePage.clickDeleteArticleBtn();

    articlePage.visitArticleUrl(data.title);
    articlePage.assertTitleNotContainText(data.title);
  });
});

/// <reference types='cypress' />
/// <reference types='../support' />


import NewArticlePageObject from "../support/pages/newArticle.pageObject";
import ArticlePageObject from "../support/pages/article.pageObject";
import faker from "faker";

const articlePage = new ArticlePageObject;
const newArticlepage = new NewArticlePageObject;

describe('Article', () => {
  let user;
  let article;

  const updateArticle = {
    newTitle: faker.lorem.word()
  }
  
  beforeEach(() => {
    cy.task('db:clear');    
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.task('generateArticle').then((generateArticle) => {
      article = generateArticle;
    });            
  });

  beforeEach(() => {
    cy.register(user.email, user.username, user.password);
    
    cy.login(user.email, user.username, user.password);
  })

  it('should be created using New Article form', () => {   

    newArticlepage.visit();
    newArticlepage.typeTitle(article.title);
    newArticlepage.typeAboutField(article.description);
    newArticlepage.typeBodyField(article.body);
    newArticlepage.typeTagsField(article.tag);
    newArticlepage.clickPublButton();
    articlePage.assertHeaderContainTitle(article.title);
  });

  it('should be edited using Edit button', () => {
    
    cy.createArticle(article.title, article.description, article.body).then(response => {
      const slug = response.body.article.slug;
      articlePage.visit(`#/articles/${slug}`);
    });
    articlePage.clickEditArticBut();
    newArticlepage.clearTitle();
    newArticlepage.typeTitle(updateArticle.newTitle);
    newArticlepage.clickPublButton();   
    articlePage.assertHeaderContainTitle(updateArticle.newTitle);
    

  });

  it('should be deleted using Delete button', () => {
    cy.createArticle(article.title, article.description, article.body).then(response => {
      const slug = response.body.article.slug;
      articlePage.visit(`#/articles/${slug}`);
    });
    articlePage.clickDeletArticBut();
    articlePage.assertModalWindowContain();
    articlePage.assertUrlNotInclude(articlePage.url);

  });
});

import PageObject from '../PageObject'; 
 
class ArticlePageObject extends PageObject { 
  url = '/#/editor'; 
 
  get articleTitleField() { 
    return cy.getByDataCy('article-title'); 
  } 
 
  get articleAboutField() { 
    return cy.getByDataCy('article-about'); 
  } 
 
  get articleBodyField() { 
    return cy.getByDataCy('article-body'); 
  } 
 
  get articleTagsField() { 
    return cy.getByDataCy('article-tags-new'); 
  } 
 
  get articleBtn() { 
    return cy.getByDataCy('article-btn'); 
  } 
 
  get articleEditBtn() { 
    return cy.getByDataCy('article-edit-btn').eq(0); 
  } 
 
  get articleDelBtn() { 
    return cy.getByDataCy('article-delete-btn').eq(0); 
  } 
 
  get articlePreview() { 
    return cy.getByDataCy('article-preview-home-page'); 
  } 
 
  typeArticleTitle(title) { 
    this.articleTitleField 
      .type(title); 
  } 
 
  typeArticleAbout(about) { 
    this.articleAboutField 
      .type(about); 
  } 
 
  typeArticleBody(body) { 
    this.articleBodyField 
      .type(body); 
  } 
 
  rewriteArticleBody(body) { 
    this.articleBodyField 
      .clear() 
      .type(body); 
  } 
 
  typeArticleTags(tags) { 
    this.articleTagsField 
      .type(tags); 
  } 
 
  clickPublishBtn() { 
    this.articleBtn 
      .click(); 
  } 
 
  clickEditBtn() { 
    this.articleEditBtn 
      .click(); 
  } 
 
  clickDeleteBtn() { 
    this.articleDelBtn 
      .click(); 
  } 
 
  assertArticleTitle(content) { 
    cy.get('.banner h1').should('contain', content); 
  } 
 
  assertArticleBody(content) { 
    cy.get('.article-content').should('contain', content); 
  } 
 
  assertArticlePreview(content) { 
    this.articlePreview 
      .should('contain', content); 
  } 
 
} 
 
export default ArticlePageObject;
import PageObject from '../PageObject';

class ArticlePage extends PageObject {
  get bannerCreatedArticle() {
    return cy.getByDataCy('created-article-banner');
  }

  get containerCreatedArticle() {
    return cy.getByDataCy('created-article-container');
  }

  get editArticleButtonContainer() {
    return cy.getByDataCy('edit-articl-btn').eq(1);
  }

  get deliteArticleButtonContainer() {
    return cy.getByDataCy('delate-article-btn').eq(1);
  }

  get followAuhtorButton() {
    return cy.getByDataCy('follow-btn').eq(1);
  }
}

export default ArticlePage;

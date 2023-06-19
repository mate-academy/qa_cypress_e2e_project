import PageObject from '../PageObject';

class ArticleEditorPageObject extends PageObject {
  url = '/#/editor';

  get articleTitleField() {
    return cy.getByDataQa('article-title-field');
  }

  typeArticleTitle(title) {
    this.articleTitleField.clear().type(title);
  }

  get articleDescriptionField() {
    return cy.getByDataQa('article-description-field');
  }

  typeArticleDescription(description) {
    this.articleDescriptionField.clear().type(description);
  }

  get articleBodyField() {
    return cy.getByDataQa('article-body-field');
  }

  typeArticleBody(body) {
    this.articleBodyField.clear().type(body);
  }

  get articleTagField() {
    return cy.getByDataQa('article-tag-field');
  }

  typeArticleTag(tag) {
    this.articleTagField.clear().type(tag);
  }

  get publishArticleBtn() {
    return cy.getByDataQa('publish-article-btn');
  }

  publishArticle() {
    this.publishArticleBtn.click();
  }

  createArticleAndVisit(title, description, body) {
    cy.createArticle(title, description, body).then((response) => {
      const slug = response.body.article.slug;
      cy.visit(`/#/article/${slug}`);
    });
  };
};

export default ArticleEditorPageObject;

import PageObject from '../PageObject';
const faker = require('faker');

class articlePageObject extends PageObject {

    url = '/#/editor';

    get articleTitleField() {
        return cy.getByDataCy('article-title');
    }

    get articleAboutField() {
        return cy.getByDataCy('article-about');
    }

    get articleField() {
        return cy.getByDataCy('article');
    }

    get tagsField() {
        return cy.getByDataCy('tags');
    }

    get publishArticleButton() {
        return cy.getByDataCy('publish-article');
    }

    get newArticleLink() {
        return cy.getByDataCy('new-article-link');
    }

    get banner() {
        return cy.getByDataCy('banner');
    }

    get editArticle() {
        return cy.getByDataCy('edit-article').first();
    }

    get deleteArticle () {
        return cy.getByDataCy('delete-article').first();
    }

    typeTitle(title) {
        this.articleTitleField
          .type(title);
    }

    typeAbout(about) {
        this.articleAboutField
          .type(about);
    }

    typeArticle(body) {
        this.articleField
          .type(body);
    }

    typeTags(tag) {
        this.tagsField
          .type(tag);
    }

    clickPublishArticle() {
        this.publishArticleButton
          .click();
    }

    clickNewArticle() {
        this.newArticleLink
          .click();
    }

    assertBannerContainTitle(title) {
        this.banner
          .should('contain', title);
      }

      clickEditArticle() {
        this.editArticle
          .click();
      }

      clearArticleTitle() {
        this.articleTitleField
          .clear();
      }

      clickDeleteArticle() {
        this.deleteArticle
          .click();
      }
}

export default articlePageObject;

import PageObject from '../PageObject';
import generateData from '../generate/index';
import ArticlePageObject from './article.pageObject';

class ArticleFormPageObject extends PageObject {
  genData = generateData();

  articlePage = new ArticlePageObject();

  get titleField() {
    return cy.getByDataCy('title-field-create');
  }

  get aboutField() {
    return cy.getByDataCy('about-field-create');
  }

  get bodyField() {
    return cy.getByDataCy('body-field-create');
  }

  get tagsField() {
    return cy.get('[placeholder="Enter tags"]');
  }

  get publishBtn() {
    return cy.getByDataCy('publish-article-btn-create');
  }

  titleFieldType(title) {
    this.titleField.type(title);
  }

  aboutFieldType(about) {
    this.aboutField.type(about);
  }

  bodyFieldType(body) {
    this.bodyField.type(body);
  }

  tagsFieldType(tags) {
    this.tagsField.type(tags);
  }

  publishBtnClick() {
    this.publishBtn.click();
  }

  fieldsFillingProcess(
    option = 'default',
    title = this.genData.article.title,
    about = this.genData.article.about,
    body = this.genData.article.body,
    tags = this.genData.article.tags
  ) {
    if (option !== 'without title') {
      this.titleFieldType(title);
    }
    this.aboutFieldType(about);
    this.bodyFieldType(body);
    this.tagsFieldType(tags);

    this.publishBtnClick();
  }

  assertion() {
    this.articlePage.fullAssertion(
      this.genData.article.title,
      this.genData.article.body,
      this.genData.article.tags
    );
  }
}

export default ArticleFormPageObject;

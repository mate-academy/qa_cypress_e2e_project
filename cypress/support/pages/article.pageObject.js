import PageObject from '../PageObject';

class ArticlePageObject extends PageObject {
  url = '/#/editor';

  get titleField() { return this.getByQa('article-title'); }
  get descriptionField() { return this.getByQa('article-description'); }
  get bodyField() { return this.getByQa('article-body'); }
  get tagsField() { return this.getByQa('article-tags'); }
  get publishBtn() { return this.getByQa('publish-article-btn'); }
  get editBtn() { return this.getByQa('edit-article-btn'); }
  get deleteBtn() { return this.getByQa('delete-article-btn'); }

  typeTitle(title) { this.titleField.type(title); }
  typeDescription(desc) { this.descriptionField.type(desc); }
  typeBody(body) { this.bodyField.type(body); }
  typeTags(tags) { this.tagsField.type(tags); }
  clickPublish() { this.publishBtn.click(); }
  clickEdit() { this.editBtn.click(); }
  clickDelete() { this.deleteBtn.click(); }
}

export default ArticlePageObject;

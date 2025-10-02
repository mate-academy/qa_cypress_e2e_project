import { ArticlePage } from "../pageObjects/ArticlePage";

describe("Articles", () => {
  const article = new ArticlePage();

  beforeEach(() => {
    cy.resetDatabase();
    cy.createUser().then((user) => cy.login(user));
  });

  it("should create a new article", () => {
    const title = faker.lorem.sentence();
    const body = faker.lorem.paragraph();

    article.visitNew();
    article.typeTitle(title);
    article.typeBody(body);
    article.submit();

    cy.contains(title).should("be.visible");
    cy.contains(body).should("be.visible");
  });

  it("should delete an article", () => {
    const title = faker.lorem.sentence();
    const body = faker.lorem.paragraph();

    article.createViaAPI(title, body).then((slug) => {
      cy.visit(`/article/${slug}`);
      article.delete();
      cy.contains(title).should("not.exist");
    });
  });
});

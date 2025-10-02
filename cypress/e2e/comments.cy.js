import { ArticlePage } from "../pageObjects/ArticlePage";

describe("Comments", () => {
  const article = new ArticlePage();

  beforeEach(() => {
    cy.resetDatabase();
    cy.createUser().then((user) => {
      cy.login(user);
      return article.createViaAPI(faker.lorem.sentence(), faker.lorem.paragraph());
    }).then((slug) => cy.visit(`/article/${slug}`));
  });

  it("should add a comment", () => {
    const comment = faker.lorem.sentence();
    article.addComment(comment);
    cy.contains(comment).should("be.visible");
  });
});

/// <reference types='cypress' />
/// <reference types='../support' />

describe('User', () => {
  let user;

  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generateUser) => {
      cy.register(
        generateUser.email,
        generateUser.username,
        generateUser.password
      );
      user = generateUser;
    });
  });

  beforeEach(() => {});

  it('should be able to follow other users', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/');
    cy.contains('a', 'Global Feed').click();
    cy.get('a[class="author"]').click();

    cy.get('a.author')
      .first()
      .then(($el) => {
        const username = $el.text().trim();

        cy.wrap($el).click();

        cy.get('button.btn.btn-sm.action-btn.btn-secondary').click();

        cy.visit('/');
        cy.get(`a[href="/profile/${username}"]`).should('exist');
      });
  });
});

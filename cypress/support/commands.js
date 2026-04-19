Cypress.Commands.add('getByDataQa', (selector) => {
  return cy.get(`[data-qa="${selector}"]`);
});

Cypress.Commands.add(
  'createUser',
  (
    email = 'riot@qa.team',
    username = 'riot',
    password = '12345Qwert!'
  ) => {
    return cy.request('POST', '/users', {
      email,
      username,
      password
    }).then((response) => {
      return cy.wrap({
        ...response.body.user,
        password
      });
    });
  }
);

Cypress.Commands.add(
  'register',
  (
    email = 'riot@qa.team',
    username = 'riot',
    password = '12345Qwert!'
  ) => {
    return cy.request('POST', '/users', {
      email,
      username,
      password
    }).then((response) => {
      const user = {
        ...response.body.user,
        password
      };
      return cy.setCookie('drash_sess', user.token)
        .then(() => cy.wrap(user));
    });
  }
);

Cypress.Commands.add('login', (email, password) => {
  return cy.request('POST', '/users/login', {
    user: { email, password }
  }).then((response) => {
    const user = response.body.user;
    return cy.setCookie('drash_sess', user.token)
      .then(() => cy.wrap({ ...user, password }));
  });
});

Cypress.Commands.add('createArticle', (articleData) => {
  return cy.getCookie('drash_sess').then((cookie) => {
    const token = cookie ? cookie.value : '';
    return cy.request({
      method: 'POST',
      url: '/articles',
      body: {
        article: {
          author_id: articleData.author_id || 0,
          title: articleData.title,
          description: articleData.description,
          body: articleData.body,
          tags: Array.isArray(articleData.tags)
            ? articleData.tags.join(',')
            : (articleData.tags || '')
        }
      },
      headers: {
        Cookie: `drash_sess=${token}`
      }
    }).then((response) => {
      return cy.wrap(response.body.article);
    });
  });
});

function generateInvalidEmailForTest(testTitle, emails) {
  const {
    noNamePartEmail,
    noAtSymbolEmail,
    noDomainPartEmail,
    noDotPartEmail,
    noTopDomainPartEmail
  } = emails;

  if (testTitle.includes('email without [name] part')) {
    return noNamePartEmail;
  }

  if (testTitle.includes('email without "@" symbol')) {
    return noAtSymbolEmail;
  }

  if (testTitle.includes('email without [domain] part')) {
    return noDomainPartEmail;
  }

  if (testTitle.includes('email without dot (.)')) {
    return noDotPartEmail;
  }

  if (testTitle.includes('email without [top-domain] part')) {
    return noTopDomainPartEmail;
  }
}

function setPasswordForTest(testTitle, passwords) {
  const {
    shortPassword,
    boundaryPassword,
    lowcasePassword,
    alphabeticPassword
  } = passwords;

  if (testTitle.includes('contains 8 characters')) {
    return boundaryPassword;
  }

  if (testTitle.includes('contains less then 8 characters')) {
    return shortPassword;
  }

  if (testTitle.includes('without numbers')) {
    return alphabeticPassword;
  }

  if (testTitle.includes('without capital letter')) {
    return lowcasePassword;
  }
}

module.exports = {
  generateInvalidEmailForTest,
  setPasswordForTest
};

function generateInvalidEmailForTest(testTitle, baseEmail) {
  const [namePart, domainsPart] = baseEmail.split('@');
  const [domainPart, topDomainPart] = domainsPart.split('.');

  if (testTitle.includes(`email without [name] part`)) {
    return baseEmail.replace(namePart, '');
  }

  if (testTitle.includes(`email without '@' symbol`)) {
    return baseEmail.replace('@', '');
  }

  if (testTitle.includes(`email without [domain] part`)) {
    return baseEmail.replace(domainPart, '');
  }

  if (testTitle.includes(`email without dot (.)`)) {
    return baseEmail.replace('.', '');
  }

  if (testTitle.includes(`email without [top-domain] part`)) {
    return baseEmail.replace(topDomainPart, '');
  }
}

function setPasswordForTest(testTitle, passwords) {
  const {
    shortPassword,
    boundaryPassword,
    lowcasePassword,
    alphabeticPassword
  } = passwords;

  if (testTitle.includes(`contains 8 characters`)) {
    return boundaryPassword;
  }

  if (testTitle.includes(`contains less then 8 characters`)) {
    return shortPassword;
  }

  if (testTitle.includes(`without numbers`)) {
    return alphabeticPassword;
  }

  if (testTitle.includes(`without capital letter`)) {
    return lowcasePassword;
  }
}

module.exports = {
  generateInvalidEmailForTest,
  setPasswordForTest
};

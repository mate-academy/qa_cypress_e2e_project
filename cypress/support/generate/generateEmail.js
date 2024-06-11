import generateUsername from './generateUsername.js';

function generateEmail() {
  const name = generateUsername();
  const domain = generateUsername(3);

  return {
    default: `${name}@${domain}.com`,
    withoutName: `@${domain}.com`,
    withoutAt: `${name}${domain}.com`,
    withoutDomain: `${name}@.com`,
    withoutTopDomain: `${name}@${domain}.`,
    withoutDot: `${name}@${domain}com`,
    withDoubleAt: `${name}@@${domain}.com`,
    withDoubleDot: `${name}@${domain}..com`
  };
}

export default generateEmail;

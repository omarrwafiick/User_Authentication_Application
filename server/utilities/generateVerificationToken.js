const GenerateVerificationToken = () => Math.floor(100000 + Math.random() * 80000).toString();

module.exports = { GenerateVerificationToken } ;
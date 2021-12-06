const jwt = require("jsonwebtoken");

function gerarToken(userObj) {
    const { _id, name, email } = userObj;

    const signature = process.env.TOKEN_SIGN_SECRET;
    const expiration = "30s";

    return jwt.sign({ _id, name, email }, signature, { expiresIn: expiration });
}

module.exports = gerarToken;
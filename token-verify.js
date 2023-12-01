const jwt = require('jsonwebtoken');

const secret = 'myDog';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcwMTIyNDM2MH0.Vs6UvuxRa-XrxB_l6nR2Z7T5PK8UzxaMb1Pji7D17E8'

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);
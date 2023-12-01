const bcrypt = require('bcrypt');

async function verifyPassword() {
  const myPassword = 'admin 123 .202';
  const hash = '$2b$10$MkWfJrPYatTtof6rzyj0guZcC4iNgu5aTcG/gdX1XiFrDUInxLcQ.';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

verifyPassword();
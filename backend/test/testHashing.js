const bcrypt = require("bcryptjs");

const plaintextPassword = "u"; // Ensure this matches the password used in your registration
const storedHash =
  "$2a$10$.FBT.Y2glosplRjtFmcVFup8Sytml8eUWWDPkdoEZV8GPtcLkltDe"; // Replace with actual hash

bcrypt.compare(plaintextPassword, storedHash, (err, isMatch) => {
  if (err) {
    console.error("Error comparing passwords:", err);
    return;
  }
  console.log("Password match:", isMatch); // Should be true if hashing is consistent
});

import bcrypt from "bcryptjs";

async function main() {
  const hash = await bcrypt.hash("Admin@12345", 12);
  console.log(hash);
}

main();

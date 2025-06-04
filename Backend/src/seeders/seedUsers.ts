import bcrypt from "bcryptjs";
import { UserRepository } from "../repositories/userRepository";

async function seedUsers() {
  const userRepository = new UserRepository();

  // Contar usuarios existentes
  const userCount = await userRepository.countUsers();
  if (userCount > 0) {
    console.log("Usuarios ya existen en la base de datos. Seeder cancelado.");
    return;
  }

  // Usuarios de prueba
  const users = [
    {
      email: "admin@test.com",
      password: await bcrypt.hash("admin123", 10),
      role: "admin",
    },
    {
      email: "student@test.com",
      password: await bcrypt.hash("student123", 10),
      role: "student",
    },
  ];

  // Crear usuarios
  for (const user of users) {
    await userRepository.createUser(user);
    console.log(`Usuario creado: ${user.email} con rol ${user.role}`);
  }

  console.log("Seeder completado: usuarios de prueba creados.");
}

// Ejecutar el seeder
seedUsers()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error al ejecutar el seeder:", error);
    process.exit(1);
  });

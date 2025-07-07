// import { Request, Response } from 'express';
// import { db } from '../config/configDb'; // Adjust the path as necessary'
// import {generateToken} from '../utils/jwt/generateToken'
// import { sendResetPasswordEmail } from '../utils/email/sendResetPassword'; // Adjust the path as necessary
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';

// export const registerUser = (req: Request, res: Response) => {
//   const { Nombres, Apellidos, Correo, Contraseña, Sexo } = req.body;

//   if (!Nombres || !Apellidos || !Correo || !Contraseña || !Sexo) {
//     return res.status(400).json({ message: 'Todos los campos son obligatorios' });
//   }

//   const hashedPassword = bcrypt.hashSync(Contraseña, 10);

//   const sql = 'INSERT INTO usuarios (Nombres, Apellidos, Correo, Contraseña, Sexo) VALUES (?, ?, ?, ?, ?)';
//   db.query(sql, [Nombres, Apellidos, Correo, hashedPassword, Sexo], (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ message: 'Error al registrar el usuario' });
//     }
//     res.status(201).json({ message: 'Usuario registrado exitosamente' });
//   });
// };

// export const loginUser = (req: Request, res: Response) => {
//   const { Correo, Contraseña } = req.body;

//   const sql = 'SELECT * FROM usuarios WHERE Correo = ?';
//   db.query(sql, [Correo], (err, results: any) => {
//     if (err) return res.status(500).json({ message: 'Error al consultar' });
//     if (results.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });

//     const valid = bcrypt.compareSync(Contraseña, results[0].Contraseña);
//     if (!valid) return res.status(401).json({ message: 'Contraseña incorrecta' });

//     const token = generateToken({ id: results[0].IdUsuario });
//     res.json({ message: 'Login exitoso', token });
//   });
// };

// export const forgotPassword = (req: Request, res: Response) => {
//   const { Correo } = req.body;

//   if (!Correo) return res.status(400).json({ message: 'Correo requerido' });

//   const sql = 'SELECT * FROM usuarios WHERE Correo = ?';
//   db.query(sql, [Correo], (err, results: any[]) => {
//     if (err) return res.status(500).json({ message: 'Error de base de datos' });
//     if (results.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });

//     const token = jwt.sign({ id: results[0].IdUsuario }, process.env.JWT_SECRET!, { expiresIn: '15m' });

//         // voy a hacer la prueba usando nodemailer
//       sendResetPasswordEmail(Correo, token)
//       .then(() => {
//         res.json({ message: 'Correo de recuperación enviado exitosamente' });
//       })
//       .catch((error) => {
//         console.error('Error al enviar el correo:', error);
//         res.status(500).json({ message: 'No se pudo enviar el correo' });
//       });
//   });
// };


// export const resetPassword = (req: Request, res: Response) => {
//   const { token } = req.params;
//   const { Contraseña } = req.body;

//   if (!Contraseña) return res.status(400).json({ message: 'Contraseña requerida' });

//   console.log("Token recibido:", token);
//   try {
//     const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
//     const userId = decoded.id;

//     const hashedPassword = bcrypt.hashSync(Contraseña, 10);
//     const sql = 'UPDATE usuarios SET Contraseña = ? WHERE IdUsuario = ?';

//     db.query(sql, [hashedPassword, userId], (err, result) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ message: 'Error al actualizar la contraseña' });
//       }

//       res.json({ message: 'Contraseña actualizada correctamente' });
//     });
//   } catch (err) {
//     return res.status(400).json({ message: 'Token inválido o expirado' });
//   }
// };


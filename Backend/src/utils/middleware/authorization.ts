import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Action, useContainer } from "routing-controllers";
import Container from "typedi";

dotenv.config();

// Habilita el uso de typedi en routing-controllers
useContainer(Container);

export const authorizationChecker = async (action: Action, roles: string[]) => {
  const token = action.request.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return false;
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
    action.request.user = decoded;
    return true;
  } catch (error) {
    return false;
  }
};

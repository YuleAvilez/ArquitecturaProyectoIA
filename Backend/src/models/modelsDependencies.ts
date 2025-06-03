import { Session } from "./session/model/sessionModel";
import { User } from "./user/model/userModel";

// Inyectar todos los modelos.
export const ModelsDependencies = [User, Session];

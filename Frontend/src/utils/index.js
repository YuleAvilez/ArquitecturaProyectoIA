import { jwtDecode } from "jwt-decode";
import { Logout } from "../services/api/user/logoutServices";
import { toast } from "react-toastify";

export function getUserIdFromToken() {
  const token = localStorage.getItem("userToken");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.data.userId ?? null;
  } catch (err) {
    return null;
  }
}

export function getUserRoleFromToken() {
  const token = localStorage.getItem("userToken");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.data.roleId ?? null;
  } catch (err) {
    return null;
  }
}

export function isTokenActive() {
  const token = localStorage.getItem("userToken");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000); // En segundos
    return decoded.exp > now;

  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return false;
  }
}

export function clearUserToken() {
  localStorage.removeItem("userToken");
}

export function setUserToken(token) {
  if (!token) return null;
    localStorage.setItem("userToken", token);
}

export function getUserToken() {
  const token = localStorage.getItem("userToken");
  if (!token) return null;
  return token;
}
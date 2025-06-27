import Cookies from "js-cookie";
import type { User, } from "../@types/user";

const COOKIE_KEY = "usuarios_cadastrados";

export function salvarUsuariosNoCookie(users: User[]) {
  Cookies.set(COOKIE_KEY, JSON.stringify(users), { expires: 7 }); 
}

export function obterUsuariosDoCookie(): User[] {
  const cookie = Cookies.get(COOKIE_KEY);
  if (!cookie) return [];
  try {
    return JSON.parse(cookie) as User[];
  } catch {
    return [];
  }
}

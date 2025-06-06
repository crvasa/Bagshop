export interface IUserRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string; // ⛔ meno consigliato
  address: string;
}

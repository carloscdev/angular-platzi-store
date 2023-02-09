export interface UserInterface {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
  creationAt: string;
  updatedAt: string;
}


export interface CreateUserDTO extends Omit<UserInterface, 'id' | 'name' | 'avatar' | 'role' | 'creationAt' | 'updatedAt'> {}

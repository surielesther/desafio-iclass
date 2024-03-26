import { FormControl } from '@angular/forms';

export interface ILoginForm {
  username: FormControl<string>;
  password: FormControl<string>;
};

export interface IUserInfo{
  attributes: {
      locale: string,
      id: string
  },
  email: string,
  fullName: string,
  username: string
}
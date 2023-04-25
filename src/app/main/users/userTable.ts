export class UserTable {
  id?: number;
  accountName!: string;
  userName!: string;
  userSurname!: string;
  eMail!: string;
  role!: string;
  password!: string;
  isEdit?: boolean;
  profileFoto?: string
}

export class Role {
  id!: number;
  role!:string;
  addProduct!:boolean;
  changeProduct!:boolean
  removeProduct!:boolean;
  userAdd!:boolean;
  userChange!:boolean;
  userDelete!:boolean;
  roleAdd!: boolean;
	roleChange!: boolean;
	roleDelete!: boolean;
}

export const ColumnsSchema = [
  {
    key: 'accountName',
    type: 'paragraph',
    label: 'Account',
    required: true
  },
  {
    key: 'userName',
    type: 'text',
    label: 'Name',
  },
  {
    key: 'userSurname',
    type: 'text',
    label: 'Surname',
  },
  {
    key: 'eMail',
    type: 'text',
    label: 'E-mail',
    pattern: ".+@.+"
  },
  {
    key: 'password',
    type: 'password',
    label: 'Password',
    required: true
  },
  {
    key: 'role',
    type: 'check',
    label: 'Role',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];

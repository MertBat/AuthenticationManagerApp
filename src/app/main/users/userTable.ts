export class User {
  id?: number;
  userName!: string;
  name!: string;
  surname!: string;
  eMail!: string;
  authority!: string;
  password!: string;
  isEdit?: boolean;
  url?: string
}

export class Role {
  id!: number;
  roleName!:string;
  permissions!:[]
}
export class Permission{
  id!: number;
  name!:string
}

export const ColumnsSchema = [
  {
    key: 'userName',
    type: 'text',
    label: 'User Name',
  },
  {
    key: 'name',
    type: 'paragraph',
    label: 'Name',
    required: true
  },
  {
    key: 'surname',
    type: 'text',
    label: 'Surname',
  },
  {
    key: 'eMail',
    type: 'text',
    label: 'E-Mail',
    pattern: ".+@.+"
  },
  {
    key: 'password',
    type: 'password',
    label: 'Password',
    required: true
  },
  {
    key: 'authority',
    type: 'check',
    label: 'Role',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];

export interface IDrawerCatalog {
  // setPage: (value: string) => void;
  navigate: (to: string) => void;
  catalogOpen: boolean;
  catalogToggle: () => void;
}

export interface IOrigin {
  vertical: number | 'center' | 'bottom' | 'top';
  horizontal: number | 'center' | 'right' | 'left';
}

export interface ISideBarButton {
  pathname: string;
  path: string;
  // icon?: JSX.Element;
  name: string;
  click: () => void;
}

export interface IUser {
  id: number;
  phone: string;
  firstName: string;
  lastName: string;
  delivery: string;
  locality: string;
  department: string;
  role: string;
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  userData: IUser;
}

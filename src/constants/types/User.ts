export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createDate: Date;
  active: boolean;
  location: {
    lat: number;
    lng: number;
  };
}

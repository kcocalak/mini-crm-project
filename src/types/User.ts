export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createDate: Date;
  location: {
    lat: number;
    lng: number;
  };
}

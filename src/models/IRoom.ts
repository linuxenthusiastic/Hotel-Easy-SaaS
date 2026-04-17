export interface IRoom {
  id: number;
  hotel_id: number;
  type_room_id: number;
  number: string;
  available: number;
}

export interface IRoomWithType extends IRoom {
  type_name: string;
  price_per_night: number;
  capacity: number;
}

import { useState } from 'react';

export interface Room {
  id: string;
  name: string;
  // Add other room properties as needed
}

const useRooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  const addRoom = (newRoom: Room) => {
    setRooms([...rooms, newRoom]);
  };

  const removeRoom = (id: string) => {
    setRooms(rooms.filter((r) => r.id !== id));
  };

  return { rooms, addRoom, removeRoom };
};

export default useRooms;
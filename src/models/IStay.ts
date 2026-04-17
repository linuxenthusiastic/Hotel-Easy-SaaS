export interface IStay {
  id: number;
  guest_id: number;
  room_id: number;
  start_date: string;
  end_date: string;
  status: 'Activa' | 'Finalizada';
  checkin_at: string;
  checkout_at: string | null;
  total: number | null;
}

export interface IStayWithDetails extends IStay {
  full_name: string;
  document_number: string;
  room_number: string;
}

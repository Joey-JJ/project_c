export type ChargeStationType = {
  id: number;
  is_supercharger: boolean;
  created_at: string;
  currently_occupied: boolean;
  current_user_id: string | null;
};

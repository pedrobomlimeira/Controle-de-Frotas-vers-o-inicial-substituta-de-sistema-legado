import { supabase } from "@/lib/supabase";

export const driversApi = {
  async create(data: any) {
    const { data: result, error } = await supabase
      .from("drivers")
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return result;
  },
};

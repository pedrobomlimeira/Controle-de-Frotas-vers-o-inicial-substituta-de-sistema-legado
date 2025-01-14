import { supabase } from "@/lib/supabase";

export const vehiclesApi = {
  async create(data: any) {
    const { data: result, error } = await supabase
      .from("vehicles")
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return result;
  },
};

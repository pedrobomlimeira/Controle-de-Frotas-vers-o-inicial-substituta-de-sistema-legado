import { supabase } from "@/lib/supabase";

export const maintenanceApi = {
  async create(data: any) {
    const { data: result, error } = await supabase
      .from("maintenance")
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return result;

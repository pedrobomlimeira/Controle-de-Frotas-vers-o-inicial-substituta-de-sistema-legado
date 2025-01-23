import { supabase } from "@/lib/supabase";
import {
  Maintenance,
  MaintenanceGroup,
  MaintenanceService,
  VehicleType,
} from "@/types/maintenance";

export const maintenanceApi = {
  // Existing maintenance endpoints
  async create(data: Maintenance) {
    const { data: result, error } = await supabase
      .from("maintenance")
      .insert(data)
      .select()
      .single();
    if (error) throw error;
    return result;
  },

  // Maintenance Groups
  async createGroup(data: Omit<MaintenanceGroup, "id" | "created_at" | "updated_at">) {
    const { data: result, error } = await supabase
      .from("maintenance_groups")
      .insert(data)
      .select()
      .single();
    if (error) throw error;
    return result;
  },

  async updateGroup(id: number, data: Partial<MaintenanceGroup>) {
    const { data: result, error } = await supabase
      .from("maintenance_groups")
      .update(data)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return result;
  },

  async getGroups() {
    const { data, error } = await supabase
      .from("maintenance_groups")
      .select("*")
      .order("description", { ascending: true });
    if (error) throw error;
    return data;
  },

  // Maintenance Services
  async createService(data: Omit<MaintenanceService, "id" | "created_at" | "updated_at">) {
    const { data: result, error } = await supabase
      .from("maintenance_services")
      .insert(data)
      .select()
      .single();
    if (error) throw error;
    return result;
  },

  async updateService(id: number, data: Partial<MaintenanceService>) {
    const { data: result, error } = await supabase
      .from("maintenance_services")
      .update(data)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return result;
  },

  async getServicesByGroup(groupId: number) {
    const { data, error } = await supabase
      .from("maintenance_services")
      .select("*")
      .eq("group_id", groupId)
      .order("description", { ascending: true });
    if (error) throw error;
    return data;
  },

  // Vehicle Types
  async createVehicleType(data: Omit<VehicleType, "id" | "created_at" | "updated_at">) {
    const { data: result, error } = await supabase
      .from("vehicle_types")
      .insert(data)
      .select()
      .single();
    if (error) throw error;
    return result;
  },

  async getVehicleTypes() {
    const { data, error } = await supabase
      .from("vehicle_types")
      .select("*")
      .order("description", { ascending: true });
    if (error) throw error;
    return data;
  },

  async getVehicleTypeById(id: number) {
    const { data, error } = await supabase
      .from("vehicle_types")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },
};

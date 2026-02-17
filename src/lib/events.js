import { supabase } from "../lib/supabaseClient";

export async function getEventById(id) {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error getEventById:", error);
    throw error;
  }

  return data;
}

export async function updateEventById(id, updatedEvent) {
  const { data, error } = await supabase
    .from("events")
    .update(updatedEvent)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updateEventById:", error);
    throw error;
  }

  return data;
}

export async function uploadEventImage(file) {
  if (!file) return null;

  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("event-images")
    .upload(fileName, file);

  if (uploadError) {
    console.error("Error uploadEventImage:", uploadError);
    throw uploadError;
  }

  const { data: publicData } = supabase.storage
    .from("event-images")
    .getPublicUrl(fileName);

  return publicData.publicUrl;
}


export async function fetchEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetchEvents:", error);
    throw error;
  }

  return data;
}

export async function deleteEventById(id) {
  const { error } = await supabase
    .from("events")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleteEventById:", error);
    throw error;
  }
}

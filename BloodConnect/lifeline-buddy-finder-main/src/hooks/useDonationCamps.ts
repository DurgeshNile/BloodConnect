import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export interface DonationCamp {
  id: string;
  name: string;
  location: string;
  date: string;
  start_time: string;
  end_time: string;
  organizer: string;
  contact_phone: string;
  contact_email?: string;
  description?: string;
  max_capacity: number;
  current_registrations: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CampRegistration {
  id: string;
  camp_id: string;
  donor_name: string;
  donor_age: number;
  donor_blood_group: string;
  donor_phone: string;
  donor_email?: string;
  medical_info?: string;
  registration_date: string;
}

export const useDonationCamps = () => {
  const [camps, setCamps] = useState<DonationCamp[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchCamps = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('donation_camps')
        .select('*')
        .eq('is_active', true)
        .order('date', { ascending: true });

      if (error) throw error;

      setCamps(data || []);
    } catch (error) {
      console.error('Error fetching camps:', error);
      toast({
        title: "Error",
        description: "Failed to fetch donation camps",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const registerForCamp = async (registrationData: Omit<CampRegistration, 'id' | 'registration_date'>) => {
    try {
      const { data, error } = await supabase
        .from('camp_registrations')
        .insert([registrationData])
        .select()
        .single();

      if (error) throw error;

      // Update camp registration count
      const camp = camps.find(c => c.id === registrationData.camp_id);
      if (camp) {
        await supabase
          .from('donation_camps')
          .update({ current_registrations: camp.current_registrations + 1 })
          .eq('id', registrationData.camp_id);
      }

      toast({
        title: "Success",
        description: "Successfully registered for the camp!",
      });
      
      await fetchCamps(); // Refresh camps data
      return data;
    } catch (error) {
      console.error('Error registering for camp:', error);
      toast({
        title: "Error",
        description: "Failed to register for camp",
        variant: "destructive",
      });
      throw error;
    }
  };

  useEffect(() => {
    fetchCamps();
  }, []);

  return {
    camps,
    loading,
    registerForCamp,
    refetch: fetchCamps,
  };
};
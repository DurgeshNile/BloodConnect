import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export interface BloodDonor {
  id: string;
  name: string;
  age: number;
  blood_group: string;
  phone: string;
  email?: string;
  city: string;
  address?: string;
  last_donation_date?: string;
  medical_conditions?: string;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export const useBloodDonors = () => {
  const [donors, setDonors] = useState<BloodDonor[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchDonors = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blood_donors')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setDonors(data || []);
    } catch (error) {
      console.error('Error fetching donors:', error);
      toast({
        title: "Error",
        description: "Failed to fetch blood donors",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const registerDonor = async (donorData: Omit<BloodDonor, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('blood_donors')
        .insert([donorData])
        .select()
        .single();

      if (error) throw error;

      setDonors(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Donor registered successfully!",
      });
      return data;
    } catch (error) {
      console.error('Error registering donor:', error);
      toast({
        title: "Error",
        description: "Failed to register donor",
        variant: "destructive",
      });
      throw error;
    }
  };

  const filterDonors = (bloodGroup?: string, city?: string) => {
    return donors.filter(donor => {
      if (bloodGroup && donor.blood_group !== bloodGroup) return false;
      if (city && !donor.city.toLowerCase().includes(city.toLowerCase())) return false;
      return donor.is_available;
    });
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  return {
    donors,
    loading,
    registerDonor,
    filterDonors,
    refetch: fetchDonors,
  };
};
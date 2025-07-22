-- Create blood donors table
CREATE TABLE public.blood_donors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER NOT NULL CHECK (age >= 18 AND age <= 65),
  blood_group TEXT NOT NULL CHECK (blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  phone TEXT NOT NULL,
  email TEXT,
  city TEXT NOT NULL,
  address TEXT,
  last_donation_date DATE,
  medical_conditions TEXT,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create donation camps table
CREATE TABLE public.donation_camps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  organizer TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  contact_email TEXT,
  description TEXT,
  max_capacity INTEGER DEFAULT 100,
  current_registrations INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create camp registrations table
CREATE TABLE public.camp_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  camp_id UUID NOT NULL REFERENCES public.donation_camps(id) ON DELETE CASCADE,
  donor_name TEXT NOT NULL,
  donor_age INTEGER NOT NULL,
  donor_blood_group TEXT NOT NULL,
  donor_phone TEXT NOT NULL,
  donor_email TEXT,
  medical_info TEXT,
  registration_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.blood_donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donation_camps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.camp_registrations ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is a public service)
CREATE POLICY "Anyone can view blood donors" ON public.blood_donors FOR SELECT USING (true);
CREATE POLICY "Anyone can register as donor" ON public.blood_donors FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update donor availability" ON public.blood_donors FOR UPDATE USING (true);

CREATE POLICY "Anyone can view donation camps" ON public.donation_camps FOR SELECT USING (true);
CREATE POLICY "Anyone can create camps" ON public.donation_camps FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view registrations" ON public.camp_registrations FOR SELECT USING (true);
CREATE POLICY "Anyone can register for camps" ON public.camp_registrations FOR INSERT WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_blood_donors_updated_at
  BEFORE UPDATE ON public.blood_donors
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_donation_camps_updated_at
  BEFORE UPDATE ON public.donation_camps
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample camps data
INSERT INTO public.donation_camps (name, location, date, start_time, end_time, organizer, contact_phone, description) VALUES
('City Hospital Blood Drive', 'City Hospital Main Building', '2024-02-15', '09:00:00', '17:00:00', 'City Hospital', '+1-555-0101', 'Regular monthly blood donation camp'),
('Community Center Drive', 'Downtown Community Center', '2024-02-20', '10:00:00', '16:00:00', 'Red Cross Society', '+1-555-0102', 'Community outreach blood donation'),
('University Campus Drive', 'State University Auditorium', '2024-02-25', '11:00:00', '18:00:00', 'Student Health Services', '+1-555-0103', 'Annual university blood donation drive');
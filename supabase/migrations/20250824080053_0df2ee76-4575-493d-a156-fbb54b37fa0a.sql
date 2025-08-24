-- Create attendance records table
CREATE TABLE public.attendance_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  service TEXT NOT NULL,
  service_date DATE NOT NULL,
  ministry_area TEXT NOT NULL,
  section TEXT NOT NULL,
  category TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  user_on_duty TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.attendance_records ENABLE ROW LEVEL SECURITY;

-- Create policies for attendance records (public access for now since no auth)
CREATE POLICY "Anyone can view attendance records" 
ON public.attendance_records 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create attendance records" 
ON public.attendance_records 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update attendance records" 
ON public.attendance_records 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete attendance records" 
ON public.attendance_records 
FOR DELETE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_attendance_records_updated_at
BEFORE UPDATE ON public.attendance_records
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_attendance_records_service_date ON public.attendance_records(service_date);
CREATE INDEX idx_attendance_records_service ON public.attendance_records(service);
CREATE INDEX idx_attendance_records_ministry ON public.attendance_records(ministry_area);
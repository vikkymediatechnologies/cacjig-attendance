-- Create ministries table
CREATE TABLE public.ministries (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  description text,
  sections text[] DEFAULT '{}',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create roles table
CREATE TABLE public.roles (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  description text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create users/ushers table
CREATE TABLE public.ushers (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  pin text NOT NULL UNIQUE,
  ministry_id uuid REFERENCES public.ministries(id),
  role_id uuid REFERENCES public.roles(id),
  is_active boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ministries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ushers ENABLE ROW LEVEL SECURITY;

-- Create policies for ministries
CREATE POLICY "Anyone can view ministries" ON public.ministries FOR SELECT USING (true);
CREATE POLICY "Anyone can create ministries" ON public.ministries FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update ministries" ON public.ministries FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete ministries" ON public.ministries FOR DELETE USING (true);

-- Create policies for roles
CREATE POLICY "Anyone can view roles" ON public.roles FOR SELECT USING (true);
CREATE POLICY "Anyone can create roles" ON public.roles FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update roles" ON public.roles FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete roles" ON public.roles FOR DELETE USING (true);

-- Create policies for ushers
CREATE POLICY "Anyone can view ushers" ON public.ushers FOR SELECT USING (true);
CREATE POLICY "Anyone can create ushers" ON public.ushers FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update ushers" ON public.ushers FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete ushers" ON public.ushers FOR DELETE USING (true);

-- Create triggers for updated_at
CREATE TRIGGER update_ministries_updated_at
  BEFORE UPDATE ON public.ministries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_roles_updated_at
  BEFORE UPDATE ON public.roles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ushers_updated_at
  BEFORE UPDATE ON public.ushers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default data
INSERT INTO public.roles (name, description) VALUES
  ('Leader', 'Church leader with full access'),
  ('Usher', 'Usher for services'),
  ('Teacher', 'Teacher for ministry areas'),
  ('Worker', 'General church worker');

INSERT INTO public.ministries (name, description, sections) VALUES
  ('Main Church', 'Main church services', '{"Havilah", "Sub-Havilah", "Zion", "Sub-Zion"}'),
  ('Teens Church', 'Teen ministry services', '{"Male Teachers", "Female Teachers", "Teens"}'),
  ('Children Church', 'Children ministry services', '{"Male Teachers", "Female Teachers", "Children"}'),
  ('Car Park', 'Car park management', '{"Car Park Workers"}'),
  ('Bible Study', 'Bible study groups', '{"Children", "Youth", "Pastors", "Adults (Male)", "Adults (Female)"}');

-- Insert default ushers (for demo)
INSERT INTO public.ushers (name, pin, ministry_id, role_id) 
SELECT 
  'Main Church Usher', '1234', m.id, r.id
FROM public.ministries m, public.roles r 
WHERE m.name = 'Main Church' AND r.name = 'Usher';

INSERT INTO public.ushers (name, pin, ministry_id, role_id) 
SELECT 
  'Teens Church Teacher', '5678', m.id, r.id
FROM public.ministries m, public.roles r 
WHERE m.name = 'Teens Church' AND r.name = 'Teacher';

INSERT INTO public.ushers (name, pin, ministry_id, role_id) 
SELECT 
  'Children Church Teacher', '9012', m.id, r.id
FROM public.ministries m, public.roles r 
WHERE m.name = 'Children Church' AND r.name = 'Teacher';

INSERT INTO public.ushers (name, pin, ministry_id, role_id) 
SELECT 
  'Church Leader', '0000', m.id, r.id
FROM public.ministries m, public.roles r 
WHERE m.name = 'Main Church' AND r.name = 'Leader';
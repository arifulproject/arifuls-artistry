
-- Allow first admin setup: if no admin exists, any authenticated user can insert their own admin role
CREATE OR REPLACE FUNCTION public.is_first_admin_setup()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT NOT EXISTS (
    SELECT 1 FROM public.user_roles WHERE role = 'admin'
  )
$$;

-- Policy: allow first admin self-assignment
CREATE POLICY "First admin can self-assign" ON public.user_roles
  FOR INSERT TO authenticated
  WITH CHECK (
    public.is_first_admin_setup() AND user_id = auth.uid() AND role = 'admin'
  );

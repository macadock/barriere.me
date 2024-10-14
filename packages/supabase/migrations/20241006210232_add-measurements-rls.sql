ALTER TABLE public.measurements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow logged in user to create, update and delete a measurement"
    ON public.measurements
    FOR ALL
    TO authenticated
    USING ( auth.uid() = user_id OR (auth.uid() IS NOT NULL AND user_id IS NULL) )
    WITH CHECK ( auth.uid() = user_id );

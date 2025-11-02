import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://posfsbezarkqcwofgywa.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvc2ZzYmV6YXJrcWN3b2ZneXdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwOTE0OTksImV4cCI6MjA3NzY2NzQ5OX0.8ampOi59ansfVj6P7Yla5Oegdva48OQGDleN7kTC1fA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

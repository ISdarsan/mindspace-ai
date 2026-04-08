import pg from 'pg';
const { Client } = pg;

const connectionString = "postgresql://postgres:Ponnugayu%402004@db.wzywbduszyqnohpotvcq.supabase.co:6543/postgres?sslmode=require";
// Note: Changed 5432 to 6543 which is Supabase's transaction pooler port, ensuring IPv4 compatibility if not running on IPv6.

const client = new Client({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

const setupDatabase = async () => {
  try {
    console.log("Connecting to Supabase...");
    await client.connect();
    console.log("Connected successfully!");

    const sql = `
      -- Create the thoughts table
      CREATE TABLE IF NOT EXISTS public.thoughts (
        id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
        user_id uuid REFERENCES auth.users(id),
        thought_text text NOT NULL,
        emotion text,
        analysis text,
        overthinking text,
        reframe text,
        actions jsonb,
        mood integer,
        created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
      );

      -- Enable Row Level Security
      ALTER TABLE public.thoughts ENABLE ROW LEVEL SECURITY;

      -- Drop existing policies if they exist so we can recreate them
      DROP POLICY IF EXISTS "Users can insert their own thoughts" ON public.thoughts;
      DROP POLICY IF EXISTS "Users can view their own thoughts" ON public.thoughts;

      -- Allow authenticated users to insert/read their own thoughts
      CREATE POLICY "Users can insert their own thoughts" ON public.thoughts 
        FOR INSERT WITH CHECK (auth.uid() = user_id);

      CREATE POLICY "Users can view their own thoughts" ON public.thoughts 
        FOR SELECT USING (auth.uid() = user_id);
      
      console.log("Database initialized successfully!");
    `;

    console.log("Running schema creation script...");
    await client.query(sql);
    console.log("Schema creation script completed!");

  } catch (err) {
    console.error("Database connection/query error:", err);
  } finally {
    await client.end();
  }
};

setupDatabase();

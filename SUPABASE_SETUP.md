# Supabase Setup Guide

This guide will help you set up the Supabase database for the Polaris Voice+ application.

## Prerequisites

1. A Supabase account and project
2. Your Supabase project URL and anon key (already configured in `.env.local`)

## Database Setup

### Step 1: Run the Initial Migration

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
4. Run the SQL script to create all necessary tables and policies

### Step 2: Seed the Database (Optional)

1. In the SQL Editor, copy and paste the contents of `supabase/seed.sql`
2. Run the script to populate the database with sample data
3. This will create demo users, KPIs, feedback, surveys, alerts, and reports

## Verification

After running the migrations and seed data:

1. Check the Tables section in your Supabase dashboard
2. You should see the following tables:
   - `users`
   - `kpis`
   - `voc_feedback`
   - `voe_feedback`
   - `surveys`
   - `alerts`
   - `reports`

3. Each table should have sample data if you ran the seed script

## Environment Variables

Make sure your `.env.local` file contains:

```env
NEXT_PUBLIC_SUPABASE_URL=https://zzggiwywqnopgfznlrxu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6Z2dpd3l3cW5vcGdmem5scnh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2OTU1ODMsImV4cCI6MjA2NzI3MTU4M30.rqiDoDDXNG7MNg7tmFBGTfYpOSEwoZspvXv_oYlVA0c
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.zzggiwywqnopgfznlrxu.supabase.co:5432/postgres
```

## Testing the Connection

Once the database is set up:

1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:3000`
3. The dashboard should load with real data from Supabase
4. Check the VoC Analytics and VoE Insights pages to see the data

## Troubleshooting

### Common Issues:

1. **Connection Error**: Verify your environment variables are correct
2. **No Data Showing**: Make sure you ran the seed script
3. **Permission Errors**: Check that RLS policies are properly configured

### RLS (Row Level Security)

The migration script includes RLS policies that:
- Allow authenticated users to read all data
- Allow authenticated users to insert/update their own data
- Provide public read access for demo purposes

## Next Steps

After successful setup:

1. Customize the sample data to match your needs
2. Set up authentication (NextAuth.js is already configured)
3. Configure real-time subscriptions for live updates
4. Add more sophisticated RLS policies for production use

## Support

If you encounter issues:

1. Check the Supabase project logs
2. Verify the SQL scripts ran without errors
3. Test the connection using the Supabase dashboard API explorer
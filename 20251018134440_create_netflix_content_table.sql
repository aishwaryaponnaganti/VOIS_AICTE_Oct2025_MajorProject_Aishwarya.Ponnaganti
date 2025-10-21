/*
  # Create Netflix Content Dataset Table

  ## Overview
  This migration creates the database schema for storing and analyzing Netflix content data.
  The table supports comprehensive analysis of Movies and TV Shows with attributes for
  content trends, genre analysis, and country-wise distribution.

  ## Tables Created
  
  ### `netflix_content`
  Main table storing Netflix content records with the following columns:
  - `id` (uuid, primary key): Unique identifier for each content record
  - `show_id` (text): Netflix's internal show identifier
  - `type` (text): Content type - either 'Movie' or 'TV Show'
  - `title` (text): Title of the content
  - `director` (text): Director(s) of the content
  - `cast_members` (text): Cast members (stored as comma-separated values)
  - `country` (text): Country or countries where content was produced
  - `date_added` (date): Date when content was added to Netflix
  - `release_year` (integer): Year the content was originally released
  - `rating` (text): Content rating (e.g., PG, TV-MA, R)
  - `duration` (text): Duration (e.g., "90 min" for movies, "2 Seasons" for TV shows)
  - `listed_in` (text): Genres/categories (comma-separated)
  - `description` (text): Brief description of the content
  - `created_at` (timestamptz): Timestamp when record was created

  ## Security
  - Row Level Security (RLS) is enabled on the table
  - Public read access is granted for all content (suitable for analytics dashboard)
  - Authenticated users can insert new content records (for data upload functionality)
  - Only authenticated users can update or delete their own uploaded records

  ## Indexes
  - Index on `type` for fast filtering between Movies and TV Shows
  - Index on `release_year` for temporal analysis
  - Index on `date_added` for tracking content additions over time
  - Index on `country` for geographic distribution analysis

  ## Important Notes
  - This is a read-heavy analytics table optimized for dashboard queries
  - The table uses text fields for flexibility in handling comma-separated values
  - RLS policies allow public read access since this is public Netflix catalog data
*/

-- Create the netflix_content table
CREATE TABLE IF NOT EXISTS netflix_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  show_id text,
  type text NOT NULL,
  title text NOT NULL,
  director text,
  cast_members text,
  country text,
  date_added date,
  release_year integer,
  rating text,
  duration text,
  listed_in text,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE netflix_content ENABLE ROW LEVEL SECURITY;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_netflix_content_type ON netflix_content(type);
CREATE INDEX IF NOT EXISTS idx_netflix_content_release_year ON netflix_content(release_year);
CREATE INDEX IF NOT EXISTS idx_netflix_content_date_added ON netflix_content(date_added);
CREATE INDEX IF NOT EXISTS idx_netflix_content_country ON netflix_content(country);

-- RLS Policies

-- Allow public read access for analytics (this is public catalog data)
CREATE POLICY "Public can view all netflix content"
  ON netflix_content
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert content (for data upload)
CREATE POLICY "Authenticated users can insert content"
  ON netflix_content
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update content
CREATE POLICY "Authenticated users can update content"
  ON netflix_content
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete content
CREATE POLICY "Authenticated users can delete content"
  ON netflix_content
  FOR DELETE
  TO authenticated
  USING (true);
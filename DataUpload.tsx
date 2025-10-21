import { useState } from 'react';
import { Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function DataUpload() {
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage(null);

    try {
      const text = await file.text();
      const lines = text.split('\n');
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));

      const records = [];
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;

        const values = lines[i].match(/(".*?"|[^,]+)(?=\s*,|\s*$)/g) || [];
        const cleanValues = values.map(v => v.trim().replace(/^"|"$/g, ''));

        if (cleanValues.length < headers.length) continue;

        const record: any = {};
        headers.forEach((header, index) => {
          const value = cleanValues[index] || null;

          switch (header.toLowerCase()) {
            case 'show_id':
              record.show_id = value;
              break;
            case 'type':
              record.type = value;
              break;
            case 'title':
              record.title = value;
              break;
            case 'director':
              record.director = value;
              break;
            case 'cast':
              record.cast_members = value;
              break;
            case 'country':
              record.country = value;
              break;
            case 'date_added':
              record.date_added = value ? new Date(value).toISOString().split('T')[0] : null;
              break;
            case 'release_year':
              record.release_year = value ? parseInt(value) : null;
              break;
            case 'rating':
              record.rating = value;
              break;
            case 'duration':
              record.duration = value;
              break;
            case 'listed_in':
              record.listed_in = value;
              break;
            case 'description':
              record.description = value;
              break;
          }
        });

        if (record.title && record.type) {
          records.push(record);
        }
      }

      const { error } = await supabase
        .from('netflix_content')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');

      if (error) throw error;

      const batchSize = 100;
      for (let i = 0; i < records.length; i += batchSize) {
        const batch = records.slice(i, i + batchSize);
        const { error: insertError } = await supabase
          .from('netflix_content')
          .insert(batch);

        if (insertError) throw insertError;
      }

      setMessage({ type: 'success', text: `Successfully uploaded ${records.length} records!` });
    } catch (error) {
      console.error('Upload error:', error);
      setMessage({ type: 'error', text: 'Failed to upload data. Please check the CSV format.' });
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Upload Netflix Dataset</h2>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-red-500 transition-colors">
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <label className="cursor-pointer">
          <span className="text-sm text-gray-600">
            {uploading ? 'Uploading...' : 'Click to upload CSV file'}
          </span>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
        <p className="text-xs text-gray-500 mt-2">
          CSV format with columns: show_id, type, title, director, cast, country, date_added, release_year, rating, duration, listed_in, description
        </p>
      </div>

      {message && (
        <div className={`mt-4 p-4 rounded-lg flex items-center gap-3 ${
          message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )}
          <span>{message.text}</span>
        </div>
      )}
    </div>
  );
}

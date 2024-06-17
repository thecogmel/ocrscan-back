/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class UploadService {
  async uploadFile(file: Express.Multer.File) {
    const supabaseURL = 'https://nvtvaoijcjxlhzspqwdh.supabase.co';
    const supabaseKey =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52dHZhb2lqY2p4bGh6c3Bxd2RoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxODY0MzgyNywiZXhwIjoyMDM0MjE5ODI3fQ.bPIJUgf4KUOEVf3_CJ5OX34S0utu8byBM0ExazqP1Jc';
    const supabase = createClient(supabaseURL, supabaseKey, {
      auth: {
        persistSession: false,
      },
    });

    return await supabase.storage
      .from('ocr')
      .upload(file.originalname, file.buffer, { upsert: true });
  }
}

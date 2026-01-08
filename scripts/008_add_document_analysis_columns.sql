-- Add columns for enhanced document analysis
ALTER TABLE documents
ADD COLUMN IF NOT EXISTS simplified_summary TEXT,
ADD COLUMN IF NOT EXISTS study_tips JSONB,
ADD COLUMN IF NOT EXISTS prerequisites JSONB,
ADD COLUMN IF NOT EXISTS learning_objectives JSONB,
ADD COLUMN IF NOT EXISTS processed BOOLEAN DEFAULT FALSE;

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_documents_processed ON documents(processed);
CREATE INDEX IF NOT EXISTS idx_documents_user_processed ON documents(user_id, processed);

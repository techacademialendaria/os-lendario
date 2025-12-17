// Database types for Supabase
// Based on mmos-schema.md

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      content_projects: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string | null;
          project_type: string | null;
          status: string | null;
          target_audience_id: string | null;
          creator_mind_id: string | null;
          persona_mind_id: string | null;
          default_frameworks: Json | null;
          project_metadata: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          description?: string | null;
          project_type?: string | null;
          status?: string | null;
          target_audience_id?: string | null;
          creator_mind_id?: string | null;
          persona_mind_id?: string | null;
          default_frameworks?: Json | null;
          project_metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          description?: string | null;
          project_type?: string | null;
          status?: string | null;
          target_audience_id?: string | null;
          creator_mind_id?: string | null;
          persona_mind_id?: string | null;
          default_frameworks?: Json | null;
          project_metadata?: Json;
          created_at?: string;
          updated_at?: string;
        };
      };
      contents: {
        Row: {
          id: string;
          slug: string;
          title: string;
          content_type: string;
          content: string | null;
          parent_content_id: string | null;
          sequence_order: number | null;
          project_id: string | null;
          ai_generated: boolean;
          generation_execution_id: string | null;
          fidelity_score: number | null;
          status: string | null;
          published_at: string | null;
          published_url: string | null;
          file_path: string | null;
          metadata: Json;
          deleted_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          content_type: string;
          content?: string | null;
          parent_content_id?: string | null;
          sequence_order?: number | null;
          project_id?: string | null;
          ai_generated?: boolean;
          generation_execution_id?: string | null;
          fidelity_score?: number | null;
          status?: string | null;
          published_at?: string | null;
          published_url?: string | null;
          file_path?: string | null;
          metadata?: Json;
          deleted_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          content_type?: string;
          content?: string | null;
          parent_content_id?: string | null;
          sequence_order?: number | null;
          project_id?: string | null;
          ai_generated?: boolean;
          generation_execution_id?: string | null;
          fidelity_score?: number | null;
          status?: string | null;
          published_at?: string | null;
          published_url?: string | null;
          file_path?: string | null;
          metadata?: Json;
          deleted_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      minds: {
        Row: {
          id: string;
          slug: string;
          name: string;
          primary_language: string | null;
          short_bio: string | null;
          privacy_level: string;
          apex_score: number | null;
          created_by: string | null;
          mmos_metadata: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          primary_language?: string | null;
          short_bio?: string | null;
          privacy_level?: string;
          apex_score?: number | null;
          created_by?: string | null;
          mmos_metadata?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          primary_language?: string | null;
          short_bio?: string | null;
          privacy_level?: string;
          apex_score?: number | null;
          created_by?: string | null;
          mmos_metadata?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      audience_profiles: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string | null;
          demographics: Json | null;
          psychographics: Json | null;
          technical_level: string | null;
          learning_preferences: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          description?: string | null;
          demographics?: Json | null;
          psychographics?: Json | null;
          technical_level?: string | null;
          learning_preferences?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          description?: string | null;
          demographics?: Json | null;
          psychographics?: Json | null;
          technical_level?: string | null;
          learning_preferences?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      content_frameworks: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string | null;
          framework_type: string | null;
          framework_schema: Json | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          description?: string | null;
          framework_type?: string | null;
          framework_schema?: Json | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          description?: string | null;
          framework_type?: string | null;
          framework_schema?: Json | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

// Convenience types
export type ContentProject = Database['public']['Tables']['content_projects']['Row'];
export type Content = Database['public']['Tables']['contents']['Row'];
export type Mind = Database['public']['Tables']['minds']['Row'];
export type AudienceProfile = Database['public']['Tables']['audience_profiles']['Row'];
export type ContentFramework = Database['public']['Tables']['content_frameworks']['Row'];

// Extended types with relations
export interface ContentProjectWithRelations extends ContentProject {
  persona_mind?: Mind | null;
  creator_mind?: Mind | null;
  target_audience?: AudienceProfile | null;
  contents?: Content[];
  modules_count?: number;
  lessons_count?: number;
}

// Course-specific metadata type
export interface CourseMetadata {
  duration_hours?: number;
  num_modules?: number;
  num_lessons?: number;
  target_audience?: string;
  price_brl?: number;
  pedagogical_framework?: string;
  workflow_stage?: string;
  brief_complete?: boolean;
  research_complete?: boolean;
  curriculum_complete?: boolean;
  lessons_generated?: number;
  lessons_total?: number;
}

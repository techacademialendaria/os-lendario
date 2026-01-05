// Database types for Supabase
// Based on mmos-schema.md

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

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
          image_url: string | null;
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
          image_url?: string | null;
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
          image_url?: string | null;
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
          image_url: string | null;
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
          image_url?: string | null;
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
          image_url?: string | null;
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
          avatar_url: string | null;
          privacy_level: string;
          apex_score: number | null;
          created_by: string | null;
          mmos_metadata: Json | null;
          deleted_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          primary_language?: string | null;
          short_bio?: string | null;
          avatar_url?: string | null;
          privacy_level?: string;
          apex_score?: number | null;
          created_by?: string | null;
          mmos_metadata?: Json | null;
          deleted_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          primary_language?: string | null;
          short_bio?: string | null;
          avatar_url?: string | null;
          privacy_level?: string;
          apex_score?: number | null;
          created_by?: string | null;
          mmos_metadata?: Json | null;
          deleted_at?: string | null;
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
      frameworks: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string;
          framework_type: string;
          structure_type: string;
          output_format: string | null;
          framework_schema: Json;
          is_active: boolean | null;
          parent_framework_id: string | null;
          origin_mind_id: string | null;
          when_to_use: string | null;
          created_at: string | null;
          updated_at: string | null;
          deleted_at: string | null;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          description: string;
          framework_type: string;
          structure_type: string;
          output_format?: string | null;
          framework_schema?: Json;
          is_active?: boolean | null;
          parent_framework_id?: string | null;
          origin_mind_id?: string | null;
          when_to_use?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          deleted_at?: string | null;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          description?: string;
          framework_type?: string;
          structure_type?: string;
          output_format?: string | null;
          framework_schema?: Json;
          is_active?: boolean | null;
          parent_framework_id?: string | null;
          origin_mind_id?: string | null;
          when_to_use?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
          deleted_at?: string | null;
        };
      };
      fragments: {
        Row: {
          id: string;
          mind_id: string | null;
          content_id: string | null;
          location: string;
          type: string;
          content: string;
          context: string | null;
          insight: string | null;
          relevance: number;
          confidence: number | null;
          metadata: Json | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          mind_id?: string | null;
          content_id?: string | null;
          location: string;
          type: string;
          content: string;
          context?: string | null;
          insight?: string | null;
          relevance?: number;
          confidence?: number | null;
          metadata?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          mind_id?: string | null;
          content_id?: string | null;
          location?: string;
          type?: string;
          content?: string;
          context?: string | null;
          insight?: string | null;
          relevance?: number;
          confidence?: number | null;
          metadata?: Json | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      miu_driver_evidence: {
        Row: {
          id: string;
          miu_id: string;
          driver_id: string;
          strength: number;
          evidence: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          miu_id: string;
          driver_id: string;
          strength: number;
          evidence?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          miu_id?: string;
          driver_id?: string;
          strength?: number;
          evidence?: string | null;
          created_at?: string;
        };
      };
      inference_executions: {
        Row: {
          id: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          status: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          status?: string;
          created_at?: string;
        };
      };
      schema_inspections: {
        Row: {
          id: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          status: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          status?: string;
          created_at?: string;
        };
      };
      content_minds: {
        Row: {
          id: string;
          content_id: string;
          mind_id: string;
          role: string;
          contribution_notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          content_id: string;
          mind_id: string;
          role: string;
          contribution_notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          content_id?: string;
          mind_id?: string;
          role?: string;
          contribution_notes?: string | null;
          created_at?: string;
        };
      };
      content_tags: {
        Row: {
          id: string;
          content_id: string;
          tag_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          content_id: string;
          tag_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          content_id?: string;
          tag_id?: string;
          created_at?: string;
        };
      };
      tags: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string | null;
          tag_type: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          description?: string | null;
          tag_type: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          description?: string | null;
          tag_type?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      // RBAC Tables
      roles: {
        Row: {
          id: string;
          display_name: string;
          description: string | null;
          hierarchy_level: number;
          permissions: Json;
          created_at: string;
        };
        Insert: {
          id: string;
          display_name: string;
          description?: string | null;
          hierarchy_level: number;
          permissions?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string;
          description?: string | null;
          hierarchy_level?: number;
          permissions?: Json;
          created_at?: string;
        };
      };
      user_roles: {
        Row: {
          id: string;
          user_id: string;
          role_id: string;
          scope_type: string;
          scope_id: string | null;
          areas: string[];
          granted_by: string | null;
          granted_at: string;
          expires_at: string | null;
          notes: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          role_id: string;
          scope_type?: string;
          scope_id?: string | null;
          areas?: string[];
          granted_by?: string | null;
          granted_at?: string;
          expires_at?: string | null;
          notes?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          role_id?: string;
          scope_type?: string;
          scope_id?: string | null;
          areas?: string[];
          granted_by?: string | null;
          granted_at?: string;
          expires_at?: string | null;
          notes?: string | null;
        };
      };
      user_invites: {
        Row: {
          id: string;
          email: string;
          token: string;
          role_id: string;
          areas: string[];
          message: string | null;
          invited_by: string;
          invited_at: string;
          expires_at: string;
          accepted_at: string | null;
          accepted_by: string | null;
          cancelled_at: string | null;
          status: string;
        };
        Insert: {
          id?: string;
          email: string;
          token?: string;
          role_id: string;
          areas?: string[];
          message?: string | null;
          invited_by: string;
          invited_at?: string;
          expires_at: string;
          accepted_at?: string | null;
          accepted_by?: string | null;
          cancelled_at?: string | null;
          status?: string;
        };
        Update: {
          id?: string;
          email?: string;
          token?: string;
          role_id?: string;
          areas?: string[];
          message?: string | null;
          invited_by?: string;
          invited_at?: string;
          expires_at?: string;
          accepted_at?: string | null;
          accepted_by?: string | null;
          cancelled_at?: string | null;
          status?: string;
        };
      };
    };
    Views: {
      v_user_management: {
        Row: {
          user_id: string | null;
          email: string | null;
          full_name: string | null;
          avatar_url: string | null;
          mind_id: string | null;
          mind_name: string | null;
          mind_slug: string | null;
          role_id: string | null;
          role_display_name: string | null;
          hierarchy_level: number | null;
          areas: string[] | null;
          scope_type: string | null;
          scope_id: string | null;
          granted_at: string | null;
          expires_at: string | null;
          registered_at: string | null;
          last_sign_in_at: string | null;
        };
      };
    };
    Functions: {
      soft_delete_fragment: {
        Args: {
          fragment_id: string;
        };
        Returns: void;
      };
      soft_delete_fragments_by_content: {
        Args: {
          p_content_id: string;
        };
        Returns: void;
      };
      // RBAC Helper Functions
      get_user_max_hierarchy: {
        Args: Record<PropertyKey, never>;
        Returns: number;
      };
      is_owner: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      is_admin_or_above: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      is_collaborator_or_above: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      is_student_or_above: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
      get_current_role: {
        Args: Record<PropertyKey, never>;
        Returns: string | null;
      };
      has_area: {
        Args: {
          p_area: string;
        };
        Returns: boolean;
      };
      get_user_areas: {
        Args: Record<PropertyKey, never>;
        Returns: string[];
      };
      has_mind_access: {
        Args: {
          p_mind_id: string;
          p_min_hierarchy?: number;
        };
        Returns: boolean;
      };
      has_permission: {
        Args: {
          p_permission: string;
        };
        Returns: boolean;
      };
      // RBAC Management Functions
      grant_user_role: {
        Args: {
          p_user_id: string;
          p_role_id: string;
          p_scope_type?: string;
          p_scope_id?: string | null;
          p_areas?: string[];
          p_expires_at?: string | null;
          p_notes?: string | null;
        };
        Returns: string;
      };
      revoke_user_role: {
        Args: {
          p_user_id: string;
          p_role_id: string;
          p_scope_type?: string;
          p_scope_id?: string | null;
        };
        Returns: boolean;
      };
      update_user_areas: {
        Args: {
          p_user_id: string;
          p_areas: string[];
        };
        Returns: boolean;
      };
      // Invite Functions
      create_user_invite: {
        Args: {
          p_email: string;
          p_role_id: string;
          p_areas?: string[];
          p_message?: string | null;
          p_expires_days?: number;
        };
        Returns: string;
      };
      get_invite_by_token: {
        Args: {
          p_token: string;
        };
        Returns: Json;
      };
      accept_invite: {
        Args: {
          p_token: string;
        };
        Returns: boolean;
      };
      cancel_invite: {
        Args: {
          p_invite_id: string;
        };
        Returns: boolean;
      };
      list_pending_invites: {
        Args: Record<PropertyKey, never>;
        Returns: Json;
      };
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
export type Framework = Database['public']['Tables']['frameworks']['Row'];

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

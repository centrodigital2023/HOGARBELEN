/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_SITE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Declaración para Spark SDK
interface Window {
  spark?: {
    llm?: (prompt: string, model: string, stream: boolean) => Promise<string>;
    llmPrompt?: TemplateStringsArray;
    kv?: {
      get: <T = any>(key: string) => Promise<T | null>;
      set: (key: string, value: any) => Promise<void>;
      delete: (key: string) => Promise<void>;
    };
  };
}

declare const GITHUB_RUNTIME_PERMANENT_NAME: string
declare const BASE_KV_SERVICE_URL: string
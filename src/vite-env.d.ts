/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Access key pública de Web3Forms. Sin ella el formulario entra en modo demostración. */
  readonly VITE_WEB3FORMS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

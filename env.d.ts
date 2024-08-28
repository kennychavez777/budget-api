declare namespace NodeJS {
  interface ProcessEnv {
    DB_PORT?: string;
    DB_HOST: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
  }
}

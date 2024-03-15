// node-env.d.ts

// Define type for the global `process` variable
declare namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      // Add other environment variables here if needed
    }
  }
  
export interface Configuration {
  debug: boolean;
  port: number;
  prefix: string;
}

export const loadConfig = (): Configuration => {
  return {
    debug: parseInt(process.env.DEBUG || '0') > 0,
    port: parseInt(process.env.PORT || '3000', 10) || 3000,
    prefix:process.env.PREFIX || '',
  }
}

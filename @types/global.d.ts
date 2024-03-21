declare global {
  type Timeout = NodeJS.Timeout | null | number;
}
declare var process: {
  env: Record<string, string>;
};

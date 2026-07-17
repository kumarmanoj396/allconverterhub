declare module "@imgly/background-removal" {
  export interface BackgroundRemovalConfig {
    progress?: (key: string, current: number, total: number) => void;
  }

  export function removeBackground(
    input: Blob | File | string,
    config?: BackgroundRemovalConfig,
  ): Promise<Blob>;
}

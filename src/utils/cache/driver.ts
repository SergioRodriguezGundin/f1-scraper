import { Driver } from '../../xata';

export class DriverCache {
  private static instance: DriverCache;
  private cache: Record<string, Driver> = {};

  public static getInstance(): DriverCache {
    if (!DriverCache.instance) {
      DriverCache.instance = new DriverCache();
    }
    return DriverCache.instance;
  }

  public get(driverName: string): Driver | null {
    return this.cache[driverName] || null;
  }

  public set(driver: Driver): void {
    if (driver.name) {
      this.cache[driver.name] = driver;
    }
  }

  public has(driverName: string): boolean {
    return !!this.cache[driverName];
  }

  public clear(): void {
    this.cache = {};
  }

  public getAll(): Record<string, Driver> {
    return { ...this.cache };
  }
}

// Export a default instance
export const driverCache = DriverCache.getInstance();

import { Extractor } from '../interfaces/extractor.interface';
import { driverModel } from '../models/driver.model';
import { extractElement } from '../utils/extractor';
import { DRIVERS, F1_URL, F1_YEAR, RESULTS } from '../utils/globals';
import { Driver } from '../xata';

export const getDrivers = async (env: Env): Promise<Driver[]> => {
  const url = `${F1_URL}/${RESULTS}/${F1_YEAR}/${DRIVERS}`;
  try {
    const response = await fetch(url);
    const html = await response.text();

    const driver: Driver = driverModel;

    const extractor: Extractor<Driver> = {
      f1Object: driver,
      retrieveAdditionalData: setDriverImage,
    };
    const drivers: Driver[] = await extractElement<Driver>(html, extractor, env);

    return drivers.sort((a, b) => a.position - b.position);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch driver data");
  }
}

export const setDriverImage = async (driver: Driver, env: Env) => {
  const nameParts = driver.name.split(' ');
  const nationality = driver.nationality;

  const keyName = nameParts[nameParts.length - 1];
  const image = await env.F1_ASSETS.get(keyName, { type: "text", cacheTtl: 3600 });
  const flag = await env.F1_ASSETS.get(nationality, { type: "text", cacheTtl: 3600 });

  if (image === null) {
    throw new Error(`Image with key ${keyName} not found`);
  }

  if (flag === null) {
    throw new Error(`Flag with key ${nationality} not found`);
  }

  driver.image = image;
  driver.nationality = flag;
}

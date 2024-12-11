import { CheerioAPI, Element, load } from 'cheerio';
import { TABLE_ELEMENT } from './globals';
import { Extractor } from '../interfaces/extractor.interface';

/**
 * Extracts the data from the HTML table and returns an array of F1 objects.
 * @param html - The HTML string to extract the data from.
 * @param f1Object - The F1 object to set the data to.
 * @param retrieveAdditionalData - An optional function to retrieve additional data.
 * @param env - The environment variables.
 * @returns An array of F1 objects.
 */
export const extractElement = async <T extends object>(html: string, extractor: Extractor<T>, env?: Env): Promise<T[]> => {
  const { f1Object, retrieveAdditionalData } = extractor;
  const $: CheerioAPI = load(html);
  const results: T[] = [];

  const promises = $(TABLE_ELEMENT).map(async (index, row) => {
    const f1ObjectCopy = { ...f1Object };
    Object.keys(f1Object).forEach((key, resultIndex) => {
      if ((key === 'name' && f1Object.hasOwnProperty('nationality')) || key === 'driver' || key === 'winner') {
        f1ObjectCopy[key as keyof T] = setDriverName(row, $, f1Object) as T[keyof T];
      } else if (key === 'position') {
        f1ObjectCopy[key as keyof T] = setPosition(row, $, resultIndex) as T[keyof T];
      } else {
        f1ObjectCopy[key as keyof T] = setText(row, $, resultIndex) as T[keyof T];
      }
    });

    if (retrieveAdditionalData && env) {
      await retrieveAdditionalData(f1ObjectCopy, env);
    }
    results.push(f1ObjectCopy);
  }).get();

  await Promise.all(promises);
  return results;
};

const setDriverName = <T extends object>(row: Element, $: CheerioAPI, f1Object: T) => {
  const searchString = getSearchString(f1Object);

  const driverFirstName = $(row).find(`${searchString} > :first-child`).text();
  const driverLastName = $(row).find(`${searchString} > :nth-child(2)`).text();
  const driverAlias = $(row).find(`${searchString} > :last-child`).text();
  return driverAlias === 'ZHO' ? `${driverLastName} ${driverFirstName} ${driverAlias}` : `${driverFirstName} ${driverLastName} ${driverAlias}`;
};

const setPosition = (row: Element, $: CheerioAPI, resultIndex: number) => {
  const position = $(row).find(`td:nth-child(${resultIndex + 1})`).text().replace(/\s+/g, ' ').trim();
  return position === 'NC' || position === 'DQ' ? 99 : Number(position);
};

const setText = (row: Element, $: CheerioAPI, resultIndex: number) => {
  const text = $(row).find(`td:nth-child(${resultIndex + 1})`).text().replace(/\s+/g, ' ').trim();
  return /^\d+$/.test(text) ? Number(text) : text;
};

const getSearchString = <T extends object>(f1Object: T): string => {
  if (f1Object.hasOwnProperty('nationality')) {
    return 'tr > td:nth-child(2) > p > a';
  }
  return 'tr > td:nth-child(3) > p';
};
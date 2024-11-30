import { CheerioAPI, Element, load } from 'cheerio';
import { TABLE_ELEMENT } from './globals';

export const extractElement = async <T extends object>(html: string, f1Object: T, retrieveAdditionalData?: (f1Object: T, env: Env) => Promise<void>, env?: Env): Promise<T[]> => {
  const $: CheerioAPI = load(html);
  const results: T[] = [];

  const promises = $(TABLE_ELEMENT).map(async (index, row) => {
    const f1ObjectCopy = { ...f1Object };
    Object.keys(f1Object).forEach((key, resultIndex) => {
      if (key === 'driver' || key === 'winner') {
        f1ObjectCopy[key as keyof T] = setDriverName(row, $) as T[keyof T];
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

const setDriverName = (row: Element, $: CheerioAPI) => {
  const driverFirstName = $(row).find(`tr > td:nth-child(3) > p > :first-child`).text();
  const driverLastName = $(row).find(`tr > td:nth-child(3) > p > :nth-child(2)`).text();
  const driverAlias = $(row).find(`tr > td:nth-child(3) > p > :last-child`).text();
  return driverAlias === 'ZHO' ? `${driverLastName} ${driverFirstName} ${driverAlias}` : `${driverFirstName} ${driverLastName} ${driverAlias}`;
};

const setPosition = (row: Element, $: CheerioAPI, resultIndex: number) => {
  const position = $(row).find(`td:nth-child(${resultIndex + 2})`).text().replace(/\s+/g, ' ').trim();
  return position === 'NC' ? 99 : Number(position);
};

const setText = (row: Element, $: CheerioAPI, resultIndex: number) => {
  const text = $(row).find(`td:nth-child(${resultIndex + 1})`).text().replace(/\s+/g, ' ').trim();
  return /^\d+$/.test(text) ? Number(text) : text;
};

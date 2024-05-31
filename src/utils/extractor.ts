import { CheerioAPI, Element, load } from 'cheerio';
import { TABLE_ELEMENT } from './globals';

export const extractElement = async <T extends object>(html: string, f1Object: T, retrieveAdditionalData?: (f1Object: T, env: Env) => Promise<void>, env?: Env): Promise<T[]> => {
  const $: CheerioAPI = load(html);
  const results: T[] = [];

  const promises = $(TABLE_ELEMENT).map(async (index, row) => {
    const f1ObjectCopy = { ...f1Object };
    Object.keys(f1Object).forEach((key, resultIndex) => {
      if (key === 'driver') {
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
  const driverFirstName = $(row).find(`td.dark.bold > .hide-for-tablet`).text();
  const driverLastName = $(row).find(`td.dark.bold > .hide-for-mobile`).text();
  const driverAlias = $(row).find(`td.dark.bold > .uppercase`).text();
  return driverAlias === 'ZHO' ? `${driverLastName} ${driverFirstName} ${driverAlias}` : `${driverFirstName} ${driverLastName} ${driverAlias}`;
};

const setPosition = (row: Element, $: CheerioAPI, resultIndex: number) => {
  const position = $(row).find(`td:nth-child(${resultIndex + 2})`).text().replace(/\s+/g, ' ').trim();
  return position === 'NC' ? position : Number(position);
};

const setText = (row: Element, $: CheerioAPI, resultIndex: number) => {
  const text = $(row).find(`td:nth-child(${resultIndex + 2})`).text().replace(/\s+/g, ' ').trim();
  return /^\d+$/.test(text) ? Number(text) : text;
};

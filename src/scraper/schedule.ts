import { Cheerio, CheerioAPI, Element, load } from 'cheerio';
import { F1_URL, F1_YEAR, RACING } from '../utils/globals';
import { Schedule } from '../xata';

export const getSchedule = async (): Promise<Schedule[]> => {
  const url = `${F1_URL}/${RACING}/${F1_YEAR}`;

  try {
    const response = await fetch(url);
    const html = await response.text();

    const $: CheerioAPI = load(html);
    let schedule: Schedule[] = [];

    $('div.flex.flex-col.tablet\\:grid > a').each((_, element) => {
      const $el = $(element);

      const headerContainer = '.f1-inner-wrapper:first > div:first';
      const bodyContainer = '.f1-inner-wrapper:first > div:last';

      const round = $el.find('legend > p').text().trim();
      const date = $el.find(`${headerContainer} > div:first > p > span`).text().trim();
      const month = $el.find(`${headerContainer} > div:nth-child(2) > p > span`).text().trim();
      const flag = $el.find(`${headerContainer} > div:first > img`).attr('src');
      const place = $el.find(`${bodyContainer} > div:first > p`).text().trim();
      const title = $el.find(`${bodyContainer} > div:nth-child(2) > p`).text().trim();
      const trackImg = $el.find(`${bodyContainer} > div:last > img`).attr('src');

      let podium: Schedule['firstPlace'][] = [];
      if (!trackImg) {
        podium = addPodium($el, bodyContainer);
      }

      schedule.push({
        round,
        days: date,
        month,
        flag: flag ?? '',
        place,
        title,
        trackImage: trackImg ?? '',
        year: Number(F1_YEAR),
        firstPlace: podium[0],
        secondPlace: podium[1],
        thirdPlace: podium[2],
        id: crypto.randomUUID()
      });
    });

    return schedule;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unknown error occurred");
  }
};

const addPodium = ($el: Cheerio<Element>, bodyContainer: string): Schedule['firstPlace'][] => {
  const firstPlaceDriverImage = $el.find(`${bodyContainer} > div:last > div:first > div:first > div:first > div:first > img`).attr('src');
  const firstPlaceDriverName = $el.find(`${bodyContainer} > div:last > div:first > div:first > div:last > p`).text().trim();

  const secondPlaceDriverImage = $el.find(`${bodyContainer} > div:last > div:nth-child(2) > div:first > div:first > div:first > img`).attr('src');
  const secondPlaceDriverName = $el.find(`${bodyContainer} > div:last > div:nth-child(2) > div:first > div:last > p`).text().trim();

  const thirdPlaceDriverImage = $el.find(`${bodyContainer} > div:last > div:last > div:first > div:first > div:first > img`).attr('src');
  const thirdPlaceDriverName = $el.find(`${bodyContainer} > div:last > div:last > div:first > div:last > p`).text().trim();

  return [
    {
      driverImage: firstPlaceDriverImage ?? '',
      driverName: firstPlaceDriverName ?? ''
    },
    {
      driverImage: secondPlaceDriverImage ?? '',
      driverName: secondPlaceDriverName ?? ''
    },
    {
      driverImage: thirdPlaceDriverImage ?? '',
      driverName: thirdPlaceDriverName ?? ''
    }
  ]
};


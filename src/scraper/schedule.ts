import { CheerioAPI, load } from 'cheerio';
import { Schedule } from '../interfaces/schedule.interface';
import { F1_URL, F1_YEAR, RACING } from '../utils/globals';

export const getSchedule = async (): Promise<Schedule[]> => {
  const url = `${F1_URL}/${RACING}/${F1_YEAR}.html`;

  try {
    const response = await fetch(url);
    const html = await response.text();

    const $: CheerioAPI = load(html);
    const schedule: Schedule[] = [];

    $('div.col-12.col-sm-6.col-lg-4.col-xl-3').each((index, element): void => {
      const fieldset = $(element).find('.event-item');
      const legendText = fieldset.find('.card-title').text();

      if (legendText !== 'TESTING') {
        const race_status = fieldset.find('.card-title > .race-status').text();

        const container = $(element).find('div.container > div.row');

        const race_card = container.find('.race-card');
        const event_info = race_card.find('.event-info');
        const date = event_info.find('.start-date').text() + ' - ' + event_info.find('.end-date').text();
        const month = event_info.find('.month-wrapper').text();
        const countryFlag = event_info.find('.country-flag > picture > img').attr('data-src');

        const event = race_card.find('.event-details');
        const event_place = event.find('.event-place').text().trim();
        const event_title = event.find('.event-title').text();
        const event_image = event.find('.event-image > picture > img').attr('data-src');

        const race_card_hero = container.find('.race-card-hero');
        const hero_image = race_card_hero.find('.hero-image > picture > img').attr('data-src');

        const schedule_item: Schedule = {
          round: legendText,
          race_status: race_status,
          date: date,
          month: month,
          country_flag: countryFlag ?? '',
          place: event_place,
          title: event_title,
          track_image: event_image ?? '',
          hero_image: hero_image ?? '',
          year: Number(F1_YEAR)
        }
        schedule.push(schedule_item);
      }
    });

    return schedule;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unknown error occurred");
  }


  return [];
};


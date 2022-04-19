import type { EventsInMonth } from "../../../types/response.ts";
import { lastDate } from "./last_date.ts";
import { dateFromJPString } from "./date_from_jp_string.ts";

type EventDetail = {
  type: "event-detail";
  content: string | null | {
    date: string | null;
    title: string | null;
    place: string | null;
    cal: string | null;
  };
};

type EventDate = {
  type: "event-date";
  content: string | null;
};

export type SerialEvents = (EventDetail | EventDate)[];

export const responseJsonFromSerialEvents = (
  year: number,
  month: number,
  events: SerialEvents,
): EventsInMonth => {
  const json = {
    year,
    month,
    items: [] as EventsInMonth["items"],
  };

  const dateHasEvent = new Map<string, boolean>();

  events.forEach((event) => {
    if (event.type === "event-date" && event.content) {
      const date = `${year}-${month}-${dateFromJPString(event.content)}`;
      dateHasEvent.set(date, true);

      json.items.push({
        date,
        events: [],
      });
    } else {
      if (!event.content || typeof event.content === "string") return;
      json.items[json.items.length - 1].events.push({
        date: event.content.date || "",
        title: event.content.title || "",
        place: event.content.place || "",
        calendar: event.content.cal || "",
      });
    }
  });

  // NOTE: カレンダーを1日から月終わりの日まで埋める。
  for (let day = 1; day <= lastDate(year, month); day++) {
    const date = `${year}-${month}-${day}`;

    if (!dateHasEvent.get(date)) {
      json.items.push({
        date,
        events: [],
      });
    }
  }

  json.items = json.items.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    return dateA.getDate() - dateB.getDate();
  });

  return json;
};

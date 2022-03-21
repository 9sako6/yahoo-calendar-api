import type { EventsInMonth } from "../../../types/response.ts";

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

  events.forEach((event) => {
    if (event.type === "event-date") {
      json.items.push({
        date: event.content || "",
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

  return json;
};

import { Page } from "https://deno.land/x/puppeteer@9.0.2/mod.ts";
import type { Element } from "../../../types/web_api.ts";
import { responseJsonFromSerialEvents, SerialEvents } from "./formatter.ts";

export const getEventsInMonth = async (
  page: Page,
  year: number,
  month: number,
) => {
  // NOTE: This is used in a Puppeteer scope. Don't use in a Deno scope.
  // deno-lint-ignore no-explicit-any
  const document: any = null;

  const events: SerialEvents = await page.evaluate((selector: string) => {
    // NOTE: Here is out of the scope of Deno.
    const elements: Element[] = Array.from(document.querySelectorAll(selector));
    return elements.map((element) => {
      if (
        element.classList.contains("list-event-detail") && element.textContent
      ) { // Row of event information.
        const dateElement = element.querySelector(".list-event-date");
        const titleElement = element.querySelector(".list-event-title");
        const placeElement = element.querySelector(".list-event-place");
        const calElement = element.querySelector(".list-event-cal");
        return {
          type: "event-detail" as const,
          content: {
            date: dateElement ? dateElement.textContent : null,
            title: titleElement ? titleElement.textContent : null,
            place: placeElement ? placeElement.textContent : null,
            cal: calElement ? calElement.textContent : null,
          },
        };
      } else { // Row of date information.
        return { type: "event-date" as const, content: element.textContent };
      }
    });
  }, "tbody.list-tbody > tr");

  return responseJsonFromSerialEvents(year, month, events);
};

import { useEffect } from "react";

export const useSSE = (
  url: string,
  onMessage: (event: any) => void,
  onError?: (error: Event) => void,
) => {
  useEffect(() => {
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      try {
        const eventData = JSON.parse(event.data);
        onMessage(eventData);
      } catch (error) {
        console.error("Error parsing SSE message:", error);
      }
    };

    if (onError) {
      eventSource.onerror = onError;
    }

    return () => {
      eventSource.close();
    };
  }, [url, onMessage, onError]);
};

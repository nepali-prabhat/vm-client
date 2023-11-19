import { toast } from "@/components/ui/use-toast";
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
        toast({
          title: "Unexpected error",
          description: "There was an error parsing server sent event's json",
        });
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

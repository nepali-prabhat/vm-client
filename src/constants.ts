export const apiBaseUrl = "http://localhost:3001";
export const ORDER_TIMEOUT_IN_SECONDS = 60;

export const STATS = [
  { name: "Coins", value: 100 },
  { name: "Cash", value: 200 },
  { name: "Pepsi", value: 10 },
];
export const SCREEN_DIMENSIONS = {
  width: 1000,
  height: 800,
};

export const PAYMENT_SLOT_FAQ = [
  {
    title: "Why is this an input field?",
    content: `Assume the vending machine includes a physical device with sensors for accurately counting and validating coins and cash. The input fields reflect the recorded amount from this device. `,
  },
  {
    title: "How does it communicate?",
    content: `Usually, these devices are connected to a microcontroller. Assume that we've programmed the microcontroller to send a Rest API requests to our server upon recording an amount.`,
  },
];

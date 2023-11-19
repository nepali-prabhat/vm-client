# Vending machine client

This react client simulates vending machine. Server code repo is: nepali-prabhat/vm-server

## Assumptions made for the UI

- The vending machine has fixed dimensions. (1000 x 800 as defined in constants.ts file)
- The top portion of the UI is the screen of the vending machine. It is operated by touch
- We can't perform browser back from screen.
- The bottom three parts of the UI represent physical elements of the vending machine.
- The physical elements are assumed to have sensors and microcontrollers. The microcontrollers communicate with the vending machine server via rest api and also listen for server sent events.
- The payment slot is assumed to accurately count and validate the entered coins or cash.

## How to run?

```bash
pnpm run dev
```

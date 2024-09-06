# EMDX Challenge • Part 1

## Task Description

[Challenge Part 1](https://github.com/emdx-dex/react-challenge?tab=readme-ov-file#part-1-pixel-perfect-component-implementation)
Create a pixel-perfect controlled input component based on the provided PDF design guidelines. This component should be implemented in a Storybook and deployed for browser access.

## What was done?

- Setup Vite and Storybook.
- Created a [Dropdown component](https://github.com/damiandelio/react-challenge/blob/451cc15e4da150e5348fc72f475ebf1a14da885d/src/components/Dropdown/Dropdown.tsx).
- Created the Dropdown story.
- Setup Github actions to deploy Storybook to Github Pages.

## Screenshots

![image](https://github.com/user-attachments/assets/f79b6b16-a8e0-412c-aa12-db12dcd47632)
![image](https://github.com/user-attachments/assets/51b05be3-870f-4ec4-a20b-b02b33bf52b6)
![image](https://github.com/user-attachments/assets/8175a6fb-d7c1-4386-bd39-a53f5e2c59b7)

## Online version

[Storybook on Github Pages](https://damiandelio.github.io/react-challenge)

## How to run locally?

Node version >=18

On the root directory run the following command:

```cmd
npm i
npm run storybook
```

## How to test?

- Go to the [example page](https://damiandelio.github.io/react-challenge/?path=/story/components-dropdown-example--default).
- Try selecting and removing elements from the dropdown.
- Try using `tab` and `space` key to navigate and select on the dropdown menu.

## Decisions made

- Created an interface compatible with react-hook-form's [useController](https://react-hook-form.com/api/usecontroller) hook.
- Implemented checkboxes to enable tab navigation inside the dropdown.
- Accessibility attributes were considered.
- Utilized `memo()` for component memoization.
- Provided a `classes` prop to allow overriding of styles.
- When the dropdown is open, the caret position is inverted (this wasn't specified in the designs).
- It is on the programmer to implement the `onChange` callback to set the state values. An example can be found [here](https://github.com/damiandelio/react-challenge/blob/451cc15e4da150e5348fc72f475ebf1a14da885d/src/components/Dropdown/example/ExamplePage.tsx#L52).

## Possible improvements

- Scope `reset.css` to the component to avoid global style conflicts.
- Add support for disabled and error states.
- Add a `closeOnSelect` boolean prop to indicate if to close or not the menu when an option is clicked.

---

# EMDX Challenge • Part 2

## Task Description

[Challenge Part 2](https://github.com/emdx-dex/react-challenge?tab=readme-ov-file#part-2-real-time-crypto-price-tracker)
Develop a ReactJS application that tracks real-time cryptocurrency prices using WebSockets and manages state with Redux.

## What was done?

- **Redux Setup**: Integrated Redux for state management.
- **Real-time Crypto Prices**: Implemented a real-time cryptocurrency price list using the Coinbase WebSocket API.
- **Subscription Management**: Added functionality to add or remove subscriptions, allowing users to control which cryptocurrencies they receive data updates for.
- **Batch Subscription Control**: Included a button to subscribe or unsubscribe to all cryptocurrencies simultaneously.

## Screenshots

![image](https://github.com/user-attachments/assets/4844ba04-70dd-4874-b079-dd9132bc0ea9)
![image](https://github.com/user-attachments/assets/ee705601-1cf3-4774-8431-191c72317e3c)
![image](https://github.com/user-attachments/assets/a43ba318-cedd-4f76-ae85-b44d7bcc40d9)

## Online preview

[Live preview on Vercel](https://react-challenge-git-part2-damin-de-lios-projects.vercel.app/)

## How to run locally?

1. **Set up environment variables**:

- Create a `.env` file in the root directory
- Add the `VITE_COINBASE_WS_URL` variable to the `.env` file:

```
VITE_COINBASE_WS_URL="wss://ws-feed.exchange.coinbase.com"
```

3. **Install dependencies and start the development server**:

- In the root directory, run the following commands

```cmd
npm install
npm run dev
```

## How to test?

1. Navigate to the Home Screen. Upon loading, all cryptocurrencies will be tracked by default.

2. Unsubscribe from a Single Cryptocurrency. Click on any cryptocurrency name at the top of the screen. The button should turn red, and the selected cryptocurrency should be removed from the price list.

3. Unsubscribe from All Cryptocurrencies. Click the "Unsubscribe all" button. All cryptocurrencies should be unsubscribed, and the button text should change to "Subscribe all".

4. Subscribe to All Cryptocurrencies. Click the "Subscribe all" button to re-subscribe to all cryptocurrencies.

## Possible improvements

- Implement list virtualization to improve performance when rendering the crypto prices, using a library such as [@tanstack/react-virtual](https://www.npmjs.com/package/@tanstack/react-virtual).
- Error Handling: Display error messages to the user when a connection error occurs.
- Fetch Coinbase products dynamically when the app runs, instead of relying on a static asset (`coinbaseProducts.ts`).

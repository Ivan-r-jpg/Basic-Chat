# Simple WebSocket Chat

A small browser-based chat application that demonstrates real-time, two-way communication over WebSocket. Multiple clients can connect to the same server: when someone sends a message, the server adds it to the message history and broadcasts the updated history to every connected client.

## Features

- Connect to and disconnect from the WebSocket server using the interface.
- Send messages with a username; if no name is provided, “Anonymous” is used.
- Update the chat in all connected browser windows whenever a message is sent.
- Show messages sent before the current client connected, as long as the server is running.
- Log connections, disconnections, and errors in the server console.

## Technology stack

- **Client:** HTML, CSS, and JavaScript using the browser WebSocket API.
- **Server:** Node.js and the [`ws`](https://www.npmjs.com/package/ws) package.
- **Transport:** WebSocket at `ws://localhost:8080`.

## Getting started

Make sure [Node.js](https://nodejs.org/) is installed.

1. Open a terminal in the project directory.
2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the WebSocket server:

   ```bash
   node server.js
   ```

   The server listens on port `8080`. Keep this terminal open.

4. Open `index.html` in your browser.
5. Click **“Connect.”** To test messaging between clients, open the page in two or more browser windows.

To stop the server, press `Ctrl+C` in the terminal.

> The client connects to `localhost`, so this example is intended to run the browser and server on the same computer.

## How it works

1. When started, `server.js` creates a WebSocket server on port `8080` and initializes an in-memory array for messages.
2. The **“Connect”** button in the client (`script.js`) opens a WebSocket connection. Once connected, the server sends the client the current message history.
3. The client sends a JSON message containing a username and text. The server adds it to the history and broadcasts the updated array to all connected clients.
4. The client renders the received array in the chat area. The **“Disconnect”** button closes the connection.

Message format sent by the client:

```json
{
  "user": "Name",
  "text": "Message text"
}
```

The server responds to each client with a JSON array containing all messages, for example:

```json
[
  {
    "user": "Name",
    "text": "Message text"
  }
]
```

## Project structure

```text
.
├── index.html   # Chat page markup
├── style.css    # Interface styles
├── script.js    # WebSocket client and interface event handlers
├── server.js    # WebSocket server and message broadcasting
├── package.json # ws dependency
└── LICENSE      # MIT license
```

## Limitations

- Messages are stored only in memory and are lost when the server restarts.
- The server does not use a database, user accounts, or authentication.
- The server port is set to `8080` in `server.js`; the WebSocket URL is set in `script.js`.

## License

This project is distributed under the [MIT License](./LICENSE).

import { readable } from "svelte/store";

let connection;
let connectionTimer;
let message;

const connect = () => {
  try {
    if (!connection || connection.readyState >= 2) {
      connection = new WebSocket(process.env.wsUrl);

      connection.onclose = (e) => {
        connectionTimer = setInterval(() => {
          connect();
        }, 500);
      };

      connection.onopen = () => {
        clearInterval(connectionTimer);
      };

      connection.onmessage = (e) => {
        message = e.data;
      };
    }
  } catch (error) {
    console.log(error, "Error");
  }
};

const store = new readable(undefined, (set) => {
  const messageTimer = setInterval(() => {
    if (message) {
      set(JSON.parse(message));
      message = undefined;
    }
  }, 5);

  return () => {
    if (connection) {
      connection.close();
    }
    clearInterval(messageTimer);
  };
});

connect();

export default {
  subscribe: store.subscribe,
  isConnected: () => connection.readyState <= 1,
};

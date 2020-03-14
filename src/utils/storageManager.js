import Storage from "utils/storage";

const MESSAGE = "MESSAGE";
const MESSAGE_ID = "MESSAGE_ID";

export const message = new Storage(MESSAGE);
export const messageId = new Storage(MESSAGE_ID);

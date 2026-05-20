/* eslint-disable @typescript-eslint/no-require-imports */
const { TextDecoder, TextEncoder } = require("node:util");
const { ReadableStream, TransformStream } = require("node:stream/web");
const { MessageChannel } = require("node:worker_threads");

global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;
global.ReadableStream = ReadableStream;
global.TransformStream = TransformStream;

const { port1 } = new MessageChannel();
global.MessagePort = port1.constructor;

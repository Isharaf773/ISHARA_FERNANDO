import express from 'express';
import { connectDB } from './db.js';

export function createRouter(router, basePath = '/') {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(basePath, router);

  return async function handler(req, res) {
    await connectDB();
    return new Promise((resolve, reject) => {
      const originalEnd = res.end;
      const originalJson = res.json;
      const originalStatus = res.status;

      res.end = function (...args) {
        originalEnd.apply(this, args);
        resolve();
      };

      res.json = function (body) {
        originalJson.call(this, body);
        resolve();
      };

      res.status = function (code) {
        originalStatus.call(this, code);
        return this;
      };

      app(req, res);
    });
  };
}

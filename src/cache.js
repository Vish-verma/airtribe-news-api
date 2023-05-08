const express = require("express");
const Memcached = require('memcached-promise');
const cache = new Memcached("localhost:11211");

const getCache = async (key) => {
  try {
    let value = await cache.get(key);
    return value
  } catch (error) {
    console.log("error: ", error);
    return;
  }
};
const setCache = async (key, value, expiry = 50000) => {
  try {
    await cache.set(key, value, expiry);
  } catch (error) {
    console.log("error: ", error);
    return;
  }
};

module.exports = {
  getCache,
  setCache,
};

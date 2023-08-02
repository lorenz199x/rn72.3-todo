let mockAsyncStorage = {};

export default {
  setItem: jest.fn((key, value) =>
    Promise.resolve((mockAsyncStorage[key] = value))
  ),
  getItem: jest.fn((key) => Promise.resolve(mockAsyncStorage[key] || null)),
  removeItem: jest.fn((key) => Promise.resolve(delete mockAsyncStorage[key])),
  clear: jest.fn(() => Promise.resolve((mockAsyncStorage = {}))),
};
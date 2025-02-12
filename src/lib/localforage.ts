import localforage from "localforage";

export const storage = localforage.createInstance({
  name: "myAppCache",
  storeName: "reactQueryCache",
});

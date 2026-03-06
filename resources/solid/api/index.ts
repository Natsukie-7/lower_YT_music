import { ApiFactory } from "./api.factory";

const api = new ApiFactory(window.__APP__.csrf, "/api");

export default api;

import { config } from "../config/config";

export class Rest {
  static fetch({ url, ...rest }) {
    return fetch(`${config.REACT_APP_REST_API_URL}${url}`, {
      body: JSON.stringify(rest.data),
      ...rest,
    });
  }
  static async req(arg) {
    const response = await Rest.fetch(arg);
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message);
    }
    return responseData;
  }
}

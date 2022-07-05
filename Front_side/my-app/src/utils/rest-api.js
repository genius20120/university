import { config } from "../config/config";
import { history } from "..";

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
      if (response.status === 403) history.push("/");
      throw new Error(responseData.message);
    }
    return responseData;
  }
}

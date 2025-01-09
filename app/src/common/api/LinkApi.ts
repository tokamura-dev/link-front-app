import axios, {
  AxiosError,
  AxiosResponse,
  HttpStatusCode,
  InternalAxiosRequestConfig,
} from "axios";

export interface LinkApiResponse<T> {
  status: number;
  searchCount: number;
  serachResult: T;
  message: string;
}

/**
 * API通信の設定
 */
const linkApi = axios.create({
  baseURL: "http://localhost:8080/linkbackapp/api/v1",
  timeout: 1800000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * リクエスト時の共通設定
 */
linkApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * レスポンス時の共通設定
 */
linkApi.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    switch (error.response?.status) {
      case HttpStatusCode.Unauthorized:
        localStorage.removeItem("authToken");
        break;
      default:
        break;
    }
    return Promise.reject(error);
  }
);

/**
 * 共通GET通信API
 * @param path パス
 * @returns 通信結果
 */
export const linkClientApiGet = async <T>(path: string): Promise<T> => {
  const response = await linkApi
    .get<T>(path)
    .then((res: AxiosResponse<T>) => {
      if (res && res.data) {
        return res.data;
      }
      return null as T;
    })
    .catch((err: AxiosError<T>) => {
      if (err.response && err.response.data) {
        return err.response.data;
      }
      return null as T;
    });
  return response;
};

/**
 * 共通POST通信API
 * @param path パス
 * @param data データ
 * @returns 通信結果
 */
export const linkClientApiPost = async <T>(
  path: string,
  data: object
): Promise<T> => {
  const response = await linkApi
    .post<T>(path, data)
    .then((res: AxiosResponse<T>) => {
      if (res && res.data) {
        return res.data;
      }
      return null as T;
    })
    .catch((err: AxiosError<T>) => {
      if (err.response && err.response.data) {
        return err.response.data;
      }
      return null as T;
    });
  return response;
};

/**
 * 共通PUT通信API
 * @param path パス
 * @param data データ
 * @returns 通信結果
 */
export const linkClientApiPut = async <T>(
  path: string,
  data: object
): Promise<T> => {
  const response = await linkApi
    .put<T>(path, data)
    .then((res: AxiosResponse<T>) => {
      if (res && res.data) {
        return res.data;
      }
      return null as T;
    })
    .catch((err: AxiosError<T>) => {
      if (err.response && err.response.data) {
        return err.response.data;
      }
      return null as T;
    });
  return response;
};

/**
 * 共通DELETE通信API
 * @param path パス
 * @returns 通信結果
 */
export const linkClientApiDelete = async <T>(path: string): Promise<T> => {
  const response = await linkApi
    .delete<T>(path)
    .then((res: AxiosResponse<T>) => {
      if (res && res.data) {
        return res.data;
      }
      return null as T;
    })
    .catch((err: AxiosError<T>) => {
      if (err.response && err.response.data) {
        return err.response.data;
      }
      return null as T;
    });
  return response;
};

export default linkApi;

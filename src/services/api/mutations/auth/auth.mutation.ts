import { useMutation } from "@tanstack/react-query";
import { api } from "../../client";
import { ILogin, IRegister,IAuthResponse, IAuthLoginResponse } from "./auth.interface";
import { useAuthStore } from "@/stores/auth.store";
export const useSignUpUser = () => {
  const setSession = useAuthStore((s) => s.setSession);

  return useMutation({
    mutationKey: ["user-signup"],
    mutationFn: async (payload: IRegister) => {
      const { data } = await api.post<IAuthResponse>("/auth/register", {
        ...payload,
      });
      return data;
    },
    onSuccess: ({ data }) => {
      setSession(data.userObj, data.accessToken, data.refreshToken);
    },
  });
};

export const useLoginUser = () => {
  const setSession = useAuthStore((s) => s.setSession);
  return useMutation({
    mutationKey: ["user-login"],
    mutationFn: async (payload: ILogin) => {
      const { data } = await api.post<IAuthLoginResponse>("/auth/login", {
        ...payload,
      });
      return data;
    },
    onSuccess: ({ data }) => {
      setSession(data.user, data.accessToken, data.refreshToken);
    },
  });
};

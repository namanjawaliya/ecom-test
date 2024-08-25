"use client";

import { useState, useEffect, FormEventHandler } from "react";
import LoginRegisterFormInput from "@/components/utils/PrimaryInput";
import { Button } from "@/components/ui/button";
import SpinnerIcon from "@/components/icons/SpinnerIcon";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import useUserStore from "@/lib/store/useUserStore";

type AuthFormData = {
  username: string;
  password: string;
  confirmPassword?: string; // Only used in signup mode
};

const Authorize = () => {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");

  const [formData, setFormData] = useState<AuthFormData>({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (mode === "login") {
      mutateLogin(formData);
    } else {
      mutateSignup(formData);
    }
  };

  const loginMutation = useMutation({
    mutationFn: async (data: AuthFormData) => {
      const response = await axiosInstance.post("/auth/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      setIsLoading(false);
      const setUser = useUserStore.getState().setUser;

      const { user } = data;

      setUser({
        id: user.id,
        username: user.username,
        role: user.role,
      });

      router.push("/products");
    },
    onError: (error: any) => {
      setError(error.response?.data?.message || "Login failed");
      setIsLoading(false);
    },
  });

  const signupMutation = useMutation({
    mutationFn: async (data: AuthFormData) => {
      if (data.password !== data.confirmPassword) {
        throw new Error("Passwords do not match");
      }
      const response = await axiosInstance.post("/auth/signup", {
        username: data.username,
        password: data.password,
      });
      console.log({ response });
      return response.data;
    },
    onSuccess: () => {
      setIsLoading(false);
      router.push("/");
    },
    onError: (error: any) => {
      setError(error.response?.data?.message || "Signup failed");
      setIsLoading(false);
    },
  });

  const mutateLogin = loginMutation.mutate;
  const mutateSignup = signupMutation.mutate;

  if (!isMounted) return null;

  return (
    <div className="h-[100dvh] flex justify-center items-center">
      <form className="w-11/12 max-w-96" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-y-6 rounded-md dark:text-white border p-8">
          <div className="text-center my-2 text-xl md:text-2xl">
            {mode === "login" ? "Welcome back!" : "Create an account"}
          </div>
          {error && <p className="text-red-500 text-sm">Error: {error}</p>}

          <div className="my-2 flex flex-col gap-6">
            <LoginRegisterFormInput
              type="email"
              id="username"
              label="Email"
              value={formData.username}
              setValue={(value) =>
                setFormData({ ...formData, username: value })
              }
            />
            <LoginRegisterFormInput
              type="password"
              id="password"
              label="Password"
              value={formData.password}
              setValue={(value) =>
                setFormData({ ...formData, password: value })
              }
            />
            {mode === "signup" && (
              <LoginRegisterFormInput
                type="password"
                id="confirmPassword"
                label="Confirm Password"
                value={formData.confirmPassword || ""}
                setValue={(value) =>
                  setFormData({ ...formData, confirmPassword: value })
                }
              />
            )}
          </div>
          <div>
            <Button
              type="submit"
              className="w-full h-12 md:h-14"
              disabled={isLoading}
            >
              {mode === "login" ? "Login" : "Sign Up"}
              {isLoading && <SpinnerIcon height={24} width={24} />}
            </Button>
          </div>

          <div className="text-center mt-4">
            {mode === "login" ? (
              <>
                New user?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="text-blue-500 underline"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Existing user?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="text-blue-500 underline"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Authorize;

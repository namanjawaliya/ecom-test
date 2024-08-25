import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axiosInstance from "../axios";

const fetchAuthStatus = async () => {
  const response = await axiosInstance.get("/auth/status");
  return response.data;
};

const withAuth = (WrappedComponent: React.FC) => {
  const AuthenticatedComponent = () => {
    const router = useRouter();

    const { data, isLoading, error } = useQuery({
      queryKey: ["authStatus"],
      queryFn: fetchAuthStatus,
      retry: false,
    });

    React.useEffect(() => {
      if (!isLoading && !data?.isAuthenticated) {
        router.push("/authorize");
      }
    }, [isLoading, data, router]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error || !data?.isAuthenticated) {
      return null;
    }

    return <WrappedComponent />;
  };

  return AuthenticatedComponent;
};

export default withAuth;

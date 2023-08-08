import React, { useState, useEffect } from "react";
import userContext from "./UserContext";
import { api } from "../../axios";
// import { useQuery } from "@tanstack/react-query";

const UserState = (props: {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | Iterable<React.ReactNode>
    | React.ReactPortal
    | null
    | undefined;
}) => {
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    api.get(`/session`).then((res) => {
      setUserData(res.data);
    });
  }, []);

  //   const { data } = useQuery({
  //     queryKey: ["user-profile"],
  //     queryFn: () => api.get(`/session`).then((data) => setUserData(data!)),
  //   });

  //   console.log("[LOG] | file: UserState.tsx:32 | data:", data);

  return (
    <userContext.Provider value={userData}>
      {props.children}
    </userContext.Provider>
  );
};

export default UserState;

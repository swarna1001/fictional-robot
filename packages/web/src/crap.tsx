// import { useState } from "react";

// function App() {
//   const [message, setMessage] = useState("Hi 👋");

//   console.log(
//     "[LOG] | file: App.tsx:12 | onClick | import.meta.env.VITE_APP_API_URL:",
//     import.meta.env.VITE_APP_API_URL
//   );

//   function onClick() {
//     fetch(import.meta.env.VITE_APP_API_URL)
//       .then((response) => response.text())
//       .then(setMessage);
//   }

//   return (
//     <div className="App">
//       <div className="card">
//         <button onClick={onClick}>
//           Message is "<i>{message}</i>"
//         </button>
//       </div>
//     </div>
//   );
// }

// export default App;

import { useEffect, useState } from "react";
// import "./App.css";

function Crap() {
  // const [message, setMessage] = useState("Hi 👋");

  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // const [dbResp, setDbRes] = useState("");

  const getSession = async () => {
    const token = localStorage.getItem("session");
    if (token) {
      const user = await getUserInfo(token);
      if (user) setSession(user);
    }
    setLoading(false);
  };

  useEffect(() => {
    getSession();
  }, []);

  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const token = params.get("token");
    if (token) {
      console.log("TOKEN: ", token);
      localStorage.setItem("session", token);
      window.location.replace(window.location.origin);
    }
  }, []);

  const getUserInfo = async (session: any) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_API_URL}/session`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${session}`,
          },
        }
      );

      // const payload: any = { count: 1 };

      // const dbRes = await fetch(`${import.meta.env.VITE_APP_API_URL}/test`, {
      //   method: "POST",
      //   headers: {
      //     Authorization: `Bearer ${session}`,
      //   },
      //   body: {
      //     //@ts-ignore
      //     payload,
      //   },
      // })
      //   .then((response) => {
      //     return response.json();
      //   })
      //   .then((data) => {
      //     setDbRes(data);
      //   });

      // console.log("DB Res : ", dbRes);
      // console.log("DB Res : ", JSON.stringify(dbRes));

      return response.json();
    } catch (error) {
      alert(error);
    }
  };

  const signOut = async () => {
    localStorage.removeItem("session");
    setSession(null);
  };

  const updateUser = async () => {
    const payload = {
      id: session?.properties?.user[0].id,
      is_manager: true,
    };

    const response = await fetch(
      `${import.meta.env.VITE_APP_API_URL}/update/user/role`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session}`,
        },
        body: JSON.stringify(payload),
      }
    );

    console.log("[LOG] | file: App.tsx:127 | updateUser | response:", response);
  };

  // function onClick() {
  //   fetch(import.meta.env.VITE_APP_API_URL)
  //     .then((response) => response.text())
  //     .then(setMessage);
  // }

  console.log("SESSION - FE : ", session?.properties?.user);
  console.log("has_identified : ", session?.properties?.user[0].has_identified);

  // console.log("FUCKING YES : ", dbResp);

  if (loading) return <div className="container">Loading...</div>;

  return (
    <div className="App">
      <div className="card">
        <h1>Hello</h1>
        <div className="container">
          <h2>SST Auth Example</h2>

          {session ? (
            <>
              {session?.properties?.user[0].has_identified ? (
                <>HAS identified</>
              ) : (
                <>
                  display the modal
                  <button onClick={updateUser}> Update</button>
                </>
              )}
            </>
          ) : (
            <>
              <a
                href={`${
                  import.meta.env.VITE_APP_API_URL
                }/auth/google/authorize`}
                rel="noreferrer"
              >
                <button>Sign in with Google</button>
              </a>
            </>
          )}

          {session ? (
            <div className="profile">
              <p>Welcome </p>

              <h1>Something worked</h1>

              <button onClick={signOut}>Sign out</button>
            </div>
          ) : (
            <div>
              <a
                href={`${
                  import.meta.env.VITE_APP_API_URL
                }/auth/google/authorize`}
                rel="noreferrer"
              >
                <button>Sign in with Google</button>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Crap;

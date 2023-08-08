import { createContext } from "react";
// import { UserProfileResponse } from "../../utils/types.js";

// const userContext = createContext<UserProfileResponse>({
//   user: {
//     id: 0,
//     name: "",
//     department: "",
//     email: "",
//   },
//   total_patients: 0,
//   average_patient_age: 0,
//   gender_distribution: [],
//   age_distribution: [],
// });

const userContext = createContext({});

export default userContext;

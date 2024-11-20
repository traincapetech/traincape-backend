// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Define initial state
// const initialState = {
//   user: null,
//   token: null,
//   loading: false,
//   role: null,
//   username: null,
//   error: null,
// };

// // Async thunk for user login
// export const loginUser = createAsyncThunk(
//   "user/loginUser",
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         "https://traincape-backend-1.onrender.com/users/login",
//         { email, password }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || { msg: "Login failed" });
//     }
//   }
// );

// // Async thunk for user signup
// export const signupUser = createAsyncThunk(
//   "user/signupUser",
//   async ({ email, password, username }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         "https://traincape-backend-1.onrender.com/users/register",
//         { email, password, username }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || { msg: "Signup failed" });
//     }
//   }
// );

// // Create the slice
// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     logoutUser: (state) => {
//       // Clear state and local storage
//       state.user = null;
//       state.token = null;
//       state.role = null;
//       state.username = null;
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       localStorage.removeItem('username');
//       localStorage.removeItem('role');
//     },
//     setUserFromLocalStorage: (state) => {
//       // Initialize state from local storage
//       state.token = localStorage.getItem('token');
//       state.username = localStorage.getItem('username');
//       state.role = localStorage.getItem('role');
//       state.user = JSON.parse(localStorage.getItem('user')); // Parse the user object
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // Handle login
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         const { token, user } = action.payload;

//         // Store values in local storage
//         localStorage.setItem("token", token);
//         localStorage.setItem("username", user.username);
//         localStorage.setItem("role", user.role);
//         localStorage.setItem("user", JSON.stringify(user)); // Store user object as JSON

//         // Update state
//         state.loading = false;
//         state.token = token;
//         state.username = user.username;
//         state.role = user.role;
//         state.user = user;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload.msg || "Login failed";
//       })
//       // Handle signup
//       .addCase(signupUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(signupUser.fulfilled, (state, action) => {
//         const { token, user } = action.payload;

//     // Store user object as JSON

//         // Update state
//         state.loading = false;
//       })
//       .addCase(signupUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload.msg || "Signup failed";
//       });
//   },
// });

// export const { logoutUser, setUserFromLocalStorage } = userSlice.actions;

// export default userSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define initial state
const initialState = {
  user: null,
  token: null,
  loading: false,
  role: null,
  username: null,
  error: null,
};

// Async thunk for user login
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://traincape-backend-1.onrender.com/users/login",
        { email, password }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { msg: "Login failed" });
    }
  }
);

// Async thunk for user signup
export const signupUser = createAsyncThunk(
  "user/signupUser",
  async ({ email, password, username }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://traincape-backend-1.onrender.com/users/register",
        { email, password, username }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { msg: "Signup failed" });
    }
  }
);

// Create the slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      // Clear state and local storage
      state.user = null;
      state.token = null;
      state.role = null;
      state.username = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
    },
    setUserFromLocalStorage: (state) => {
      // Initialize state from local storage
      state.token = localStorage.getItem("token");
      state.username = localStorage.getItem("username");
      state.role = localStorage.getItem("role");
      state.user = JSON.parse(localStorage.getItem("user"));
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { token, user } = action.payload;

        // Store values in local storage
        localStorage.setItem("token", token);
        localStorage.setItem("username", user.username);
        localStorage.setItem("role", user.role);
        localStorage.setItem("user", JSON.stringify(user)); // Store user object as JSON

        // Update state
        state.loading = false;
        state.token = token;
        state.username = user.username;
        state.role = user.role;
        state.user = user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.msg || "Login failed";
      })
      // Handle signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null; // Reset error if signup successful
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.msg || "Signup failed";
      });
  },
});

export const { logoutUser, setUserFromLocalStorage } = userSlice.actions;

// Default export of the reducer
export default userSlice.reducer;

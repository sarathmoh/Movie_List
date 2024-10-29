import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";

interface Response {
  message: string;
  statusCode: number;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface UserDetails {
  id: string;
  email: string;
}
interface WatchList {
  userId: string;
  title: string;
  year: string;
  id: string;
  poster: string;
  isBookMarked: boolean;
}

interface DefaultValue {
  isAuthenticated: boolean;
  user: UserDetails;
  signUp: (email: string) => Response;
  login: (email: string) => Response;
  logout: () => void;
}

const response: Response = {
  message: "",
  statusCode: 200,
};

const defaultValue: DefaultValue = {
  isAuthenticated: false,
  user: {
    id: "",
    email: "",
  },
  signUp: () => response,
  login: () => response,
  logout: () => {},
};
const AuthContext = createContext(defaultValue);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserDetails>({
    id: "",
    email: "",
  });

  useEffect(() => {
    const users = localStorage.getItem("users");
    const allUsers: UserDetails[] = [];
    if (!users) {
      localStorage.setItem("users", JSON.stringify(allUsers));
    }

    const watchLists = localStorage.getItem("watchLists");
    const allWatchLists: WatchList[] = [];
    if (!watchLists) {
      localStorage.setItem("watchLists", JSON.stringify(allWatchLists));
    }

    const authenticated = localStorage.getItem("isAuthenticated");
    if (authenticated) {
      const currentUser = localStorage.getItem("currentUser");
      if (currentUser) {
        setUser(JSON.parse(currentUser));
        setIsAuthenticated(true);
      }
    }
  }, []);
  const signUp = (email: string) => {
    const allUsersLocal = localStorage.getItem("users");
    let allUsers: UserDetails[] = [];
    if (allUsersLocal) {
      allUsers = JSON.parse(allUsersLocal);
    }
    const isUserExist = allUsers.some((user: UserDetails) => {
      return user.email === email;
    });
    if (isUserExist) {
      return {
        message: "user already exist please login",
        statusCode: 409,
      };
    } else {
      const newUser = {
        id: uuidv4(),
        email: email,
      };
      allUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(allUsers));
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      setUser(newUser);
      setIsAuthenticated(true);

      return {
        message: "Account created please login",
        statusCode: 201,
      };
    }
  };

  const login = (email: string) => {
    const allUsersLocal = localStorage.getItem("users");
    let allUsers: UserDetails[] = [];
    if (allUsersLocal) {
      allUsers = JSON.parse(allUsersLocal);
    }
    const user = allUsers.find((user: UserDetails) => {
      return user.email === email;
    });
    if (!user) {
      return {
        message: "No user account found please sign up",
        statusCode: 404,
      };
    } else {
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      localStorage.setItem("currentUser", JSON.stringify(user));
      setUser(user);
      setIsAuthenticated(true);
      return {
        message: "Login successful",
        statusCode: 200,
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("currentUser");
    setUser({
      email: "",
      id: "",
    });
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, signUp, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};

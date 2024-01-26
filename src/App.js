import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { instance } from "./service";
import API from "./service";
import Login from "./components/Login";
import Register from "./components/Register";
import { connect } from "react-redux";
import NotificationManager from "./Hooks/NotificationManager";
import { useEffect } from "react";
import { START_GET_USER } from "./Actions/AuthAction";
import Home from "./components/Home";
import Leave from "./components/Leave";

instance.interceptors.response.use(
  (response) => {
    if (response.status === 401 || response.status === 500) {
      document.location.href = "/login";
      window.localStorage.removeItem("token");
    }
    return response;
  },
  async (error) => {
    if (error.response.status === 401 || error.response.status === 500) {
      document.location.href = "/login";
      window.localStorage.removeItem("token");
    }
    return error;
  }
);

function App(props) {
  const { reduxToken, getUser } = props;

  const navigate = useNavigate();

  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const token = API.getAccessTokenFromLocalStorage();

  useEffect(() => {
    if (token && token !== "") {
      getUser();
    } else {
      if (["login"].includes(path)) {
        navigate("/login");
      } else if (["register"].includes(path)) {
        navigate("/register");
      } else {
        navigate("/login");
      }
    }
  }, []);

  useEffect(() => {
    if ((reduxToken && reduxToken !== "") || (token && token !== "")) {
      if (["login", "register"].includes(path)) {
        navigate("/dashboard");
      }
    } else if (["register"].includes(path)) {
      navigate("register");
    } else if (location.pathname == "/") {
      navigate("login");
    }
  }, [location.pathname, reduxToken]);

  const routes = [
    {
      element: <Login />,
      path: "/login",
      exact: true,
    },
    {
      element: <Register />,
      path: "/register",
      exact: true,
    },
    {
      element: <Home />,
      path: "/dashboard",
      exact: true,
      authenticated: true,
    },
    {
      element: <Leave />,
      path: "/leave",
      exact: true,
      authenticated: true,
    },
  ];

  return (
    <>
      <NotificationManager />
      <Routes>
        {routes.map((item, key) => {
          return (item?.authenticated ? token : true) ? (
            <Route key={key} {...item} element={item?.element} />
          ) : null;
        })}
      </Routes>
      <Routes>
        <Route
          exact
          path="/"
          element={<Navigate to={token ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </>
  );
}

const mapStateToProps = (state) => ({
  reduxToken: state.auth.token,
});
const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch({ type: START_GET_USER }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

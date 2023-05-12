import React from "react";
import { Route, Switch, Router, Redirect, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { history } from "./redux/_helpers";

// Plugins Stylesheet
import "bootstrap/dist/css/bootstrap.min.css";

//Antd
import "antd/dist/antd.css";

// Slick Carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// React Modal Video
import "react-modal-video/css/modal-video.min.css";

// StyleSheet
import "./Home/assets/css/typography.css";
import "./Home/assets/css/shortcodes/shortcodes.css";
import "./Home/assets/css/style.css";
import "./Home/assets/css/color/color-1.css";

// Fonts
import "./vendors/fontawesome/css/font-awesome.min.css";
import "./vendors/flaticon/flaticon.css";
import "./vendors/line-awesome/css/line-awesome.min.css";
import "./vendors/themify/themify-icons.css";

// Elements
import BackToTop from "./Home/elements/back-top";
import PageScrollTop from "./Home/elements/page-scroll-top";

// Home Pages

import Admin from "./Admin/layout/admin";
import ManageUser from "./Admin/pages/manageUsers";
import ManageCourse from "./Admin/pages/manageCourses";

const RestrictedRoute = ({ component: Component, authUser }) => (
  <Route
    render={(props) =>
      authUser ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

function App() {
  const { loggedIn } = useSelector((state) => state.authentication);

  return (
    <>
      {/* <BrowserRouter basename={'/'}> */}
      <Router history={history}>
        <Switch>
          {/* Admin */}
          <RestrictedRoute
            path="/admin"
            authUser={loggedIn}
            component={Admin}
          />
          <RestrictedRoute
            path="/admin/manage-users"
            authUser={loggedIn}
            component={ManageUser}
          />
          {/* <RestrictedRoute
            path="/admin/manage-courses"
            authUser={loggedIn}
            component={ManageUser}
          /> */}
          <Route path="/admin" exact component={Admin} />
          <Route path="/admin/manage-users" exact component={ManageUser} />
          {/* <Route path="/admin/manage-courses" exact component={ManageCourse} /> */}
        </Switch>
        <PageScrollTop />
      </Router>
      {/* </BrowserRouter> */}

      <BackToTop />
    </>
  );
}

export default App;

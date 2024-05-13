import React from "react";
import { Route, Routes } from "react-router-dom";

import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Dashboard from "./pages/User/Dashboard/Dashboard";

import Private from "./components/Routes/UserRoutes/Private";
import AdminRoute from "./components/Routes/AdminRoutes/AdminRoute";
import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard";
import SendNotification from "./pages/Admin/SendNotification/SendNotification";

import SubmittedRequests from "./pages/Admin/SubmittedRequests/SubmittedRequests";
import CreateCategory from "./pages/Admin/CreateCategory/CreateCategory";

import "antd/dist/reset.css";
import CreateAttraction from "./pages/Admin/CreateAttraction/CreateAttraction";
import Attractions from "./pages/Admin/Attractions/Attractions";
import UpdateAttraction from "./pages/Admin/UpdateAttraction/UpdateAttraction";
import Search from "./pages/Search/Search";
import Profile from "./pages/User/Profile/Profile";

import TravelHistory from "./pages/User/TravelHistory/History";

import CreatePlan from "./pages/Admin/CreatePlan/CreatePlan";

import UserNotification from "./pages/User/UserNotification/UserNotification";
import ListOfCities from "./pages/ListOfCities/ListOfCities";
import ListOfAttractions from "./pages/ListOfAttractions/ListOfAttractions";
import SeriviceProviderRequest from "./pages/Admin/SeriviceProviderRequest/SeriviceProviderRequest";
import CreateZone from "./pages/Admin/CreateZone/CreateZone";
import Zones from "./pages/Admin/Zones/Zones";
import UpdateZone from "./pages/Admin/UpdateZone/UpdateZone";
import Users from "./pages/Admin/Users/Users";
import SeeandDo from "./pages/See&Do/SeeandDo";
import ListOfZones from "./pages/ListOfZones/ListOfZones";

import ListOfSellers from "./pages/ListOfSellers/ListOfSellers";
import SellerRoute from "./components/Routes/SellerRoutes/SellerRoute";
import SellerDashboard from "./pages/Seller/SellerDashboard/SellerDashboard";
import SellerProfile from "./pages/Seller/SellerProfile/SellerProfile";
import SellerQualification from "./pages/Seller/SellerQualification/SellerQualification";
import SellerReports from "./pages/Seller/SellerReports/SellerReports";
import UserReports from "./pages/User/UserReports/UserReports";

import SellerRating from "./pages/Seller/SellerRating/SellerRating";
import TravelEssentials from "./pages/TravelEssentials/TravelEssentials";
import CommonPhrase from "./pages/CommonPhrase/CommonPhrase";
import SaudiWheather from "./pages/SaudiWheather/SaudiWheather";
import Zone from "./pages/Zone/Zone";
import AttractionType from "./components/AttractionType/AttractionType";
import SingleAttraction from "./pages/SingleAttraction/SingleAttraction";
import SaudiCalendar from "./pages/SaudiCalendar/SaudiCalendar";
import Experiences from "./pages/Experiences/Experiences";
import BookingRequests from "./pages/Seller/BookingRequests/BookingRequests";
import Plans from "./pages/Admin/Plans/Plans";
import SinglePlan from "./pages/SinglePlan/SinglePlan";
import Payment from "./pages/Payment/Payment";
import Tickets from "./pages/User/Tickets/Tickets";
import Chat from "./pages/Chat/Chat";
import "./App.css";

import Message from "./pages/Message/Message";
import Messages from "./pages/Messages/Messages";
import SingleReport from "./pages/Admin/SingleReport/SingleReport";
import SingleReview from "./pages/Seller/SingleReview/SingleReview";
import CreateUserPlan from "./pages/User/CreateUserPlan/CreateUserPlan";
import JoinSharePlans from "./pages/JoinSharePlans/JoinSharePlans";
import UserPlans from "./pages/User/UserPlans/UserPlans";
import ViewPlan from "./pages/ViewPlan/ViewPlan";
import AddMoreAttractions from "./pages/AddMoreAttractions/AddMoreAttractions";
import PurchasedPlans from "./pages/Admin/PurchasedPlans/PurchasedPlans";
import PlanPayment from "./pages/PlanPayment/PlanPayment";
import SinglePurchasedPlan from "./pages/SinglePurchasedPlan/SinglePurchasedPlan";
import Sellers from "./pages/Sellers/Sellers";
import SingleSeller from "./pages/SingleSeller/SingleSeller";
import SellerPayment from "./pages/SellerPayment/SellerPayment";
import ExplorerRequests from "./pages/Seller/ExplorerRequests/ExplorerRequests";
import AutoPlanAttractions from "./pages/AutoPlanAttractions/AutoPlanAttractions";
import UserPurchasedPlan from "./pages/User/UserPurchasedPlan/UserPurchasedPlan";
import HomeZones from "./pages/HomeZones/HomeZones.jsx";
import CatgeoryBaseAttraction from "./pages/CatgeoryBaseAttraction/CatgeoryBaseAttraction.jsx";
import ExploreAll from "./pages/ExploreAll/ExploreAll.jsx";
import AboutSaudi from "./pages/AboutSaudi/AboutSaudi.jsx";
import SafetyTravelTips from "./pages/SafetyTravelTips/SafetyTravelTips.jsx";

import TravelRegulations from "./pages/TravelRegulations/TravelRegulations.jsx";
import { useTheme } from "./context/ThemeContext.jsx";

const App = () => {
  const [theme] = useTheme();
  return (
    <>
      <div id={theme}>
        <Routes>
          <Route path="/" element={<SeeandDo />} />
          <Route path="/search" element={<Search />} />
          <Route path="/list-of-cities" element={<ListOfCities />} />
          <Route path="/list-of-attractions" element={<ListOfAttractions />} />
          <Route path="/travel-essentials" element={<TravelEssentials />} />
          <Route path="/common-phrases" element={<CommonPhrase />} />
          <Route path="/saudi-wheather" element={<SaudiWheather />} />
          <Route path="/saudi-calendar" element={<SaudiCalendar />} />
          <Route path="/message" element={<Message />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/chat/:sellerId" element={<Chat />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/plan-payment" element={<PlanPayment />} />
          <Route path="/seller-payment" element={<SellerPayment />} />
          <Route path="/zone/:id/" element={<Zone />}>
            <Route path=":slug" element={<AttractionType />} />
          </Route>
          <Route
            path="/single-attraction/:slug"
            element={<SingleAttraction />}
          />
          <Route path="/create-plan" element={<CreateUserPlan />} />

          <Route path="/dashboard" element={<Private />}>
            <Route path="user" element={<Dashboard />} />
            <Route path="user/profile" element={<Profile />} />
            <Route path="user/plans" element={<UserPlans />} />
            <Route path="user/plan/:id" element={<SinglePlan />} />
            <Route
              path="user/purchased-plans"
              element={<UserPurchasedPlan />}
            />

            <Route path="user/tickets" element={<Tickets />} />
            <Route path="user/reports" element={<UserReports />} />
            <Route path="user/join-share-plans" element={<JoinSharePlans />} />

            <Route path="user/history" element={<TravelHistory />} />
            <Route path="user/notifications" element={<UserNotification />} />
            <Route path="user/reports" element={<SellerReports />} />
          </Route>
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/create-plan" element={<CreatePlan />} />
            <Route path="admin/plans" element={<Plans />} />
            <Route path="admin/purchased-plans" element={<PurchasedPlans />} />

            <Route
              path="admin/send-notification"
              element={<SendNotification />}
            />

            <Route
              path="admin/submitted-reports"
              element={<SubmittedRequests />}
            />
            <Route path="admin/single-report/:id" element={<SingleReport />} />
            <Route path="admin/create-category" element={<CreateCategory />} />
            <Route
              path="admin/create-attraction"
              element={<CreateAttraction />}
            />
            <Route path="admin/create-zone" element={<CreateZone />} />
            <Route path="admin/attractions" element={<Attractions />} />
            <Route path="admin/zones" element={<Zones />} />
            <Route path="admin/user" element={<Users />} />

            <Route
              path="admin/attractions/:slug"
              element={<UpdateAttraction />}
            />
            <Route path="admin/zones/:slug" element={<UpdateZone />} />

            <Route
              path="admin/serviceProvidersRequest"
              element={<SeriviceProviderRequest />}
            />
          </Route>
          <Route path="/dashboard" element={<SellerRoute />}>
            <Route path="seller" element={<SellerDashboard />} />
            <Route path="seller/profile" element={<SellerProfile />} />

            <Route
              path="seller/booking-requests"
              element={<BookingRequests />}
            />
            <Route
              path="seller/explorer-requests"
              element={<ExplorerRequests />}
            />
            <Route
              path="seller/qualification"
              element={<SellerQualification />}
            />
            <Route path="seller/reviews" element={<SellerRating />} />
            <Route path="seller/single-review" element={<SingleReview />} />

            <Route path="seller/reports" element={<SellerReports />} />
          </Route>

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/See&Do" element={<SeeandDo />} />
          <Route path="/list-of-zones/:id" element={<ListOfZones />} />

          <Route
            path="/list-of-attractions/:id"
            element={<ListOfAttractions />}
          />

          <Route
            path="/list-of-service-providers/:id"
            element={<ListOfSellers />}
          />
          <Route path="/single-plan/:id" element={<SinglePlan />} />
          <Route
            path="/single-purchased-plan/:id"
            element={<SinglePurchasedPlan />}
          />
          <Route path="/view-plan" element={<ViewPlan />} />
          <Route
            path="/add-more-attractions/:id"
            element={<AddMoreAttractions />}
          />
          <Route
            path="/auto-plan-attractions"
            element={<AutoPlanAttractions />}
          />
          <Route path="/sellers" element={<Sellers />} />

          <Route path="/single-seller/:id" element={<SingleSeller />} />
          <Route path="/home-zones" element={<HomeZones />} />
          <Route path="/category/:name" element={<CatgeoryBaseAttraction />} />
          <Route path="/exploreAll" element={<ExploreAll />} />

          <Route path="/SafetyTravelTips" element={<SafetyTravelTips />} />
          <Route path="/aboutSaudi" element={<AboutSaudi />} />
          <Route path="/travelRegulations" element={<TravelRegulations />} />
        </Routes>
      </div>
    </>
  );
};

export default App;

import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/forms/Login";
import Dashboard from "./components/pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Products from "./components/pages/products/Products";
import Categories from "./components/pages/categories/Categories";
import Banner from "./components/pages/banner/Banner";
import Orders from "./components/pages/orders/Orders";
import Terms from "./components/pages/terms/Terms";
import Privacy from "./components/pages/privacyPolicy/Privacy";
import Support from "./components/pages/support/Support";
import Wishlist from "./components/pages/wishlist/Wishlist";
import AddProduct from "./components/pages/products/AddProduct";
import VendorLogin from "./vendorPanel/components/forms/VendorLogin.jsx";
import VendorProducts from "./vendorPanel/components/pages/products/VendorProducts";
import VendorCategories from "./vendorPanel/components/pages/categories/VendorCategories";
import VendorOrders from "./vendorPanel/components/pages/orders/VendorOrders";
import VendorSupport from "./vendorPanel/components/pages/support/VendorSupport";
import Commission from "./vendorPanel/components/pages/commission/Commission";
import VendorReports from "./vendorPanel/components/pages/reports/VendorReports";
import VendorComplaints from "./vendorPanel/components/pages/complaints/VendorComplaints";
import VendorComments from "./vendorPanel/components/pages/comments/VendorComments";
import VendorTransactions from "./vendorPanel/components/pages/transactions/VendorTransactions";
import VendorUsers from "./vendorPanel/components/pages/users/VendorUsers";
import VendorDashboard from "./vendorPanel/components/pages/VendorDashboard";
import VendorPrivacy from "./vendorPanel/components/pages/privacyPolicy/VendorPrivacy";
import VendorFavorites from "./components/pages/favorites/VendorFavorites";
import CouponsDiscount from "./vendorPanel/components/pages/couponsDiscount/CouponsDiscount";
import Forgot from "./components/forms/Forgot";
import Vendors from "./components/pages/vendors/Vendors";
import VerifyOtp from "./components/forms/VerifyOtp";
import VendorAddProduct from "./vendorPanel/components/pages/products/VendorAddProduct";
import VendorViewProduct from "./vendorPanel/components/pages/products/VendorViewProduct";
import Payment2 from "./components/pages/paymentGateway/payment2";
import Payment3 from "./components/pages/paymentGateway/payment3";
import Notification from "./components/pages/notifications";
import Setting from "./components/pages/setting/Setting";
import Coupon from "./components/pages/coupons/Coupon";
import Signup from "./components/pages/SignUP/Signup";
import Profile from "./components/pages/profileUpdate/Profile";
import Restaurant from "./components/pages/Restaurant/Restaurant";
import Restaurantby from "./components/pages/Restaurant/Restaurantby";
import Dishes from "./components/pages/Dishes/Dishes";
import AboutUs from "./components/pages/aboutus/AboutUs";
import Users from "./components/pages/users/Users";
import ViewOrder from "./components/pages/orders/ViewOrder";
import UserTransactions from "./components/pages/orders/UserTransactions";
import PlanType from "./vendorPanel/components/pages/planType";
import MealType from "./vendorPanel/components/pages/mealType";
import VendorDishes from "./vendorPanel/components/pages/vendorDishes";
import VendorNotification from "./vendorPanel/components/pages/vendorNotification";
import CateringServices from "./components/pages/cateringServices";
import DeliveryAgents from "./components/pages/deliveryAgents";

function App() {
  function displayHide() {
    document.getElementById("link").style.display = "none";
  }

  return (
    <>
      <ToastContainer />
      {/* <Link to="/login" id="link" onClick={() => displayHide()}>
        Login
      </Link> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route path="/forgotPassword" element={<Forgot />} />
        <Route path="/verifyOtp" element={<VerifyOtp />} />
        <Route path="/vendors" element={<Vendors />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/products" element={<Products />} />

        <Route path="/:id/categories" element={<Categories />} />
        <Route path="/banners" element={<Banner />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacyPolicy" element={<Privacy />} />
        <Route path="/support" element={<Support />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/payment" element={<Payment2 />} />
        <Route path="/payment-3" element={<Payment3 />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/restaurant/:id/coupons" element={<Coupon />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/restaurants" element={<Restaurant />} />

        <Route path="/Restaurantby/:id" element={<Restaurantby />} />
        <Route path="/:id/dishes" element={<Dishes />} />
        <Route path="/about-us" element={<AboutUs />} />

        <Route path="/users" element={<Users />} />
        <Route path="/dishes" element={<Dishes />} />

        <Route path="/vieworder/:id" element={<ViewOrder />} />
        <Route path="/usertransactions/:id" element={<UserTransactions />} />

        {/* /restaurant/:id/coupons */}

        {/* ---------------Vendor Panel----------------------- */}
        <Route path="/vendorLogin" element={<VendorLogin />} />
        <Route path="/vendorDashboard" element={<VendorDashboard />} />
        <Route path="/vendorProducts" element={<VendorProducts />} />
        <Route path="/vendorViewProduct/:id" element={<VendorViewProduct />} />
        <Route path="/vendorAddProduct" element={<VendorAddProduct />} />
        <Route path="/vendorCategories" element={<VendorCategories />} />
        <Route path="/vendorOrders" element={<VendorOrders />} />
        <Route path="/vendorSupport" element={<VendorSupport />} />
        <Route path="/commission" element={<Commission />} />
        <Route path="/vendorReports" element={<VendorReports />} />
        <Route path="/vendorComplaints" element={<VendorComplaints />} />
        <Route path="/vendorComments" element={<VendorComments />} />
        <Route path="/vendorTransactions" element={<VendorTransactions />} />
        <Route path="/vendorUsers" element={<VendorUsers />} />
        <Route path="/vendorPrivacy" element={<VendorPrivacy />} />
        <Route path="/vendorFavorites" element={<VendorFavorites />} />
        <Route path="/vendorCoupons" element={<CouponsDiscount />} />
        <Route path="/vendorCommission" element={<Commission />} />
        <Route path="/vendorPlanType" element={<PlanType />} />
        <Route path="/vendorMealType" element={<MealType />} />
        <Route path="/vendorDishes" element={<VendorDishes />} />
        <Route path="/vendorNotification" element={<VendorNotification />} />
        <Route path="/cateringServices" element={<CateringServices />} />
        <Route path="/deliveryAgents" element={<DeliveryAgents />} />
      </Routes>
    </>
  );
}

export default App;

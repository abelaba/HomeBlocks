import {
  Routes,
  Route
} from "react-router-dom";
import { Navbar, Welcome, Footer, Services, Transactions } from "./components";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ViewAllProperties from "./components/ViewAllProperties";
import ManageProperties from "./components/ManageProperties";
import PropertyDetail from "./components/PropertyDetail";
import AddProperty from "./components/AddProperty";
import Chats from "./components/Chats";
import Chat from "./components/Chat";
import MapBox from "./components/MapBox";

const App = () => {
  return (

    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Routes>
          {/* <Switch> */}
          <Route path="/" element={<> <Welcome /> <Services /> </>} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="viewProperties" element={<ViewAllProperties />} />
          <Route path="manageProperties" element={<ManageProperties />} />
          <Route path="property/:id" element={<PropertyDetail />} />
          <Route path="addProperty" element={<AddProperty />} />
          <Route path="chats" element={<Chats />} />
          <Route path="chat/:id" element={<Chat />} />
          <Route path="map/" element={<MapBox />} />
          {/* </Switch> */}
        </Routes>
      </div>

      {/* <Transactions /> */}
      <Footer />
    </div>
  )
};

export default App;

import {
  Routes,
  Route
} from "react-router-dom";
import { Navbar, Welcome, Footer, Services } from "./components";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import ViewAllProperties from "./components/property/ViewAllProperties";
import ManageProperties from "./components/property/ManageProperties";
import PropertyDetail from "./components/property/PropertyDetail";
import AddProperty from "./components/property/AddProperty";
import Chats from "./components/chat/Chats";
import Chat from "./components/chat/Chat";
import MapBox from "./components/MapBox";

const App = () => {
  return (

    <div className="gradient-bg-welcome">
      <div className="min-h-screen">
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
      <Footer />
    </div>
  )
};

export default App;

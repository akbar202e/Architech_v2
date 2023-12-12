import { Route, Routes } from 'react-router-dom';
import Login from './screens/Login';
import { RegisterPage } from './screens/Register';
import { Logged } from './screens/Logged';
import Homepage from './screens/Homepage';
import Tentang from './screens/Tentang'; 
import NotFound from './screens/NotFound'; import DesainArsitektur from './screens/DesainArsitektur'; 
import DesainInterior from './screens/DesainInterior'; import Pelaksanaan from './screens/Pelaksanaan'; 
import Portofolio from './screens/Portofolio'; import Layanan from './screens/Layanan'; 
import Home from './screens/admin/Home'; import DataProduk from './screens/admin/DataProduk'; 
import DataCustomer from './screens/admin/DataCustomer'; import Transaksi from './screens/admin/Transaksi';
import DataAdmin from './screens/admin/DataAdmin';
import EditProfile from './screens/admin/EditProfile';
import Minimalis from './screens/Minimalis';
import Klasik from './screens/Klasik';
import Interior from './screens/Interior';
import Industrial from './screens/Industrial';
import Profile from './screens/Profile';
import UserEdit from './screens/EditProfile';
import Kontak from './screens/Kontak';
import LoginAdmin from './screens/LoginAdmin'
import DataKategori from './screens/admin/DataKategori'
import PrivateRoutes from './utils/PrivateRoutes';
import AdminRoutes from './utils/AdminRoutes';

export function Router() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path='/logged' element={<Logged />} />
        <Route path='/home' element={<Homepage />} />
        <Route path="/about" element={<Tentang/>} />
        <Route path="/desain-arsi" element={<DesainArsitektur/>} />
        <Route path="/desain-inter" element={<DesainInterior/>} />
        <Route path="/pelaksanaan" element={<Pelaksanaan/>}/>
        <Route path="/portofolio" element={<Portofolio/>}/>
        <Route path="/minimalis" element={<Minimalis/>}/>
        <Route path="/klasik" element={<Klasik/>}/>
        <Route path="/industrial" element={<Industrial/>}/>
        <Route path="/interior" element={<Interior/>}/>
        <Route path="/layanan" element={<Layanan/>}/>
        <Route path="/kontak" element={<Kontak/>}/>
        <Route path="/profil" element={<Profile/>}/>
        <Route path="/edit" element={<UserEdit/>}/>
        </Route>
      <Route element={<AdminRoutes/>}>
        <Route path="/admin" element={<LoginAdmin/>}/>
        <Route path="/dashboard/*" element={<Home/>}/>
        <Route path="/kategori" element={<DataKategori/>}/>
        <Route path="/produk" element={<DataProduk/>}/>
        <Route path="/customer" element={<DataCustomer/>}/>
        <Route path="/transaksi" element={<Transaksi/>}/>
        <Route path="/profil-admin" element={<DataAdmin/>}/>
        <Route path="/profil-edit" element={<EditProfile/>}/>
      </Route>
      <Route path="*" element={<NotFound/>} />
      <Route path='/' element={<Login/>} exact />
      <Route path='/register' element={<RegisterPage />} />
    </Routes>
  );
}

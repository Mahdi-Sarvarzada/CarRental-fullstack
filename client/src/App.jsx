import React from 'react'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import Home from './pages/Home'
import CarDetails from './pages/CarDetails'
import Cars from './pages/Cars'
import MyBookings from './pages/MyBookings'
import Footer from './components/Footer'
import Layout from './pages/owner/Layout'
import Dashboard from './pages/owner/Dashboard'
import AddCar from './pages/owner/AddCar'
import ManageCars from './pages/owner/ManageCars'
import ManageBookings from './pages/owner/ManageBookings'
import Login from './components/Login'
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/AppContext'
import { ROUTES, getCarDetailsRoute } from './utils/routes'

const LegacyCarDetailsRedirect = () => {
  const { id } = useParams()
  return <Navigate to={getCarDetailsRoute(id)} replace />
}

const App = () => {
  const { showLogin } = useAppContext()
  const location = useLocation()
  const isOwnerPath =
    location.pathname.startsWith(ROUTES.owner) ||
    location.pathname.startsWith('/owner')

  return (
    <>
      <Toaster />
      {showLogin && <Login />}

      {!isOwnerPath && <Navbar />}

      <Routes>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.cars} element={<Cars />} />
        <Route path={ROUTES.bookings} element={<MyBookings />} />
        <Route path={`${ROUTES.carDetailsBase}/:id`} element={<CarDetails />} />

        <Route path='/cars' element={<Navigate to={ROUTES.cars} replace />} />
        <Route
          path='/my-bookings'
          element={<Navigate to={ROUTES.bookings} replace />}
        />
        <Route path='/car-details/:id' element={<LegacyCarDetailsRedirect />} />

        <Route path={ROUTES.owner} element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='Auto hinzufuegen' element={<AddCar />} />
          <Route path='Autos verwalten' element={<ManageCars />} />
          <Route path='Buchungen verwalten' element={<ManageBookings />} />
        </Route>

        <Route path='/owner' element={<Navigate to={ROUTES.owner} replace />} />
        <Route
          path='/owner/add-car'
          element={<Navigate to={ROUTES.ownerAddCar} replace />}
        />
        <Route
          path='/owner/manage-cars'
          element={<Navigate to={ROUTES.ownerManageCars} replace />}
        />
        <Route
          path='/owner/manage-bookings'
          element={<Navigate to={ROUTES.ownerManageBookings} replace />}
        />
      </Routes>

      {!isOwnerPath && <Footer />}
    </>
  )
}

export default App

import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'
import { assets } from '../assets/assets'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import {
  translateApiMessage,
  translateCarDescription,
  translateCategory,
  translateFeature,
  translateFuelType,
  translateLocation,
  translateTransmission,
} from '../utils/translations'
import { ROUTES } from '../utils/routes'

const CarDetails = () => {
  const { id } = useParams()
  const location = useLocation()
  const {
    cars,
    setCars,
    axios,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
  } = useAppContext()

  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const [isCarLoading, setIsCarLoading] = useState(true)
  const currency = import.meta.env.VITE_CURRENCY

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/bookings/create', {
        car: id,
        pickupDate,
        returnDate,
      })

      if (data.success) {
        toast.success(translateApiMessage(data.message))
        navigate(ROUTES.bookings)
      } else {
        toast.error(translateApiMessage(data.message))
      }
    } catch (error) {
      toast.error(translateApiMessage(error.message))
    }
  }

  useEffect(() => {
    const loadCar = async () => {
      setIsCarLoading(true)

      const stateCar = location.state?.car
      if (stateCar?._id === id) {
        setCar(stateCar)
        setIsCarLoading(false)
        return
      }

      const cachedCar = cars.find((item) => item._id === id)
      if (cachedCar) {
        setCar(cachedCar)
        setIsCarLoading(false)
        return
      }

      try {
        const { data } = await axios.get('/api/user/cars')
        if (data.success) {
          setCars(data.cars)
          setCar(data.cars.find((item) => item._id === id) || null)
        } else {
          toast.error(translateApiMessage(data.message))
          setCar(null)
        }
      } catch (error) {
        toast.error(translateApiMessage(error.message))
        setCar(null)
      } finally {
        setIsCarLoading(false)
      }
    }

    loadCar()
  }, [id])

  if (isCarLoading) {
    return <Loader />
  }

  if (!car) {
    return (
      <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-16'>
        <div className='max-w-2xl mx-auto text-center border border-borderColor rounded-xl p-8 text-gray-600'>
          <h1 className='text-2xl font-semibold text-gray-800'>
            Fahrzeug nicht gefunden
          </h1>
          <p className='mt-3'>
            Dieses Fahrzeug konnte nicht geladen werden oder ist aktuell nicht
            verfuegbar.
          </p>
          <button
            onClick={() => navigate(ROUTES.cars)}
            className='mt-6 px-6 py-3 bg-primary text-white rounded-lg cursor-pointer'
          >
            Zurueck zur Fahrzeugliste
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-16'>
      <button
        onClick={() => navigate(-1)}
        className='flex items-center gap-2 mb-6 text-gray-500 cursor-pointer'
      >
        <img src={assets.arrow_icon} alt='' className='rotate-180 opacity-65' />
        Zurueck zu allen Autos
      </button>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='lg:col-span-2'
        >
          <motion.img
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            src={car.image}
            alt=''
            className='w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md'
          />
          <motion.div
            className='space-y-6'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div>
              <h1 className='text-3xl font-bold'>
                {car.brand} {car.model}
              </h1>
              <p className='text-gray-500 text-lg'>
                {translateCategory(car.category)} - {car.year}
              </p>
            </div>
            <hr className='border-borderColor my-6' />

            <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
              {[
                { icon: assets.users_icon, text: `${car.seating_capacity} Sitze` },
                {
                  icon: assets.fuel_icon,
                  text: translateFuelType(car.fuel_type),
                },
                {
                  icon: assets.car_icon,
                  text: translateTransmission(car.transmission),
                },
                {
                  icon: assets.location_icon,
                  text: translateLocation(car.location),
                },
              ].map(({ icon, text }) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  key={text}
                  className='flex flex-col items-center bg-light p-4 rounded-lg'
                >
                  <img src={icon} alt='' className='h-5 mb-2' />
                  {text}
                </motion.div>
              ))}
            </div>

            <div>
              <h1 className='text-xl font-medium mb-3'>Beschreibung</h1>
              <p className='text-gray-500'>
                {translateCarDescription(car.description)}
              </p>
            </div>

            <div>
              <h1 className='text-xl font-medium mb-3'>Ausstattung</h1>
              <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
                {[
                  '360 Camera',
                  'Bluetooth',
                  'GPS',
                  'Heated Seats',
                  'Rear View Mirror',
                ].map((item) => (
                  <li key={item} className='flex items-center text-gray-500'>
                    <img src={assets.check_icon} className='h-4 mr-2' alt='' />
                    {translateFeature(item)}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          onSubmit={handleSubmit}
          className='shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500'
        >
          <p className='flex items-center justify-between text-2xl text-gray-800 font-semibold'>
            {currency}
            {car.pricePerDay}
            <span className='text-base text-gray-400 font-normal'>pro Tag</span>
          </p>

          <hr className='border-borderColor my-6' />

          <div className='flex flex-col gap-2'>
            <label htmlFor='pickup-date'>Abholdatum</label>
            <input
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              type='date'
              className='border border-borderColor px-3 py-2 rounded-lg'
              required
              id='pickup-date'
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label htmlFor='return-date'>Rueckgabedatum</label>
            <input
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              type='date'
              className='border border-borderColor px-3 py-2 rounded-lg'
              required
              id='return-date'
            />
          </div>

          <button className='w-full bg-primary hover:bg-primary-dull transition-all py-3 font-medium text-white rounded-xl cursor-pointer'>
            Jetzt buchen
          </button>

          <p className='text-center text-sm'>
            Keine Kreditkarte fuer die Reservierung erforderlich
          </p>
        </motion.form>
      </div>
    </div>
  )
}

export default CarDetails

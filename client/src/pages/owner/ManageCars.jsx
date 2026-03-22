import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { assets } from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'
import {
  translateApiMessage,
  translateCategory,
  translateTransmission,
} from '../../utils/translations'

const ManageCars = () => {
  const { isOwner, axios, currency, fetchCars } = useAppContext()
  const [cars, setCars] = useState([])

  const fetchOwnerCars = async () => {
    try {
      const { data } = await axios.get('/api/owner/cars')
      if (data.success) {
        setCars(data.cars)
      } else {
        toast.error(translateApiMessage(data.message))
      }
    } catch (error) {
      toast.error(translateApiMessage(error.message))
    }
  }

  const toggleAvailability = async (carId) => {
    try {
      const { data } = await axios.post('/api/owner/toggle-car', { carId })
      if (data.success) {
        toast.success(translateApiMessage(data.message))
        await fetchCars()
        fetchOwnerCars()
      } else {
        toast.error(translateApiMessage(data.message))
      }
    } catch (error) {
      toast.error(translateApiMessage(error.message))
    }
  }

  const deleteCar = async (carId) => {
    try {
      const confirmDelete = window.confirm(
        'Moechtest du dieses Auto wirklich entfernen?',
      )

      if (!confirmDelete) return null

      const { data } = await axios.post('/api/owner/delete-car', { carId })
      if (data.success) {
        toast.success(translateApiMessage(data.message))
        await fetchCars()
        fetchOwnerCars()
      } else {
        toast.error(translateApiMessage(data.message))
      }
    } catch (error) {
      toast.error(translateApiMessage(error.message))
    }
  }

  useEffect(() => {
    isOwner && fetchOwnerCars()
  }, [isOwner])

  return (
    <div className='px-4 pt-10 md:px-10 w-full'>
      <Title
        title='Autos verwalten'
        subTitle='Sieh dir alle inserierten Fahrzeuge an, passe ihren Status an oder entferne sie von der Plattform.'
      />

      <div className='max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>
        <table className='w-full border-collapse text-left text-sm text-gray-600'>
          <thead className='text-gray-500'>
            <tr>
              <th className='p-3 font-medium'>Auto</th>
              <th className='p-3 font-medium max-md:hidden'>Kategorie</th>
              <th className='p-3 font-medium'>Preis</th>
              <th className='p-3 font-medium max-md:hidden'>Status</th>
              <th className='p-3 font-medium'>Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr key={index} className='border-t border-borderColor'>
                <td className='p-3 flex items-center gap-3'>
                  <img
                    src={car.image}
                    alt=''
                    className='h-12 w-12 aspect-square rounded-md object-cover'
                  />
                  <div className='max-md:hidden'>
                    <p className='font-medium'>
                      {car.brand} {car.model}
                    </p>
                    <p className='text-xs text-gray-500'>
                      {car.seating_capacity} Sitze -{' '}
                      {translateTransmission(car.transmission)}
                    </p>
                  </div>
                </td>

                <td className='p-3 max-md:hidden'>
                  {translateCategory(car.category)}
                </td>
                <td className='p-3'>
                  {currency}
                  {car.pricePerDay}/Tag
                </td>

                <td className='p-3 max-md:hidden'>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      car.isAvaliable
                        ? 'bg-green-100 text-green-500'
                        : 'bg-red-100 text-red-500'
                    }`}
                  >
                    {car.isAvaliable ? 'Verfuegbar' : 'Nicht verfuegbar'}
                  </span>
                </td>

                <td className='flex items-center p-3'>
                  <img
                    onClick={() => toggleAvailability(car._id)}
                    src={car.isAvaliable ? assets.eye_close_icon : assets.eye_icon}
                    alt=''
                    className='cursor-pointer'
                  />

                  <img
                    onClick={() => deleteCar(car._id)}
                    src={assets.delete_icon}
                    alt=''
                    className='cursor-pointer'
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageCars

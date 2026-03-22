import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Title from '../../components/owner/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import { translateApiMessage } from '../../utils/translations'

const AddCar = () => {
  const { axios, currency, fetchCars } = useAppContext()

  const [image, setImage] = useState(null)
  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: 0,
    pricePerDay: 0,
    category: '',
    transmission: '',
    fuel_type: '',
    seating_capacity: 0,
    location: '',
    description: '',
  })

  const [isLoading, setIsLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (isLoading) return null

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('image', image)
      formData.append('carData', JSON.stringify(car))

      const { data } = await axios.post('/api/owner/add-car', formData)

      if (data.success) {
        toast.success(translateApiMessage(data.message))
        await fetchCars()
        setImage(null)
        setCar({
          brand: '',
          model: '',
          year: 0,
          pricePerDay: 0,
          category: '',
          transmission: '',
          fuel_type: '',
          seating_capacity: 0,
          location: '',
          description: '',
        })
      } else {
        toast.error(translateApiMessage(data.message))
      }
    } catch (error) {
      toast.error(translateApiMessage(error.message))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='px-4 py-10 md:px-10 flex-1'>
      <Title
        title='Neues Auto hinzufuegen'
        subTitle='Trage alle Details ein, um ein neues Fahrzeug inklusive Preis, Verfuegbarkeit und Spezifikationen anzubieten.'
      />

      <form
        onSubmit={onSubmitHandler}
        className='flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl'
      >
        <div className='flex items-center gap-2 w-full'>
          <label htmlFor='car-image'>
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt=''
              className='h-14 rounded cursor-pointer'
            />
            <input
              type='file'
              id='car-image'
              accept='image/*'
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <p className='text-sm text-gray-500'>Lade ein Bild deines Autos hoch</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex flex-col w-full'>
            <label>Marke</label>
            <input
              type='text'
              placeholder='z. B. BMW, Mercedes, Audi ...'
              required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
              value={car.brand}
              onChange={(e) => setCar({ ...car, brand: e.target.value })}
            />
          </div>
          <div className='flex flex-col w-full'>
            <label>Modell</label>
            <input
              type='text'
              placeholder='z. B. X5, E-Class, M4 ...'
              required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
              value={car.model}
              onChange={(e) => setCar({ ...car, model: e.target.value })}
            />
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          <div className='flex flex-col w-full'>
            <label>Baujahr</label>
            <input
              type='number'
              placeholder='2025'
              required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
              value={car.year}
              onChange={(e) => setCar({ ...car, year: e.target.value })}
            />
          </div>
          <div className='flex flex-col w-full'>
            <label>Tagespreis ({currency})</label>
            <input
              type='number'
              placeholder='100'
              required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
              value={car.pricePerDay}
              onChange={(e) => setCar({ ...car, pricePerDay: e.target.value })}
            />
          </div>
          <div className='flex flex-col w-full'>
            <label>Kategorie</label>
            <select
              onChange={(e) => setCar({ ...car, category: e.target.value })}
              value={car.category}
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
            >
              <option value=''>Kategorie waehlen</option>
              <option value='Sedan'>Limousine</option>
              <option value='SUV'>SUV</option>
              <option value='Van'>Van</option>
            </select>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          <div className='flex flex-col w-full'>
            <label>Getriebe</label>
            <select
              onChange={(e) => setCar({ ...car, transmission: e.target.value })}
              value={car.transmission}
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
            >
              <option value=''>Getriebe waehlen</option>
              <option value='Automatic'>Automatik</option>
              <option value='Manual'>Schaltung</option>
              <option value='Semi-Automatic'>Halbautomatik</option>
            </select>
          </div>
          <div className='flex flex-col w-full'>
            <label>Kraftstoffart</label>
            <select
              onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
              value={car.fuel_type}
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
            >
              <option value=''>Kraftstoff waehlen</option>
              <option value='Gas'>Gas</option>
              <option value='Diesel'>Diesel</option>
              <option value='Petrol'>Benzin</option>
              <option value='Electric'>Elektro</option>
              <option value='Hybrid'>Hybrid</option>
            </select>
          </div>
          <div className='flex flex-col w-full'>
            <label>Sitzplaetze</label>
            <input
              type='number'
              placeholder='4'
              required
              className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
              value={car.seating_capacity}
              onChange={(e) =>
                setCar({ ...car, seating_capacity: e.target.value })
              }
            />
          </div>
        </div>

        <div className='flex flex-col w-full'>
          <label>Standort</label>
          <select
            onChange={(e) => setCar({ ...car, location: e.target.value })}
            value={car.location}
            className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
          >
            <option value=''>Standort waehlen</option>
            <option value='New York'>New York</option>
            <option value='Los Angeles'>Los Angeles</option>
            <option value='Houston'>Houston</option>
            <option value='Chicago'>Chicago</option>
          </select>
        </div>

        <div className='flex flex-col w-full'>
          <label>Beschreibung</label>
          <textarea
            rows={5}
            placeholder='z. B. Ein komfortabler SUV mit viel Platz und kraftvollem Motor.'
            required
            className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'
            value={car.description}
            onChange={(e) => setCar({ ...car, description: e.target.value })}
          />
        </div>

        <button className='flex items-center gap-2 px-4 py-2.5 mt-4 bg-primary text-white rounded-md font-medium w-max cursor-pointer'>
          <img src={assets.tick_icon} alt='' />
          {isLoading ? 'Wird gespeichert ...' : 'Auto inserieren'}
        </button>
      </form>
    </div>
  )
}

export default AddCar

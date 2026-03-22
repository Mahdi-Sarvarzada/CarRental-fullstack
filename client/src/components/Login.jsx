import React from 'react'
import toast from 'react-hot-toast'
import { useAppContext } from '../context/AppContext'
import { translateApiMessage } from '../utils/translations'

const Login = () => {
  const { setShowLogin, axios, setToken, navigate } = useAppContext()

  const [state, setState] = React.useState('login')
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault()
      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
      })

      if (data.success) {
        navigate('/')
        setToken(data.token)
        localStorage.setItem('token', data.token)
        setShowLogin(false)
      } else {
        toast.error(translateApiMessage(data.message))
      }
    } catch (error) {
      toast.error(translateApiMessage(error.message))
    }
  }

  return (
    <div
      onClick={() => setShowLogin(false)}
      className='fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center text-sm text-gray-600 bg-black/50'
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className='flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white'
      >
        <p className='text-2xl font-medium m-auto'>
          <span className='text-primary'>Benutzer</span>{' '}
          {state === 'login' ? 'Anmeldung' : 'Registrierung'}
        </p>
        {state === 'register' && (
          <div className='w-full'>
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder='Hier eingeben'
              className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary'
              type='text'
              required
            />
          </div>
        )}
        <div className='w-full '>
          <p>E-Mail</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder='Hier eingeben'
            className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary'
            type='email'
            required
          />
        </div>
        <div className='w-full '>
          <p>Passwort</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder='Hier eingeben'
            className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary'
            type='password'
            required
          />
        </div>
        {state === 'register' ? (
          <p>
            Du hast bereits ein Konto?{' '}
            <span
              onClick={() => setState('login')}
              className='text-primary cursor-pointer'
            >
              Hier anmelden
            </span>
          </p>
        ) : (
          <p>
            Noch kein Konto?{' '}
            <span
              onClick={() => setState('register')}
              className='text-primary cursor-pointer'
            >
              Jetzt registrieren
            </span>
          </p>
        )}
        <button className='bg-primary hover:bg-blue-800 transition-all text-white w-full py-2 rounded-md cursor-pointer'>
          {state === 'register' ? 'Konto erstellen' : 'Anmelden'}
        </button>
      </form>
    </div>
  )
}

export default Login

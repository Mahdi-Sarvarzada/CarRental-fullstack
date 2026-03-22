export const ROUTES = {
  home: '/',
  cars: '/Autos',
  bookings: '/Meine Buchungen',
  carDetailsBase: '/Fahrzeug',
  owner: '/Uebersicht',
  ownerAddCar: '/Uebersicht/Auto hinzufuegen',
  ownerManageCars: '/Uebersicht/Autos verwalten',
  ownerManageBookings: '/Uebersicht/Buchungen verwalten',
}

export const getCarDetailsRoute = (id) => `${ROUTES.carDetailsBase}/${id}`

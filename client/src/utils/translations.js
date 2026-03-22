const bookingStatusMap = {
  pending: 'Ausstehend',
  confirmed: 'Bestaetigt',
  cancelled: 'Storniert',
};

const categoryMap = {
  Sedan: 'Limousine',
  SUV: 'SUV',
  Van: 'Van',
};

const transmissionMap = {
  Automatic: 'Automatik',
  Manual: 'Schaltung',
  'Semi-Automatic': 'Halbautomatik',
};

const fuelTypeMap = {
  Gas: 'Gas',
  Diesel: 'Diesel',
  Petrol: 'Benzin',
  Electric: 'Elektro',
  Hybrid: 'Hybrid',
};

const locationMap = {
  'Barcelona, Spain': 'Barcelona, Spanien',
  'Sydney, Australia': 'Sydney, Australien',
};

const featureMap = {
  '360 Camera': '360-Grad-Kamera',
  Bluetooth: 'Bluetooth',
  GPS: 'GPS',
  'Heated Seats': 'Sitzheizung',
  'Rear View Mirror': 'Rueckspiegel',
};

const descriptionMap = {
  'The BMW X5 is a mid-size luxury SUV produced by BMW. The X5 made its debut in 1999 as the first SUV ever produced by BMW.':
    'Der BMW X5 ist ein Luxus-SUV der Mittelklasse von BMW. Der X5 wurde 1999 eingefuehrt und war das erste SUV, das BMW produziert hat.',
  'The Toyota Corolla is a mid-size luxury sedan produced by Toyota. The Corolla made its debut in 2008 as the first sedan ever produced by Toyota.':
    'Der Toyota Corolla ist eine komfortable Limousine der Mittelklasse von Toyota. Der Corolla erschien 2008 und gehoert zu den bekanntesten Limousinen der Marke.',
  'The Jeep Wrangler is a mid-size luxury SUV produced by Jeep. The Wrangler made its debut in 2003 as the first SUV ever produced by Jeep.':
    'Der Jeep Wrangler ist ein markanter SUV der Mittelklasse von Jeep. Der Wrangler erschien 2003 und steht fuer robuste Technik und starke Offroad-Eigenschaften.',
  'This is a mid-size luxury sedan produced by Toyota. The Corolla made its debut in 2008 as the first sedan ever produced by Toyota.':
    'Dies ist eine komfortable Limousine der Mittelklasse mit grosszuegigem Innenraum und ausgewogener Fahrdynamik.',
};

const apiMessageMap = {
  'Fill all the fields': 'Bitte fuelle alle Felder aus.',
  'User already exists': 'Dieser Benutzer existiert bereits.',
  'User not found': 'Benutzer nicht gefunden.',
  'Invalid Credentials': 'Ungueltige Anmeldedaten.',
  'Now you can list cars': 'Du kannst jetzt Autos inserieren.',
  'Car Added': 'Das Auto wurde hinzugefuegt.',
  Unauthorized: 'Du bist fuer diese Aktion nicht berechtigt.',
  'Availability Toggled': 'Die Verfuegbarkeit wurde aktualisiert.',
  'Car Removed': 'Das Auto wurde entfernt.',
  'Image Updated': 'Das Bild wurde aktualisiert.',
  'Car is not available': 'Dieses Auto ist fuer den gewaehlten Zeitraum nicht verfuegbar.',
  'Booking Created': 'Die Buchung wurde erstellt.',
  'Status Updated': 'Der Status wurde aktualisiert.',
  'You have been logged out': 'Du wurdest abgemeldet.',
  'No cars available': 'Keine Autos verfuegbar.',
  'Network Error': 'Netzwerkfehler. Bitte pruefe deine Verbindung.',
  'Request failed with status code 400': 'Die Anfrage konnte nicht verarbeitet werden.',
  'Request failed with status code 401': 'Bitte melde dich erneut an.',
  'Request failed with status code 403': 'Zugriff verweigert.',
  'Request failed with status code 404': 'Die angeforderte Ressource wurde nicht gefunden.',
  'Request failed with status code 500': 'Serverfehler. Bitte versuche es spaeter erneut.',
};

const translateValue = (value, map) => map[value] || value;

export const translateBookingStatus = (status) => translateValue(status, bookingStatusMap);
export const translateCategory = (category) => translateValue(category, categoryMap);
export const translateTransmission = (transmission) =>
  translateValue(transmission, transmissionMap);
export const translateFuelType = (fuelType) => translateValue(fuelType, fuelTypeMap);
export const translateLocation = (location) => translateValue(location, locationMap);
export const translateFeature = (feature) => translateValue(feature, featureMap);
export const translateCarDescription = (description) =>
  translateValue(description, descriptionMap);
export const translateApiMessage = (message) =>
  apiMessageMap[message] || message || 'Ein Fehler ist aufgetreten.';

export const getTranslatedCarSearchText = (car) =>
  [
    car.brand,
    car.model,
    car.category,
    translateCategory(car.category),
    car.transmission,
    translateTransmission(car.transmission),
    car.fuel_type,
    translateFuelType(car.fuel_type),
    car.location,
    translateLocation(car.location),
    car.description,
    translateCarDescription(car.description),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();

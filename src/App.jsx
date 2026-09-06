import React, { useState, useEffect, useMemo, createContext, useContext } from 'react';
import { 
  Search, Calendar, MapPin, Shield, Star, Award, CheckCircle, ChevronRight,
  Menu, X, Filter, SlidersHorizontal, ArrowRight, User, Lock,
  Check, Info, ChevronLeft, Phone, Mail, Clock,
  AlertCircle, Fuel, Zap, Compass, RefreshCw 
} from 'lucide-react';

/* Velocita brand mark (white silhouette, transparent background) */
const VELOCITA_LOGO = "data:image/png;base64,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";

/* ============================================================================
   LANGUAGE / TRANSLATIONS
   ============================================================================ */

const TRANSLATIONS = {
  en: {
    header_tagline: 'Rent A Car',
    nav_home: 'Home',
    nav_fleet: 'The Fleet',
    nav_contact: 'Contact',
    header_view_reservation: 'View Active Reservation',
    header_reserve: 'Reserve Now',
    mobile_reserve: 'Reserve Vehicle',
    hero_badge: 'The Sovereign Collection 2024',
    hero_heading_pre: 'Drive Beyond',
    hero_heading_accent: 'Ordinary.',
    hero_subtitle: 'Exceptional vehicles. Effortless journeys. Choose your masterpiece from our curated global fleet of elite sports, luxury sedans, and hyper SUVs.',
    label_pickup_location: 'Pick-Up Location',
    label_pickup_datetime: 'Pick-Up Date & Time',
    label_return_datetime: 'Return Date & Time',
    calculated_duration: 'Calculated Duration:',
    days_suffix: 'Day(s)',
    search_button: 'Search Available Fleet',
    featured_label: 'Handpicked Models',
    featured_heading: 'Featured Sovereign Fleet',
    explore_all: 'Explore All Vehicles',
    diff_label: 'Unrivaled Excellence',
    diff_heading: 'The Velocita Difference',
    diff_subtitle: 'We transcend standard automobile rentals by offering white-glove automotive hospitality tailored to distinguished drivers.',
    diff_card1_title: 'Guaranteed Exact Model',
    diff_card1_desc: 'When you reserve a specific vehicle, you receive that exact model, trim, and spec—never a generic category substitute.',
    diff_card2_title: 'White-Glove Delivery',
    diff_card2_desc: 'Enjoy seamless handover directly at private aviation terminals, luxury hotels, or private residences.',
    diff_card3_title: 'Comprehensive Coverage',
    diff_card3_desc: 'Transparent zero-deductible insurance protection and 24/7 dedicated concierge assistance on every journey.',
    banner_label: 'Tailored Journeys',
    banner_heading: 'Leave the Ordinary Behind.',
    banner_text: 'Whether commanding a mountain pass in a 911 GT3 RS or arriving at a gala in a Rolls-Royce Ghost, our vehicles provide unmatched status and sensory delight.',
    banner_button: 'Browse Entire Fleet',
    fleet_label: 'The Complete Catalog',
    fleet_heading: 'Sovereign Fleet',
    fleet_subtitle: 'Filter through our high-performance exotic motorcars and ultra-luxury sedans.',
    label_brand: 'Brand / Manufacturer',
    label_max_rate: 'Max Daily Rate',
    per_day: '/ day',
    label_sort: 'Sort Vehicles By',
    sort_recommended: 'Recommended First',
    sort_price_low: 'Daily Rate Low to High',
    sort_price_high: 'Daily Rate High to Low',
    sort_luxury: 'Most Exclusive First',
    no_match_heading: 'No Vehicles Match Your Filters',
    no_match_text: 'Try adjusting your price ceiling or brand filter.',
    reset_filters: 'Reset Filters',
    btn_details: 'Details',
    btn_rent_now: 'Rent Now',
    back_to_fleet: 'Back to Fleet Catalog',
    model_year_suffix: 'Model',
    spec_heading: 'Engine & Performance Specs',
    spec_horsepower: 'Horsepower',
    spec_acceleration: 'Acceleration',
    spec_transmission: 'Transmission',
    spec_fuel: 'Fuel / Power',
    features_heading: 'Included Factory Features',
    label_pickup_hub: 'Pick-Up Hub',
    label_return_hub: 'Return Hub',
    label_start_date: 'Start Date',
    label_return_date: 'Return Date',
    label_extras: 'Optional Extras & Protection',
    day_rental_suffix: 'Day Rental',
    vehicle_subtotal: 'Vehicle Subtotal',
    selected_extras: 'Selected Extras',
    estimated_fees: 'Estimated Fees & Taxes',
    total_due: 'Total Due',
    proceed_reserve: 'Proceed to Reserve',
    free_cancellation: 'Free Cancellation up to 48 hours prior',
    btn_back: 'Back',
    step1_title: 'Step 1: Confirm Selected Vehicle',
    step1_desc: 'Review your selected supercar model or switch to another option.',
    view_specs_again: 'View Specs Again',
    continue_rental_details: 'Continue to Rental Details',
    step2_title: 'Step 2: Rental Hub & Schedule',
    step2_desc: 'Specify pick-up/return locations and operational hours.',
    continue_extras: 'Continue to Extras',
    step3_title: 'Step 3: Tailor Extra Services',
    step3_desc: 'Enhance your drive with concierge add-ons and protection.',
    driver_info: 'Driver Info',
    step4_title: 'Step 4: Driver Information',
    step4_desc: 'Please provide verified driver identification details.',
    label_first_name: 'First Name *',
    label_last_name: 'Last Name *',
    label_email: 'Email Address *',
    label_phone: 'Phone Number *',
    payment_method: 'Payment Method',
    step5_title: 'Step 5: Payment Authorization',
    step5_desc: 'Encrypted payment security via Sovereign Guarantee.',
    label_name_on_card: 'Name on Card *',
    label_card_number: 'Card Number *',
    label_expiration: 'Expiration *',
    label_cvv: 'CVV *',
    confirm_and_pay: 'Confirm & Pay',
    reservation_confirmed: 'Reservation Confirmed',
    journey_awaits: 'Your Sovereign Journey Awaits',
    reference_label: 'Reference:',
    days_rental_suffix: 'Days Rental',
    label_rental_dates: 'Rental Dates',
    label_driver_name: 'Driver Name',
    label_total_paid: 'Total Paid',
    print_receipt: 'Print Receipt',
    return_home: 'Return to Home',
    reservation_summary: 'Reservation Summary',
    duration_label: 'Duration',
    vehicle_daily_total: 'Vehicle Daily Total',
    extras_subtotal: 'Extras Subtotal',
    service_tax: 'Service & Tax',
    total_amount: 'Total Amount',
    footer_tagline: 'Curating exceptional automotive journeys. Pure speed, effortless luxury, and uncompromising precision worldwide.',
    footer_nav_heading: 'Navigational',
    footer_link_fleet: 'Exotic Fleet',
    footer_link_hubs: 'Global Hubs',
    footer_link_membership: 'Sovereign Membership',
    footer_link_chauffeur: 'Private Chauffeur',
    footer_contact_heading: 'Concierge Support',
    footer_client_services: '24/7 Dedicated Client Services',
    footer_dispatch_heading: 'Velocita Dispatch',
    footer_dispatch_text: 'Subscribe to receive exclusive access to private fleet releases.',
    footer_subscribe: 'Subscribe',
    footer_email_placeholder: 'Enter email address',
    footer_copyright: 'Velocita Luxury Automotive Rentals. All rights reserved.',
    footer_privacy: 'Privacy Policy',
    footer_terms: 'Terms of Sovereign Rental',
    footer_cookies: 'Cookie Preferences',
    toast_contact: 'Contact Us: +1 (800) 835-6248',
    toast_locations: 'Locations: NYC, LA, Miami, London, Paris',
    toast_membership: 'Sovereign Membership program launching soon.',
    toast_chauffeur: 'Chauffeur services available upon request.',
    toast_newsletter: 'Thank you for joining the Velocita guestbook.',
    toast_validation: 'Please complete all mandatory customer & payment fields.',
    toast_confirmed: 'Reservation confirmed! Confirmation details dispatched.',
    step_label_vehicle: 'Vehicle',
    step_label_details: 'Details',
    step_label_extras: 'Extras',
    step_label_driver: 'Driver',
    step_label_payment: 'Payment'
  },
  sq: {
    header_tagline: 'Qera Veturash',
    nav_home: 'Kryefaqja',
    nav_fleet: 'Flota',
    nav_contact: 'Kontakt',
    header_view_reservation: 'Shiko Rezervimin Aktiv',
    header_reserve: 'Rezervo Tani',
    mobile_reserve: 'Rezervo Veturën',
    hero_badge: 'Koleksioni Sovran 2024',
    hero_heading_pre: 'Ngasim Përtej',
    hero_heading_accent: 'Zakonshmërisë.',
    hero_subtitle: 'Vetura të jashtëzakonshme. Udhëtime pa mundim. Zgjidh kryeveprën tënde nga flota jonë globale e kuruar me vetura sportive elitare, sedan luksoze dhe SUV hiper-performuese.',
    label_pickup_location: 'Vendi i Marrjes',
    label_pickup_datetime: 'Data & Ora e Marrjes',
    label_return_datetime: 'Data & Ora e Kthimit',
    calculated_duration: 'Kohëzgjatja e Llogaritur:',
    days_suffix: 'Ditë',
    search_button: 'Kërko Flotën në Dispozicion',
    featured_label: 'Modele të Zgjedhura',
    featured_heading: 'Flota Sovrane e Zgjedhur',
    explore_all: 'Eksploro të Gjitha Veturat',
    diff_label: 'Ekselencë e Papërsëritshme',
    diff_heading: 'Dallimi Velocita',
    diff_subtitle: 'Ne shkojmë përtej qerasë standarde të veturave duke ofruar mikpritje automobilistike të nivelit të lartë, të përshtatur për shoferë të dalluar.',
    diff_card1_title: 'Modeli i Garantuar Ekzakt',
    diff_card1_desc: 'Kur rezervon një veturë specifike, merr saktësisht atë model, konfigurim dhe specifikë — kurrë një zëvendësim gjenerik të kategorisë.',
    diff_card2_title: 'Dorëzim Ekskluziv',
    diff_card2_desc: 'Gëzo dorëzim pa probleme direkt në terminale private aviacioni, hotele luksoze, ose banesa private.',
    diff_card3_title: 'Mbulim i Plotë',
    diff_card3_desc: 'Mbrojtje sigurimi transparente pa zbritje dhe asistencë koncierge e dedikuar 24/7 në çdo udhëtim.',
    banner_label: 'Udhëtime të Personalizuara',
    banner_heading: 'Lëre Zakonshmërinë Pas.',
    banner_text: 'Qofshin duke komanduar një kalim mali me një 911 GT3 RS apo duke arritur në një gala me një Rolls-Royce Ghost, veturat tona ofrojnë status dhe kënaqësi shqisore të pashoqe.',
    banner_button: 'Shfleto të Gjithë Flotën',
    fleet_label: 'Katalogu i Plotë',
    fleet_heading: 'Flota Sovrane',
    fleet_subtitle: 'Filtro nëpër veturat tona ekzotike me performancë të lartë dhe sedanët ultra-luksozë.',
    label_brand: 'Marka / Prodhuesi',
    label_max_rate: 'Tarifa Maksimale Ditore',
    per_day: '/ ditë',
    label_sort: 'Rendit Veturat Sipas',
    sort_recommended: 'Të Rekomanduarat së Pari',
    sort_price_low: 'Çmimi: I Ulëti në të Lartin',
    sort_price_high: 'Çmimi: I Larti në të Ulëtin',
    sort_luxury: 'Më Ekskluzivet së Pari',
    no_match_heading: 'Asnjë Veturë nuk Përputhet me Filtrat',
    no_match_text: 'Provo të rregullosh kufirin e çmimit ose filtrin e markës.',
    reset_filters: 'Rivendos Filtrat',
    btn_details: 'Detajet',
    btn_rent_now: 'Merre me Qera',
    back_to_fleet: 'Kthehu te Katalogu i Flotës',
    model_year_suffix: 'Model',
    spec_heading: 'Specifikat e Motorit & Performancës',
    spec_horsepower: 'Fuqia (HP)',
    spec_acceleration: 'Nxitimi',
    spec_transmission: 'Transmisioni',
    spec_fuel: 'Karburanti / Energjia',
    features_heading: 'Veçoritë e Përfshira nga Fabrika',
    label_pickup_hub: 'Qendra e Marrjes',
    label_return_hub: 'Qendra e Kthimit',
    label_start_date: 'Data e Fillimit',
    label_return_date: 'Data e Kthimit',
    label_extras: 'Shtesa Opsionale & Mbrojtje',
    day_rental_suffix: 'Ditë Qera',
    vehicle_subtotal: 'Nëntotali i Veturës',
    selected_extras: 'Shtesat e Zgjedhura',
    estimated_fees: 'Taksat & Tarifat e Vlerësuara',
    total_due: 'Totali për Pagesë',
    proceed_reserve: 'Vazhdo për Rezervim',
    free_cancellation: 'Anulim Falas deri 48 orë përpara',
    btn_back: 'Kthehu',
    step1_title: 'Hapi 1: Konfirmo Veturën e Zgjedhur',
    step1_desc: 'Rishiko modelin e zgjedhur ose kalo në një opsion tjetër.',
    view_specs_again: 'Shiko Specifikat Përsëri',
    continue_rental_details: 'Vazhdo te Detajet e Qerasë',
    step2_title: 'Hapi 2: Qendra & Orari i Qerasë',
    step2_desc: 'Specifiko vendndodhjet e marrjes/kthimit dhe orët e funksionimit.',
    continue_extras: 'Vazhdo te Shtesat',
    step3_title: 'Hapi 3: Përshtat Shërbimet Shtesë',
    step3_desc: 'Përmirëso udhëtimin me shtesa koncierge dhe mbrojtje.',
    driver_info: 'Info e Shoferit',
    step4_title: 'Hapi 4: Informacioni i Shoferit',
    step4_desc: 'Ju lutemi jepni detaje të verifikuara identifikimi të shoferit.',
    label_first_name: 'Emri *',
    label_last_name: 'Mbiemri *',
    label_email: 'Adresa Email *',
    label_phone: 'Numri i Telefonit *',
    payment_method: 'Mënyra e Pagesës',
    step5_title: 'Hapi 5: Autorizimi i Pagesës',
    step5_desc: 'Siguri pagese e enkriptuar përmes Garancisë Sovrane.',
    label_name_on_card: 'Emri në Kartë *',
    label_card_number: 'Numri i Kartës *',
    label_expiration: 'Skadenca *',
    label_cvv: 'CVV *',
    confirm_and_pay: 'Konfirmo & Paguaj',
    reservation_confirmed: 'Rezervimi u Konfirmua',
    journey_awaits: 'Udhëtimi Juaj Sovran Ju Pret',
    reference_label: 'Referenca:',
    days_rental_suffix: 'Ditë Qera',
    label_rental_dates: 'Datat e Qerasë',
    label_driver_name: 'Emri i Shoferit',
    label_total_paid: 'Totali i Paguar',
    print_receipt: 'Printo Faturën',
    return_home: 'Kthehu në Kryefaqe',
    reservation_summary: 'Përmbledhja e Rezervimit',
    duration_label: 'Kohëzgjatja',
    vehicle_daily_total: 'Totali Ditor i Veturës',
    extras_subtotal: 'Nëntotali i Shtesave',
    service_tax: 'Shërbimi & Taksa',
    total_amount: 'Shuma Totale',
    footer_tagline: 'Kurojmë udhëtime të jashtëzakonshme automobilistike. Shpejtësi e pastër, luks pa mundim, dhe precizion i pashoq në mbarë botën.',
    footer_nav_heading: 'Navigimi',
    footer_link_fleet: 'Flota Ekzotike',
    footer_link_hubs: 'Qendrat Globale',
    footer_link_membership: 'Anëtarësimi Sovran',
    footer_link_chauffeur: 'Shofer Privat',
    footer_contact_heading: 'Suporti i Kontaktit',
    footer_client_services: 'Shërbime Klienti 24/7',
    footer_dispatch_heading: 'Velocita Dispatch',
    footer_dispatch_text: 'Abonohu për të marrë akses ekskluziv në lançimet private të flotës.',
    footer_subscribe: 'Abonohu',
    footer_email_placeholder: 'Shkruaj adresën email',
    footer_copyright: 'Velocita Luxury Automotive Rentals. Të gjitha të drejtat e rezervuara.',
    footer_privacy: 'Politika e Privatësisë',
    footer_terms: 'Kushtet e Qerasë Sovrane',
    footer_cookies: 'Preferencat e Cookies',
    toast_contact: 'Na Kontaktoni: +1 (800) 835-6248',
    toast_locations: 'Vendndodhjet: NYC, LA, Miami, Londër, Paris',
    toast_membership: 'Programi i Anëtarësimit Sovran po vjen së shpejti.',
    toast_chauffeur: 'Shërbimet e shoferit privat në dispozicion me kërkesë.',
    toast_newsletter: 'Faleminderit që u bashkuat me librin e mysafirëve Velocita.',
    toast_validation: 'Ju lutemi plotësoni të gjitha fushat e detyrueshme të klientit & pagesës.',
    toast_confirmed: 'Rezervimi u konfirmua! Detajet e konfirmimit u dërguan.',
    step_label_vehicle: 'Vetura',
    step_label_details: 'Detajet',
    step_label_extras: 'Shtesat',
    step_label_driver: 'Shoferi',
    step_label_payment: 'Pagesa'
  }
};

const LanguageContext = createContext({ language: 'en', t: (k) => k, toggleLanguage: () => {} });
const useLang = () => useContext(LanguageContext);


/* ============================================================================
   1. MOCK DATA & CONSTANTS
   ============================================================================ */

const LOCATIONS = [
  'New York - JFK Airport',
  'New York - Manhattan Experience Center',
  'Los Angeles - LAX Airport',
  'Los Angeles - Beverly Hills Flagship',
  'Miami - International Airport',
  'Miami - South Beach Atelier',
  'London - Heathrow Executive Terminal',
  'Paris - Charles de Gaulle'
];

const EXTRAS_CATALOG = [
  { id: 'ext-driver', name: 'Chauffeur / Additional Driver', price: 45, unit: 'per day', desc: 'Add a verified secondary driver or professional chauffeur service.' },
  { id: 'ext-gps', name: 'Satellite Concierge & Navigation', price: 15, unit: 'per day', desc: 'Precision real-time telemetry, offline 3D maps, and route guidance.' },
  { id: 'ext-seat', name: 'Isofix Executive Child Seat', price: 20, unit: 'per day', desc: 'Handcrafted leather child safety seat designed for utmost safety.' },
  { id: 'ext-insurance', name: 'Velocita Sovereign Protection', price: 85, unit: 'per day', desc: 'Zero-deductible comprehensive insurance covering damage, glass, and tires.' },
  { id: 'ext-roadside', name: '24/7 VIP Roadside Assistance', price: 25, unit: 'per day', desc: 'Immediate vehicle replacement, fuel delivery, and flat tire support anywhere.' }
];

const FLEET_DATA = [
  {
    id: 'vel-01',
    brand: 'Porsche',
    model: '911 GT3 RS',
    category: 'Sports',
    year: 2024,
    pricePerDay: 850,
    seats: 2,
    transmission: 'Manual',
    fuel: 'Gasoline',
    hp: 518,
    acceleration: '3.0s (0-60)',
    images: [
      'https://s.images.finder.porsche.com/fb770890-1a9a-5137-a4cb-e5ad912f14b6?width=1600&format=auto',
      'https://s.images.finder.porsche.com/43b06fb1-44ae-563d-ac27-c0279f7af53f?width=1600&format=auto',
      'https://s.images.finder.porsche.com/1d31c0c4-f46b-5e3d-ac18-23db3440c3ce?width=1280&format=auto'
    ],
    description: 'Engineering excellence meets raw track passion. The 911 GT3 RS offers unprecedented aerodynamic performance and mechanical precision.',
    features: ['DRS Aerodynamics', 'Carbon Ceramic Brakes', 'Sport Chrono Package', 'Bose Surround System', 'Telemetry Logging']
  },
  {
    id: 'vel-02',
    brand: 'Rolls-Royce',
    model: 'Ghost Extended',
    category: 'Luxury',
    year: 2026,
    pricePerDay: 1450,
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 563,
    acceleration: '4.6s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/f463703a-c7e4-5fb6-bde3-6b32ff9237c1/8b55fea5-62f0-4650-af4d-2376524a1027/4XAXGh49i6_ASJITN7GqROhWNek.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/f463703a-c7e4-5fb6-bde3-6b32ff9237c1/8b55fea5-62f0-4650-af4d-2376524a1027/zSb4mWR-Fcnm6hYOxSD3vbLdhDU.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/f463703a-c7e4-5fb6-bde3-6b32ff9237c1/8b55fea5-62f0-4650-af4d-2376524a1027/6i20Hmr4OBNvX81Wxo5t--KK77w.jpg'
    ],
    description: 'The purest expression of Rolls-Royce luxury. Whispering quiet interior with Starlight headliner and bespoke rear-seat sanctuary.',
    features: ['Starlight Headliner', 'Rear Theater Suite', 'Planar Suspension System', 'Massaging Seats', 'Bespoke Audio']
  },
  {
    id: 'vel-03',
    brand: 'Mercedes-AMG',
    model: 'G 63 Grand Edition',
    category: 'SUV',
    year: 2024,
    pricePerDay: 950,
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 577,
    acceleration: '4.5s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/93af765d-dcf2-438b-93af-80a211819fb7/11d5e8aa-e459-465e-9ba4-68c339085b2a/ZjhmDWAoLcmzk0bjS_MenVeL2UE.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/93af765d-dcf2-438b-93af-80a211819fb7/11d5e8aa-e459-465e-9ba4-68c339085b2a/sydgHRhuCCco_5wKShBFApd9jWM.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/93af765d-dcf2-438b-93af-80a211819fb7/11d5e8aa-e459-465e-9ba4-68c339085b2a/JYA9kaW6_gHE1hvVY8f2ColqHjg.jpg'
    ],
    description: 'An iconic silhouette powered by a handcrafted AMG 4.0L V8 biturbo. Unmatched presence and supreme capability across all terrain.',
    features: ['Burmester 3D Surround', 'AMG Ride Control', 'Exclusive Nappa Leather', 'Ambient Lighting (64 Colors)', 'Night Package']
  },
  {
    id: 'vel-04',
    brand: 'Ferrari',
    model: 'F8 Spider',
    category: 'Convertible',
    year: 2022,
    pricePerDay: 1200,
    seats: 2,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 710,
    acceleration: '2.9s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/656d2022-0262-4262-9d21-135e392dba0b/9hz2ovFBdizICl5t7oqpvl/n_jnSWdDR6sdK-LZvBbJkI8FpWA.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/656d2022-0262-4262-9d21-135e392dba0b/9hz2ovFBdizICl5t7oqpvl/e37z9f78Lq8pdX3xzM74I8jsy_4.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/656d2022-0262-4262-9d21-135e392dba0b/9hz2ovFBdizICl5t7oqpvl/Kpom-A82kKJqP_k3KHUYcPEjApQ.jpg'
    ],
    description: 'Open-top exhilaration powered by the mid-rear V8 that won International Engine of the Year four consecutive times.',
    features: ['Retractable Hardtop', 'Side Slip Angle Control', 'Carbon Fiber Steering Wheel', 'Race Telemetry', 'Titanium Exhaust']
  },
  {
    id: 'vel-05',
    brand: 'Bentley',
    model: 'Continental GT Speed',
    category: 'Grand Tourer',
    year: 2026,
    pricePerDay: 1100,
    seats: 4,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 650,
    acceleration: '3.5s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/268ec963-4f9e-43b4-8f9a-8e5a92127e70/7b4bf701-0a86-4741-9a94-6c564085e171/d-_5oqWydeGEn2HmeihX8_WE6Ak.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/268ec963-4f9e-43b4-8f9a-8e5a92127e70/7b4bf701-0a86-4741-9a94-6c564085e171/LdIxsATOWrOJaNheWCkgMu4et5A.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/268ec963-4f9e-43b4-8f9a-8e5a92127e70/7b4bf701-0a86-4741-9a94-6c564085e171/wolkp7fOiuwfGGW6Z2aGY_sfEBk.jpg'
    ],
    description: 'The pinnacle performance grand tourer. Phenomenal W12 engine capability combined with hand-stitched British craftsmanship.',
    features: ['Rotating Display', 'Naim Audio System', 'Diamond-in-Diamond Quilting', 'All-Wheel Steering', 'Carbon Ceramic Brakes']
  },
  {
    id: 'vel-06',
    brand: 'Lamborghini',
    model: 'Urus Performante',
    category: 'SUV',
    year: 2024,
    pricePerDay: 1150,
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 657,
    acceleration: '3.3s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/08cb8b0e-0d9b-5eba-9354-55618dd089a2/57a4c310-f69f-4c28-bcc8-8814f5fdd587/Dfnh5KOfN4LHiC9gr8tKTucxf1w.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/08cb8b0e-0d9b-5eba-9354-55618dd089a2/57a4c310-f69f-4c28-bcc8-8814f5fdd587/pqABOAEVb_LFBFKDLGfqxTwHhVc.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/08cb8b0e-0d9b-5eba-9354-55618dd089a2/57a4c310-f69f-4c28-bcc8-8814f5fdd587/oS-f_muEw2uH6pcM6RjA1TDASGA.jpg'
    ],
    description: 'Super Sports Car ethos fused with SUV versatility. Designed for drivers who demand unrivaled dynamics on highway and track.',
    features: ['Akrapovič Titanium Exhaust', 'Carbon Fiber Hood', 'ANIMA Selector with Rally Mode', 'Bang & Olufsen 3D Sound', 'Alcantara Interior']
  },
  {
    id: 'vel-07',
    brand: 'Aston Martin',
    model: 'DB12 Coupe',
    category: 'Sports',
    year: 2024,
    pricePerDay: 980,
    seats: 4,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 671,
    acceleration: '3.5s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/08cb8b0e-0d9b-5eba-9354-55618dd089a2/c4798e68-00f4-4c74-9277-9c66f9505cf8/0hiBPAnPb3BGRFSA_kpz_6dYwgo.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/08cb8b0e-0d9b-5eba-9354-55618dd089a2/c4798e68-00f4-4c74-9277-9c66f9505cf8/voSy2xvQ9TwwKs-9D93Sd0pB6SM.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/08cb8b0e-0d9b-5eba-9354-55618dd089a2/c4798e68-00f4-4c74-9277-9c66f9505cf8/D3GekdyK4AMKXyggp2VibCL5fCA.jpg'
    ],
    description: 'The world’s first Super Tourer. Bold performance, luxury, and advanced digital infotainment in an sculpted muscular body.',
    features: ['Bowers & Wilkins Audio', 'Electronic Rear Differential', 'Adaptive Damping', 'Custom Touch Infotainment', 'Bridge of Weir Leather']
  },
  {
    id: 'vel-08',
    brand: 'Audi',
    model: 'RS e-tron GT',
    category: 'Electric',
    year: 2024,
    pricePerDay: 750,
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Electric',
    hp: 637,
    acceleration: '3.1s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/173d9410-902b-5c85-9999-28a844469426/1b280d04-7390-4f9b-8d8e-f1079505beca/b25jUAUxK3NbiCH71biR00dA6G8.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/173d9410-902b-5c85-9999-28a844469426/1b280d04-7390-4f9b-8d8e-f1079505beca/TpY9TpKKjejnCA52m-g1y-Aj6gw.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/173d9410-902b-5c85-9999-28a844469426/1b280d04-7390-4f9b-8d8e-f1079505beca/LlYXxQXWjKtGGTz2kjGHyQHiohM.jpg'
    ],
    description: 'Instant electric acceleration meets progressive grand touring aesthetics. 800V architecture for rapid high-power charging.',
    features: ['e-torque vectoring plus', 'Matrix LED Headlights', 'Carbon Roof Panel', 'Bang & Olufsen Sound', '800V Charging System']
  },
  {
    id: 'vel-09',
    brand: 'Maserati',
    model: 'MC20 Cielo',
    category: 'Convertible',
    year: 2023,
    pricePerDay: 1300,
    seats: 2,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 621,
    acceleration: '2.9s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/656d2022-0262-4262-9d21-135e392dba0b/97ab7377-9c5b-42af-a92e-4bba105e961c/_TQEVlUBcXe2z_6on2hA4_XG6-c.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/656d2022-0262-4262-9d21-135e392dba0b/97ab7377-9c5b-42af-a92e-4bba105e961c/A_c7nxLkyHA6gytZYOgSULKkP2A.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/656d2022-0262-4262-9d21-135e392dba0b/97ab7377-9c5b-42af-a92e-4bba105e961c/aQesl1LuphlocVf1nZm9AqftIa8.jpg'
    ],
    description: 'Featuring the innovative Nettuno V6 engine and a smart glass roof that transforms from clear to opaque at the touch of a button.',
    features: ['Smart Glass Roof', 'Nettuno Twin-Turbo Engine', 'Butterfly Doors', 'Sonus faber Audio', 'Monocoque Carbon Chassis']
  },
  {
    id: 'vel-10',
    brand: 'Range Rover',
    model: 'SV Autobiography',
    category: 'SUV',
    year: 2021,
    pricePerDay: 890,
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 606,
    acceleration: '4.4s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/b439db83-feeb-54de-9505-33e31c95b937/1954bed1-4e44-4102-97d8-7642113f34dc/PpxgLf1qw34p42l2TJU76kdblcA.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/b439db83-feeb-54de-9505-33e31c95b937/1954bed1-4e44-4102-97d8-7642113f34dc/SJaMq9O36k4_RvbAR-jMe91dDAI.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/b439db83-feeb-54de-9505-33e31c95b937/1954bed1-4e44-4102-97d8-7642113f34dc/sLs6X-lJl1kdxHpxwOuZn8gmEHY.jpg'
    ],
    description: 'Exquisite peerless refinement. Features executive rear seating, tail-gate event seating, and acoustic laminated glass.',
    features: ['Active Noise Cancellation', 'Executive Class Comfort Seats', 'Meridian Signature Sound', 'All-Wheel Steering', 'Hot Stone Massage']
  },
  {
    id: 'vel-11',
    brand: 'Ferrari',
    model: 'SF90 Stradale',
    category: 'Sports',
    year: 2021,
    pricePerDay: 1600,
    seats: 2,
    transmission: 'Automatic',
    fuel: 'Electric',
    hp: 986,
    acceleration: '2.5s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/94ca39c7-ade2-5c96-bb7d-c6faad891eee/c32d72a5-0767-4b8b-a54c-d020a72722e9/XxJVqq1vcV9vzIxH46S4yjSj5js.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/94ca39c7-ade2-5c96-bb7d-c6faad891eee/c32d72a5-0767-4b8b-a54c-d020a72722e9/wrxlY1GNgBuxBWCbdew3U941P3M.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/94ca39c7-ade2-5c96-bb7d-c6faad891eee/c32d72a5-0767-4b8b-a54c-d020a72722e9/P969JIEwLjTz1YAJH7tF8rMHVtg.jpg'
    ],
    description: 'Ferrari’s flagship hybrid supercar combining a twin-turbo V8 with three electric motors for mind-bending performance.',
    features: ['eManettino Selector', 'RAC-e Torque Vectoring', 'Carbon Fiber Aero Wheel', 'Digital Dashboard Cluster', 'Active Rear Wing']
  },
  {
    id: 'vel-12',
    brand: 'Ferrari',
    model: '296 GTB',
    category: 'Sports',
    year: 2024,
    pricePerDay: 1100,
    seats: 2,
    transmission: 'Automatic',
    fuel: 'Electric',
    hp: 819,
    acceleration: '2.9s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/69c3d008-956b-5c98-b5df-cc665ac24b85/30633023-0a6b-42e6-b8bf-2b9eefc277fe/AnBciGA7ZVqsCAREpuo3powjCsA.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/69c3d008-956b-5c98-b5df-cc665ac24b85/30633023-0a6b-42e6-b8bf-2b9eefc277fe/sx-CNokjWVmufY633Y8ddDm2dDE.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/69c3d008-956b-5c98-b5df-cc665ac24b85/30633023-0a6b-42e6-b8bf-2b9eefc277fe/8XYj5P5YFDyecXhiU_m7fkYuETw.jpg'
    ],
    description: 'Fun-to-drive redefined with a mid-rear 120° V6 plug-in hybrid architecture giving thrilling agility.',
    features: ['E-Diff Integration', 'ABS Evo Controller', 'Assetto Fiorano Package', 'Alcantara Cockpit', 'Titanium Exhaust Tips']
  },
  {
    id: 'vel-13',
    brand: 'Ferrari',
    model: 'Roma Spider',
    category: 'Convertible',
    year: 2024,
    pricePerDay: 950,
    seats: 4,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 612,
    acceleration: '3.4s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/94ca39c7-ade2-5c96-bb7d-c6faad891eee/14093015-24ac-4876-8799-4ccf04770e4d/gtBzzpZa5m-bRVVJgEFBH6Nz-r8.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/94ca39c7-ade2-5c96-bb7d-c6faad891eee/14093015-24ac-4876-8799-4ccf04770e4d/VsXoMnHbcVBZAiBmdQTREdvvfC8.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/94ca39c7-ade2-5c96-bb7d-c6faad891eee/14093015-24ac-4876-8799-4ccf04770e4d/wvo2ZXC45v1L7pIN2IXZkx0OHnY.jpg'
    ],
    description: 'A contemporary representation of the carefree 1950s and 60s Italian lifestyle with a refined soft top.',
    features: ['Tailored Fabric Roof', 'Wind Deflector', 'Passenger Display', '5-position Manettino', 'JBL Premium Audio']
  },
  {
    id: 'vel-14',
    brand: 'Ferrari',
    model: 'Purosangue',
    category: 'SUV',
    year: 2026,
    pricePerDay: 1850,
    seats: 4,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 715,
    acceleration: '3.3s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/94ca39c7-ade2-5c96-bb7d-c6faad891eee/fb12ffba-b4bc-4f25-ba2e-c5bc96e7c378/S1pRh6JYiSWPU6rFV0DcjYOvqzw.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/94ca39c7-ade2-5c96-bb7d-c6faad891eee/fb12ffba-b4bc-4f25-ba2e-c5bc96e7c378/XWD4TUzROMEwh7_sFdB9hZWqh3c.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/94ca39c7-ade2-5c96-bb7d-c6faad891eee/fb12ffba-b4bc-4f25-ba2e-c5bc96e7c378/ZopWWSbJqHz4xQj-FipLc8s-V9c.jpg'
    ],
    description: 'The first-ever four-door four-seater car in Ferrari history, housing a naturally aspirated V12 beast.',
    features: ['Welcome Rear Doors', 'Active Suspension System', 'V12 Engine', 'Burmester High-End Audio', 'Massaging Front Seats']
  },
  {
    id: 'vel-15',
    brand: 'Lamborghini',
    model: 'Revuelto',
    category: 'Sports',
    year: 2024,
    pricePerDay: 1950,
    seats: 2,
    transmission: 'Automatic',
    fuel: 'Electric',
    hp: 1001,
    acceleration: '2.5s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/a69300eb-9711-5e50-ad4c-611b915d32d5/1cb2a012-9529-4ed7-9c4d-73760cac9b13/4V94MNMjFf00KvTu2JPasDW3nyE.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/a69300eb-9711-5e50-ad4c-611b915d32d5/1cb2a012-9529-4ed7-9c4d-73760cac9b13/LJRITUDLKDAXFVfN9cbK3BszkLU.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/a69300eb-9711-5e50-ad4c-611b915d32d5/1cb2a012-9529-4ed7-9c4d-73760cac9b13/7DH1PB59d3DiBT0l0SL41s-9KBI.jpg'
    ],
    description: 'The HPEV (High Performance Electrified Vehicle) hybrid super sports car equipped with an unyielding V12.',
    features: ['Monofuselage Frame', 'Citta Electric Drive Mode', 'LDVI 2.0 Telemetry', 'Cornering Vectoring', 'Carbon Ceramic Brakes']
  },
  {
    id: 'vel-16',
    brand: 'Lamborghini',
    model: 'Huracán Sterrato',
    category: 'Sports',
    year: 2023,
    pricePerDay: 1250,
    seats: 2,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 602,
    acceleration: '3.4s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/b7271ba2-d635-5917-a312-a104d3554778/b5dbc3bd-39e2-4778-b45b-bfbd61ae33f5/kjHggEdF6ViitzuHJEaGE1FLhYU.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/b7271ba2-d635-5917-a312-a104d3554778/b5dbc3bd-39e2-4778-b45b-bfbd61ae33f5/51nVoyX3gOsZZIuWYTURaOzKXFI.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/b7271ba2-d635-5917-a312-a104d3554778/b5dbc3bd-39e2-4778-b45b-bfbd61ae33f5/-FGy6cSKgcOBxkkeGaViF8Rgxcw.jpg'
    ],
    description: 'Designed for maximum driving pleasure off the beaten track on loose surfaces.',
    features: ['Raised Ground Clearance', 'Rally Mode', 'Roof Air Intake', 'Reinforced Underbody', 'Bridgestone Dueler AT Tires']
  },
  {
    id: 'vel-17',
    brand: 'Lamborghini',
    model: 'Huracán Tecnica',
    category: 'Sports',
    year: 2022,
    pricePerDay: 1050,
    seats: 2,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 631,
    acceleration: '3.2s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/2b427266-2af3-56d8-af22-5491142dc936/570a31ab-7920-4942-b67e-a225ab6766cb/VgqWGHxreuq9SfLbXrADwUuQ6L0.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/2b427266-2af3-56d8-af22-5491142dc936/570a31ab-7920-4942-b67e-a225ab6766cb/IW8aXYPWHFcEKbwaBkT57WldYgA.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/2b427266-2af3-56d8-af22-5491142dc936/570a31ab-7920-4942-b67e-a225ab6766cb/yXgAwK_HWBIFU0jq1Jox3bNruEA.jpg'
    ],
    description: 'Bridging track performance and road versatility with a naturally aspirated V12 experience.',
    features: ['Rear-Wheel Steering', 'Direct Steering Ratio', 'Fixed Rear Wing', 'Hexagonal Exhausts', 'Lightweight Door Panels']
  },
  {
    id: 'vel-18',
    brand: 'Porsche',
    model: 'Taycan Turbo S',
    category: 'Electric',
    year: 2026,
    pricePerDay: 800,
    seats: 4,
    transmission: 'Automatic',
    fuel: 'Electric',
    hp: 750,
    acceleration: '2.6s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/10df4d9f-2430-5149-ab1f-b108ecb1dc78/35e72fc0-656f-44c9-befd-6d3597732e51/gZ_puKAJ-mgX4MRbrgVeyBVLatg.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/10df4d9f-2430-5149-ab1f-b108ecb1dc78/35e72fc0-656f-44c9-befd-6d3597732e51/sC7S_dFWS8V2AZcsyxe27D1-KGE.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/10df4d9f-2430-5149-ab1f-b108ecb1dc78/35e72fc0-656f-44c9-befd-6d3597732e51/UnUnJ8ImYMDAclJnwsr5_WdbTfo.jpg'
    ],
    description: 'Pure electric sports car driving with lightning acceleration and 270kW ultra-fast charging.',
    features: ['Porsche Electric Sport Sound', '800V Battery Architecture', 'Passenger Display Screen', 'Rear Axle Steering', 'PDCC Sport']
  },
  {
    id: 'vel-19',
    brand: 'Porsche',
    model: 'Panamera GTS',
    category: 'Grand Tourer',
    year: 2026,
    pricePerDay: 700,
    seats: 4,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 493,
    acceleration: '3.7s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/0f7cedb6-bf1a-5fc5-8137-c2b8782fe9f1/96b47c38-b633-4e70-ac8c-4b924a895f96/VkgbLj1cC1yrWkqLSJcSsesiNDk.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/0f7cedb6-bf1a-5fc5-8137-c2b8782fe9f1/96b47c38-b633-4e70-ac8c-4b924a895f96/9Q6tphfr1DHPGhUW_9J2vMYKCq8.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/0f7cedb6-bf1a-5fc5-8137-c2b8782fe9f1/96b47c38-b633-4e70-ac8c-4b924a895f96/8gEb6o0fDRHweQSgitbqVwe5RCk.jpg'
    ],
    description: 'Four-door performance car efficiency blended with supreme long-distance touring comfort.',
    features: ['Active Suspension Management', 'Sport Exhaust System', 'GTS Alcantara Trim', 'Panoramic Roof', 'Head-Up Display']
  },
  {
    id: 'vel-20',
    brand: 'Porsche',
    model: '718 Cayman GT4 RS',
    category: 'Sports',
    year: 2024,
    pricePerDay: 780,
    seats: 2,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 493,
    acceleration: '3.2s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/137c8e65-16b0-595f-abac-0922f3699fac/560b4e1a-871f-44e0-afc1-55a8c74b6e79/iZX-sVbBAt4xO-t76WFhD-dR-t0.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/137c8e65-16b0-595f-abac-0922f3699fac/560b4e1a-871f-44e0-afc1-55a8c74b6e79/7ObEK5igL-MGJEWDPL0Vo_R-78E.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/137c8e65-16b0-595f-abac-0922f3699fac/560b4e1a-871f-44e0-afc1-55a8c74b6e79/8FrASIqqjzkQKU86wA_hFoCooPk.jpg'
    ],
    description: 'A mid-engine road racer engineered to deliver maximum acoustic and dynamic thrills.',
    features: ['Process Air Intakes behind windows', 'Swan-neck Rear Wing', 'Weissach Package Option', 'Carbon Hood', 'ClubSport Roll Cage']
  },
  {
    id: 'vel-21',
    brand: 'Rolls-Royce',
    model: 'Spectre Coupe',
    category: 'Electric',
    year: 2024,
    pricePerDay: 1650,
    seats: 4,
    transmission: 'Automatic',
    fuel: 'Electric',
    hp: 577,
    acceleration: '4.4s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/0ed6601e-75f3-5b96-b8f7-10fecdc86520/5cbbf78c-59be-4f1a-bdf4-a9a3379bc54c/QQAKcgGLhB5D9GO8KdIpN85fuKc.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/0ed6601e-75f3-5b96-b8f7-10fecdc86520/5cbbf78c-59be-4f1a-bdf4-a9a3379bc54c/niFNdw0gvGrNom1HLWfyT3QPK9g.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/0ed6601e-75f3-5b96-b8f7-10fecdc86520/5cbbf78c-59be-4f1a-bdf4-a9a3379bc54c/r3vB13MeX3GO76vey4WHnNl8UxQ.jpg'
    ],
    description: 'The world’s first ultra-luxury electric super coupe. Silence elevated to unprecedented majesty.',
    features: ['Starlight Doors', 'Illuminated Grille', 'Planar Suspension', 'Whisper-Quiet Cabin', 'Bespoke Spirit Audio']
  },
  {
    id: 'vel-22',
    brand: 'Rolls-Royce',
    model: 'Cullinan Black Badge',
    category: 'SUV',
    year: 2025,
    pricePerDay: 1700,
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 592,
    acceleration: '4.9s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/268ec963-4f9e-43b4-8f9a-8e5a92127e70/dc4c896b-0163-45cf-b9e0-c3f2be937088/7i5HF07BTdonng1OeFGC6jpXN0A.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/268ec963-4f9e-43b4-8f9a-8e5a92127e70/dc4c896b-0163-45cf-b9e0-c3f2be937088/ls98-3PHuJ06o_5daB5T4uC1zHE.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/268ec963-4f9e-43b4-8f9a-8e5a92127e70/dc4c896b-0163-45cf-b9e0-c3f2be937088/LgVTjWf2UbQTIsBtoW4_k2peIyA.jpg'
    ],
    description: 'The alter ego of luxury. Darkened chrome, recalibrated 6.75L V12, and assertive presence.',
    features: ['Viewing Suite in Trunk', 'Forge Yellow Accents', 'Black Chrome Spirit of Ecstasy', 'All-Terrain Button', 'Lambswool Floor Mats']
  },
  {
    id: 'vel-23',
    brand: 'Rolls-Royce',
    model: 'Phantom',
    category: 'Luxury',
    year: 2023,
    pricePerDay: 1800,
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 563,
    acceleration: '5.1s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/1d3ca5b5-f61a-492d-b32c-4bab57cd9102/18c5b84d-22fb-4737-9ebf-c698a26f2888/nB89r5YLUfkO-tHDnRNCgkGLtl4.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/1d3ca5b5-f61a-492d-b32c-4bab57cd9102/18c5b84d-22fb-4737-9ebf-c698a26f2888/4EIq3ikx0b0IDMDhVct8o5aGPA8.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/1d3ca5b5-f61a-492d-b32c-4bab57cd9102/18c5b84d-22fb-4737-9ebf-c698a26f2888/Xx5BZMpAXLs74Kcpqc3nQcHQUCY.jpg'
    ],
    description: 'The flagship benchmark of bespoke luxury motorcars worldwide.',
    features: ['The Gallery Dashboard', 'Immersive Seating Suite', 'Privacy Suite Glass', 'Power-Close Coach Doors', 'Self-Righting Wheel Centers']
  },
  {
    id: 'vel-24',
    brand: 'Bentley',
    model: 'Flying Spur Mulliner',
    category: 'Luxury',
    year: 2026,
    pricePerDay: 1200,
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 626,
    acceleration: '3.7s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/a8f0023c-1f3d-5a79-80aa-880d30f90aef/47bf9fcb-3504-4983-93fd-8a9fd3d8021f/gF_2kDsUVLAiolkZda-F9zTCfL0.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/a8f0023c-1f3d-5a79-80aa-880d30f90aef/47bf9fcb-3504-4983-93fd-8a9fd3d8021f/CP8GD59fi7C5MtZDsNLaUct-abU.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/a8f0023c-1f3d-5a79-80aa-880d30f90aef/47bf9fcb-3504-4983-93fd-8a9fd3d8021f/CkuV4iOoXjCEyUliB72J7dyajVA.jpg'
    ],
    description: 'Handcrafted luxury luxury saloon crafted by Mulliner division for distinguished travelers.',
    features: ['Electric Deployable Flying B', 'Mulliner Diamond Quilting', 'Rear Picnic Tables', '3D Leather Door Panels', 'Electrically Powered Blinds']
  },
  {
    id: 'vel-25',
    brand: 'Bentley',
    model: 'Bentayga EWB Azure',
    category: 'SUV',
    year: 2023,
    pricePerDay: 1000,
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 542,
    acceleration: '4.5s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/7da16f4e-6f66-57c6-ab69-a0b617a5fa46/4cf5ce3c-a44c-4c2f-b123-9250930a92de/QM4-LzAgTR7RAHfsCd0DuZa55HA.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/7da16f4e-6f66-57c6-ab69-a0b617a5fa46/4cf5ce3c-a44c-4c2f-b123-9250930a92de/zM0uU3f35wxUiloX5XI0auAKdoA.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/7da16f4e-6f66-57c6-ab69-a0b617a5fa46/4cf5ce3c-a44c-4c2f-b123-9250930a92de/hdveaBFFHxdd4bu-UncHHvqXcLI.jpg'
    ],
    description: 'Extended Wheelbase SUV focusing on wellness, effortless quietness, and rear airline seat specification.',
    features: ['Airline Seat Specification', 'Bentley Diamond Illumination', 'Touring Specification', 'Rear Door Power Close', 'Air Ionizers']
  },
  {
    id: 'vel-26',
    brand: 'Mercedes-AMG',
    model: 'GT Black Series',
    category: 'Sports',
    year: 2023,
    pricePerDay: 1400,
    seats: 2,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 720,
    acceleration: '3.1s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/2b427266-2af3-56d8-af22-5491142dc936/d9870112-a072-4cdb-bfea-01598044fab1/knJThRvkP8a7XoQdDFaW3zetWl4.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/2b427266-2af3-56d8-af22-5491142dc936/d9870112-a072-4cdb-bfea-01598044fab1/1teBVdFdNfDQmvZI3coNxsKs3qI.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/2b427266-2af3-56d8-af22-5491142dc936/d9870112-a072-4cdb-bfea-01598044fab1/fWf1TI9d1TycAx5_P9dz6dHvQSo.jpg'
    ],
    description: 'Flat-plane crankshaft V8 race engine packed inside an street-legal aerodynamic track weapon.',
    features: ['Two-stage Carbon Rear Wing', 'Carbon Fiber Front Splitter', 'AMG Traction Control 9-step', 'Roll Cage', 'Ceramic High-Performance Brakes']
  },
  {
    id: 'vel-27',
    brand: 'Mercedes-AMG',
    model: 'SL 63 Base',
    category: 'Convertible',
    year: 2024,
    pricePerDay: 850,
    seats: 4,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 577,
    acceleration: '3.5s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/2b427266-2af3-56d8-af22-5491142dc936/81a8a454-a897-4e14-bd82-a088b424ba77/OUOXkTWwDakg0CsmcjYY_XTKTF0.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/2b427266-2af3-56d8-af22-5491142dc936/81a8a454-a897-4e14-bd82-a088b424ba77/XDUmKj_dpySAG9A3R2rE1q9hu5w.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/2b427266-2af3-56d8-af22-5491142dc936/81a8a454-a897-4e14-bd82-a088b424ba77/rwtYc49EEWD83BLGHw6qP33Pn-c.jpg'
    ],
    description: 'Reinvented open-top roadster with 4MATIC+ all-wheel drive and luxury performance technology.',
    features: ['AIRSCARF Neck Warming', 'Z-Fold Fabric Soft Top', '11.9-inch Tilting Screen', 'Active Anti-roll Stabilization', 'Burmester Surround']
  },
  {
    id: 'vel-28',
    brand: 'Mercedes-AMG',
    model: 'S 63 E AMG',
    category: 'Luxury',
    year: 2026,
    pricePerDay: 1050,
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Electric',
    hp: 791,
    acceleration: '3.2s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/0f7cedb6-bf1a-5fc5-8137-c2b8782fe9f1/011db5c7-e570-4f9d-a11c-d33f186befc0/7VqozSFCCl_mBLQ3qE9M2UlZX5Q.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/0f7cedb6-bf1a-5fc5-8137-c2b8782fe9f1/011db5c7-e570-4f9d-a11c-d33f186befc0/HyWOtxyZywX2e2dgF_KiPCJjr1M.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/0f7cedb6-bf1a-5fc5-8137-c2b8782fe9f1/011db5c7-e570-4f9d-a11c-d33f186befc0/59bdIQTeCKReFkW_wyAL6bsTXbE.jpg'
    ],
    description: 'F1 hybrid tech transferred to an executive S-Class luxury cruiser with enormous torque.',
    features: ['MBUX High-End Rear Entertainment', 'Active Rear-Axle Steering', 'AMG Dynamic Select', 'ENERGIZING Comfort Package', 'Digital Light Headlamps']
  },
  {
    id: 'vel-29',
    brand: 'Aston Martin',
    model: 'DBS 770 Ultimate',
    category: 'Grand Tourer',
    year: 2023,
    pricePerDay: 1350,
    seats: 4,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 759,
    acceleration: '3.2s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/32e32cc8-95f5-4e19-b494-0e49730673f2/06a8ce35-c610-40e3-9d80-0ec765ed61ba/cT9sfDRZA_hQ3fTpQFZbYSyh8vE.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/32e32cc8-95f5-4e19-b494-0e49730673f2/06a8ce35-c610-40e3-9d80-0ec765ed61ba/CjZo_rnkiZV9G3oAPaGRbuvzO2o.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/32e32cc8-95f5-4e19-b494-0e49730673f2/06a8ce35-c610-40e3-9d80-0ec765ed61ba/BAbBv-cwIii1mi-Dv-E4eEP2SOA.jpg'
    ],
    description: 'The final, most powerful iteration of Aston Martin’s flaghship DBS series.',
    features: ['Horse-shoe Engine Vents', 'Carbon Fiber Performance Seats', 'Calibrated 8-Speed Transmission', 'Carbon Ceramic Brakes', 'Bespoke Badging']
  },
  {
    id: 'vel-30',
    brand: 'Aston Martin',
    model: 'Vantage V12 Coupe',
    category: 'Sports',
    year: 2023,
    pricePerDay: 750,
    seats: 2,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 527,
    acceleration: '3.5s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/e3f3dcac-0bc0-56ba-a273-841daa397dbd/ae19385e-371f-454c-8ac4-1cb1f4f69d1a/MP8ItRNstkYngyal5CR54mUZIcU.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/e3f3dcac-0bc0-56ba-a273-841daa397dbd/ae19385e-371f-454c-8ac4-1cb1f4f69d1a/kUqL10sO5QcKFH28eWxyAYXp2LY.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/e3f3dcac-0bc0-56ba-a273-841daa397dbd/ae19385e-371f-454c-8ac4-1cb1f4f69d1a/LimNxmU0gNLXW5309JK3TEYoGkk.jpg'
    ],
    description: 'Official Safety Car replica featuring enhanced aero downforce and chassis stiffness.',
    features: ['F1 Aerodynamic Kit', '21-inch Satin Black Wheels', 'Quad Exhaust Outlets', 'Alcantara Sport Seats', 'Carbon Fiber Interior Trim']
  },
  {
    id: 'vel-31',
    brand: 'Aston Martin',
    model: 'DBX707',
    category: 'SUV',
    year: 2025,
    pricePerDay: 900,
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 697,
    acceleration: '3.1s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/69b01c4e-5ec9-4aec-bc31-f179b2e13cb7/2f018ee9-4418-4969-b5cc-5719d28b004c/-3UGQEsJpQzY8UWA0rC1kW8e1VM.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/69b01c4e-5ec9-4aec-bc31-f179b2e13cb7/2f018ee9-4418-4969-b5cc-5719d28b004c/JUsYJ9OuTqkYm6Dn1T_VIl26wXE.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/69b01c4e-5ec9-4aec-bc31-f179b2e13cb7/2f018ee9-4418-4969-b5cc-5719d28b004c/7Ho3VFm51Vn_DvP9Vln7rxzZAqc.jpg'
    ],
    description: 'The world’s most powerful luxury performance SUV with supercar dynamic agility.',
    features: ['Wet-Clutch 9-Speed Transmission', 'Carbon Ceramic Brakes', 'Quad Rear Exhaust', 'Sport Seats Plus', 'Electronic Limited Slip Rear Differential']
  },
  {
    id: 'vel-32',
    brand: 'McLaren',
    model: '750S Spider',
    category: 'Convertible',
    year: 2027,
    pricePerDay: 1350,
    seats: 2,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 740,
    acceleration: '2.7s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/f463703a-c7e4-5fb6-bde3-6b32ff9237c1/5e148765-fb17-44d8-8aa3-9a7a33837a02/OVLnG64236ipPJghc1jvY3x0wzw.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/f463703a-c7e4-5fb6-bde3-6b32ff9237c1/5e148765-fb17-44d8-8aa3-9a7a33837a02/Z2tm4ZwEZzkyVcKEeYWfVuA2xOo.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/f463703a-c7e4-5fb6-bde3-6b32ff9237c1/5e148765-fb17-44d8-8aa3-9a7a33837a02/siN3r9xsC1QAQRUj9h7pvO9ukHE.jpg'
    ],
    description: 'Unforgiving light weight, extreme engagement, and retractable hardtop open-air thrills.',
    features: ['Proactive Chassis Control III', 'Retractable Hard Top (11 sec)', 'Monocage II-S Carbon Chassis', 'Bowers & Wilkins 12-Speaker', 'Active Rear Wing']
  },
  {
    id: 'vel-33',
    brand: 'McLaren',
    model: 'Artura',
    category: 'Sports',
    year: 2023,
    pricePerDay: 950,
    seats: 2,
    transmission: 'Automatic',
    fuel: 'Electric',
    hp: 671,
    acceleration: '3.0s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/0f7cedb6-bf1a-5fc5-8137-c2b8782fe9f1/c97ef7ef-c13b-4f59-8302-65c96d7c7a82/Fd5w8BJkuVpCr-kstAJ_zmI1DbM.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/0f7cedb6-bf1a-5fc5-8137-c2b8782fe9f1/c97ef7ef-c13b-4f59-8302-65c96d7c7a82/-9igOGK1dqqHYc3E_vsMObAz-HU.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/0f7cedb6-bf1a-5fc5-8137-c2b8782fe9f1/c97ef7ef-c13b-4f59-8302-65c96d7c7a82/a9jMXzR06SIexmOyL-J90Hc-CTs.jpg'
    ],
    description: 'Next-generation High-Performance Hybrid supercar crafted around carbon lightweight architecture.',
    features: ['McLaren Carbon Lightweight Architecture', 'E-differential', 'Clubsport Seats', 'MIS II Infotainment', 'Electro-hydraulic Steering']
  },
  {
    id: 'vel-34',
    brand: 'McLaren',
    model: 'GT',
    category: 'Grand Tourer',
    year: 2023,
    pricePerDay: 800,
    seats: 2,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 612,
    acceleration: '3.1s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/285aa0d5-8574-5d35-a4ac-f1506fe10e05/4778e940-c002-42bf-8b14-ff487cc37544/yrx9AcDCfk0YoJ2J8EWQqJexEU0.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/285aa0d5-8574-5d35-a4ac-f1506fe10e05/4778e940-c002-42bf-8b14-ff487cc37544/d3bavcrxNzXsjPsa6jwn8YZWu2M.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/285aa0d5-8574-5d35-a4ac-f1506fe10e05/4778e940-c002-42bf-8b14-ff487cc37544/_I79eH1jLFUXvgvl204QSV5TKlI.jpg'
    ],
    description: 'Rethinking the Grand Tourer. Superlight weight combined with luggage room for continent crossing.',
    features: ['Luggage Bay SuperFabric', 'Electrochromic Panoramic Roof', 'Pioneer Luggage Bay', 'Bowers & Wilkins Audio', 'Carbon Monocoque']
  },
  {
    id: 'vel-35',
    brand: 'Maserati',
    model: 'GranTurismo Folgore',
    category: 'Electric',
    year: 2024,
    pricePerDay: 900,
    seats: 4,
    transmission: 'Automatic',
    fuel: 'Electric',
    hp: 750,
    acceleration: '2.7s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/08cb8b0e-0d9b-5eba-9354-55618dd089a2/1f7668af-1a66-440a-a3c3-70baf2dfac8a/r3WpghOjR7L_BvpUoKJ-rIBsGD0.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/08cb8b0e-0d9b-5eba-9354-55618dd089a2/1f7668af-1a66-440a-a3c3-70baf2dfac8a/JkNTU7LVquPPo2-pAuq4KEDuKOM.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/08cb8b0e-0d9b-5eba-9354-55618dd089a2/1f7668af-1a66-440a-a3c3-70baf2dfac8a/Fw12azl2NqoKrsDyPKZPz4m1Pys.jpg'
    ],
    description: '100% electric propulsionGT featuring formula E battery technology and Italian flair.',
    features: ['Triple Electric Motor Setup', '800V Architecture', 'Sonus Faber Audio System', 'Digital Smart Clock', 'E-Torque Vectoring']
  },
  {
    id: 'vel-36',
    brand: 'Maserati',
    model: 'Grecale Trofeo',
    category: 'SUV',
    year: 2025,
    pricePerDay: 650,
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 523,
    acceleration: '3.6s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/08cb8b0e-0d9b-5eba-9354-55618dd089a2/19305d40-0684-4c7f-be45-5066d6a37f7e/PhtkEvPNWqAPPAU990ll7rGEPwY.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/08cb8b0e-0d9b-5eba-9354-55618dd089a2/19305d40-0684-4c7f-be45-5066d6a37f7e/7VobWLg9-Zmnt8W8F55VI-trHtE.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/08cb8b0e-0d9b-5eba-9354-55618dd089a2/19305d40-0684-4c7f-be45-5066d6a37f7e/QWFw6C-guItp6BSbimv0z0STVWk.jpg'
    ],
    description: 'Compact high-performance SUV featuring Nettuno V6 heritage engine technology.',
    features: ['Air Suspension', 'Corsa Driving Mode', 'Head-Up Display', 'Sonus faber 21-speaker system', 'Sport Leather Interior']
  },
  {
    id: 'vel-37',
    brand: 'Audi',
    model: 'R8 V10 Performance',
    category: 'Sports',
    year: 2023,
    pricePerDay: 850,
    seats: 2,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 602,
    acceleration: '3.1s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/396aeff6-e289-5ed5-91bb-2e7ae3e51ce1/dda92829-50d5-40a0-946b-dc3280529fe6/B-LRRh3OeuVi1EJfrlWGB7T75g8.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/396aeff6-e289-5ed5-91bb-2e7ae3e51ce1/dda92829-50d5-40a0-946b-dc3280529fe6/Lck5kpnaPVAr10DUFJIBkeFVuPk.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/396aeff6-e289-5ed5-91bb-2e7ae3e51ce1/dda92829-50d5-40a0-946b-dc3280529fe6/BGBXgoDnhuM0wQ6iDFrOUZHA1Qc.jpg'
    ],
    description: 'Naturally aspirated iconic V12 audio note paired with legendary Quattro drive.',
    features: ['Audi Virtual Cockpit', 'Carbon Fiber Exterior Blades', 'Sport Exhaust', 'Bang & Olufsen Audio', 'Ceramic Brakes']
  },
  {
    id: 'vel-38',
    brand: 'Audi',
    model: 'RS 6 Avant GT',
    category: 'Sports',
    year: 2024,
    pricePerDay: 750,
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 621,
    acceleration: '3.2s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/b1e20dc9-1ce5-592e-a496-bbb25cb1e2fa/96d2de12-68bf-4e2d-9f5f-010125f0456a/KeVeqEojJSBH0tT6N0KQkkjL-Dw.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/b1e20dc9-1ce5-592e-a496-bbb25cb1e2fa/96d2de12-68bf-4e2d-9f5f-010125f0456a/yEMYvKtuxwcE3hDhwtDpxIGtrF4.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/b1e20dc9-1ce5-592e-a496-bbb25cb1e2fa/96d2de12-68bf-4e2d-9f5f-010125f0456a/Z3MGPP51kGXDrQc0hHUeKkS4oXw.jpg'
    ],
    description: 'Special edition high-performance wagon inspired by 90 Quattro IMSA GTO heritage.',
    features: ['Adjustable Coilover Suspension', 'Carbon Fiber Fenders & Hood', 'RS Bucket Seats', 'Sport Differential', 'Continental SportContact Tires']
  },
  {
    id: 'vel-39',
    brand: 'Audi',
    model: 'RS Q8 Performance',
    category: 'SUV',
    year: 2026,
    pricePerDay: 700,
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 591,
    acceleration: '3.7s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/8143ae97-dcb3-5ea5-b63c-8365cb9b24cd/711835b6-4977-46f8-b3e5-030064c1344f/wb2xrEnVXWKy4EFgrvTbxQgc9_E.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/8143ae97-dcb3-5ea5-b63c-8365cb9b24cd/711835b6-4977-46f8-b3e5-030064c1344f/WXpGMNr9B7AwanFhW_Ex6kJ2V_k.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/8143ae97-dcb3-5ea5-b63c-8365cb9b24cd/711835b6-4977-46f8-b3e5-030064c1344f/9mDnQWhrLBIB9dOYwp5ENJueUfc.jpg'
    ],
    description: 'Nürburgring-proven track SUV carrying high speed capability with luxury coupe styling.',
    features: ['Active Roll Stabilization', 'Quattro Sport Differential', 'Matrix LED Headlights', 'RS Sport Exhaust', 'Valcona Leather']
  },
  {
    id: 'vel-40',
    brand: 'BMW',
    model: 'XM Label Red',
    category: 'SUV',
    year: 2023,
    pricePerDay: 950,
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Electric',
    hp: 738,
    acceleration: '3.7s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/1e51cccf-aa45-5a51-804e-cdcc12f05a60/2f32ff0b-599f-4ee8-8eae-416ced21f9ff/A2W-DidUVSMmpqNtfTlKnFBPrIQ.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/1e51cccf-aa45-5a51-804e-cdcc12f05a60/2f32ff0b-599f-4ee8-8eae-416ced21f9ff/XWxm5-4rfXM_cSjXaDMNzkOkBfY.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/1e51cccf-aa45-5a51-804e-cdcc12f05a60/2f32ff0b-599f-4ee8-8eae-416ced21f9ff/-5rTaYIjJyp3boQ1w2aaQuEHvA4.jpg'
    ],
    description: 'The most powerful BMW M model ever produced. Bold, electrified, and unmistakably distinct.',
    features: ['M Lounge Rear Seating', '3D Sculpted Headliner', 'Bowers & Wilkins Diamond Surround', 'Toronto Red Accents', 'M Hybrid Drive']
  },
  {
    id: 'vel-41',
    brand: 'BMW',
    model: 'M8 Competition Gran Coupe',
    category: 'Grand Tourer',
    year: 2024,
    pricePerDay: 750,
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 617,
    acceleration: '3.0s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/9372ff73-a7f5-43cf-9bff-7bc2cd92a98a/78919bdc-5798-4ae3-bc4a-25d2deec3244/lnK1HJGxxu2diQ-rXwV3TZe1r3o.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/9372ff73-a7f5-43cf-9bff-7bc2cd92a98a/78919bdc-5798-4ae3-bc4a-25d2deec3244/6ltCMJhtyUh7RWnkRsePpJaTtPI.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/9372ff73-a7f5-43cf-9bff-7bc2cd92a98a/78919bdc-5798-4ae3-bc4a-25d2deec3244/oNZcz0PLsplmJs3_FXmdU4pmZhQ.jpg'
    ],
    description: 'Four-door supercar performance matched with executive luxury and M xDrive versatility.',
    features: ['M Setup Menu with Track Mode', 'Carbon Roof', 'Merino Leather Seats', 'Harmon Kardon Sound', 'Adaptive M Suspension Pro']
  },
  {
    id: 'vel-42',
    brand: 'BMW',
    model: 'i7 M70 xDrive',
    category: 'Electric',
    year: 2024,
    pricePerDay: 800,
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Electric',
    hp: 650,
    acceleration: '3.5s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/1d3ca5b5-f61a-492d-b32c-4bab57cd9102/7eab637a-7916-4620-8959-c9bed6bed33c/bwYq1OUN3EGEFGOWtWlGwur6LkQ.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/1d3ca5b5-f61a-492d-b32c-4bab57cd9102/7eab637a-7916-4620-8959-c9bed6bed33c/nNIb56rBCsBFVC0M88pPUkvWwJo.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/1d3ca5b5-f61a-492d-b32c-4bab57cd9102/7eab637a-7916-4620-8959-c9bed6bed33c/immZGqi7Qy3qAgjxd4UtkZfg1RU.jpg'
    ],
    description: 'The top-tier electric BMW luxury flagship featuring unmatched digital innovations.',
    features: ['31-inch 8K BMW Theatre Screen', 'Executive Lounge Seating', 'Crystal Headlights', 'Automatic Doors', 'Bowers & Wilkins Sound']
  },
  {
    id: 'vel-43',
    brand: 'BMW',
    model: 'M4 CSL',
    category: 'Sports',
    year: 2023,
    pricePerDay: 820,
    seats: 2,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 543,
    acceleration: '3.6s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/8a23cae9-6371-4f83-84c5-bfac7634cff8/4a6e02ea-202f-4988-864c-98090e15209d/dQ2-cwS7i94JweRi2MQViLqA8tk.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/8a23cae9-6371-4f83-84c5-bfac7634cff8/4a6e02ea-202f-4988-864c-98090e15209d/VyzKK7CZgMEnvwQ9iQc-z6UBHCg.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/8a23cae9-6371-4f83-84c5-bfac7634cff8/4a6e02ea-202f-4988-864c-98090e15209d/Kzyq97ly2a40QvsqfyBwVaFcBoo.jpg'
    ],
    description: 'Re-establishing lightweight heritage (Competition, Sport, Lightweight) with extreme track tuning.',
    features: ['M Carbon Full Bucket Seats', 'Laserlight Tail Lamps', 'Titanium Silencer', 'Carbon Fiber Trunk Lid', 'Track Chassis Setup']
  },
  {
    id: 'vel-44',
    brand: 'Range Rover',
    model: 'Sport SV Edition One',
    category: 'SUV',
    year: 2024,
    pricePerDay: 850,
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 626,
    acceleration: '3.6s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/7f876c8e-65c8-58ba-a964-a80e5e225446/6405ee26-8e2f-4990-9e93-87758fd25706/c3jtN8CP6uTfHNREa0A7hcM-YhU.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/7f876c8e-65c8-58ba-a964-a80e5e225446/6405ee26-8e2f-4990-9e93-87758fd25706/uzm25ikaAoGxJ65EbKG_psRco-M.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/7f876c8e-65c8-58ba-a964-a80e5e225446/6405ee26-8e2f-4990-9e93-87758fd25706/BCSrbt-rrc1D_JF_LmdjfFcd4zI.jpg'
    ],
    description: 'Innovator of 6D Dynamics interlinked air suspension and lightweight carbon fiber wheels.',
    features: ['Body and Soul Seat (SUBPAC)', '6D Dynamics Air Suspension', '23-inch Carbon Wheels', 'Brembo Octa-point Brakes', 'Meridian Sound']
  },
  {
    id: 'vel-45',
    brand: 'Cadillac',
    model: 'Escalade-V',
    category: 'SUV',
    year: 2023,
    pricePerDay: 800,
    seats: 7,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 682,
    acceleration: '4.4s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/2c9669ad-6b5f-5af8-bc2b-29bbad52d8dd/6336cd65-9d42-42b0-af42-c2b18ab884fd/ZZ0S4lKtTD4LwJxS_Uh9DLoQ60I.jpeg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/2c9669ad-6b5f-5af8-bc2b-29bbad52d8dd/6336cd65-9d42-42b0-af42-c2b18ab884fd/KToBlGPzs9WeqjLJ1Up5Jamm7pk.jpeg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/2c9669ad-6b5f-5af8-bc2b-29bbad52d8dd/6336cd65-9d42-42b0-af42-c2b18ab884fd/F_zzWasAhA9nZyce2py0CAAfzT4.jpeg'
    ],
    description: 'Supercharged V8 potency inside an ultra-spacious full-size luxury American SUV.',
    features: ['38-inch Curved OLED Display', 'AKG Studio Reference 36-Speaker', 'Super Cruise Hands-Free', 'Magnetic Ride Control', 'Brembo Front Brakes']
  },
  {
    id: 'vel-46',
    brand: 'Lucid',
    model: 'Air Sapphire',
    category: 'Electric',
    year: 2024,
    pricePerDay: 950,
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Electric',
    hp: 1234,
    acceleration: '1.89s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/c1642c9a-f99c-42f2-bcec-51648d861ea0/f6ca2068-1b35-4fd1-a220-eeeacb2a8fea/H0yvWVo7i20mgACcwGPx6cFe1l0.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/c1642c9a-f99c-42f2-bcec-51648d861ea0/f6ca2068-1b35-4fd1-a220-eeeacb2a8fea/sLoqLLbJb_hcZzN2iiq2xSc7yyY.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/c1642c9a-f99c-42f2-bcec-51648d861ea0/f6ca2068-1b35-4fd1-a220-eeeacb2a8fea/CjQi7GkE6Zqx3scWDUaDbGh75E4.jpg'
    ],
    description: 'The world’s first luxury electric super-sedan featuring triple-motor torque vectoring capability.',
    features: ['Carbon-Ceramic Brakes', 'Track-Tuned Suspension', 'SurroundSound Pro Audio', '34-inch Curved Cockpit', 'Ultra Fast 300kW Charge']
  },
  {
    id: 'vel-47',
    brand: 'Tesla',
    model: 'Model S Plaid',
    category: 'Electric',
    year: 2026,
    pricePerDay: 550,
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Electric',
    hp: 1020,
    acceleration: '1.99s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/94ca39c7-ade2-5c96-bb7d-c6faad891eee/e58e9de4-ebaf-4dff-a59e-dbb692721014/Gwyv1YVb2tUGHUB8h224hN5539U.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/94ca39c7-ade2-5c96-bb7d-c6faad891eee/e58e9de4-ebaf-4dff-a59e-dbb692721014/mSUIUoDZ0C0vqBFmPh4goVe_-bg.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/94ca39c7-ade2-5c96-bb7d-c6faad891eee/e58e9de4-ebaf-4dff-a59e-dbb692721014/dMEz_jSeOIo90TK2Eb1NLCDEa0E.jpg'
    ],
    description: 'Beyond rapid EV velocity with tri-motor torque vectoring and futuristic interior layout.',
    features: ['Yoke Steering Option', 'Tri-motor All-Wheel Drive', '17-inch Cinematic Screen', 'Full Self-Driving Capability', 'Carbon-Sleeved Rotors']
  },
  {
    id: 'vel-48',
    brand: 'Tesla',
    model: 'Cybertruck Cyberbeast',
    category: 'SUV',
    year: 2026,
    pricePerDay: 750,
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Electric',
    hp: 845,
    acceleration: '2.6s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/93af765d-dcf2-438b-93af-80a211819fb7/50f79858-01e9-474e-9d2f-25b4cdd96828/xZsL2oyNLFvns0GxMTQe0KC2PUI.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/93af765d-dcf2-438b-93af-80a211819fb7/50f79858-01e9-474e-9d2f-25b4cdd96828/NaGSVY2FUjiQ5ab4c3lXSKCG5pY.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/93af765d-dcf2-438b-93af-80a211819fb7/50f79858-01e9-474e-9d2f-25b4cdd96828/tLkBDTwsEd9cRWQbt9KCsyVt0RY.jpg'
    ],
    description: 'Exoskeleton ultra-hard stainless steel utility craft designed with hypercar acceleration.',
    features: ['Shatter-Resistant Armor Glass', 'Steer-by-Wire Technology', 'Tri-Motor AWD', 'Adaptive Air Suspension', 'Integrated Vault Bed Cover']
  },
  {
    id: 'vel-49',
    brand: 'Chevrolet',
    model: 'Corvette Z06 3LZ',
    category: 'Sports',
    year: 2025,
    pricePerDay: 680,
    seats: 2,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 670,
    acceleration: '2.6s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/e6d8d2c1-15af-5984-952a-4f28b72e6be1/2c5d5b4f-761e-4d3d-8df6-4288e82adfa4/-LprwnH51pJ1R9WwGmDbWXyWAH8.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/e6d8d2c1-15af-5984-952a-4f28b72e6be1/2c5d5b4f-761e-4d3d-8df6-4288e82adfa4/pHP2zVwrNmAk_Ei6yscbxvbbQ4A.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/e6d8d2c1-15af-5984-952a-4f28b72e6be1/2c5d5b4f-761e-4d3d-8df6-4288e82adfa4/tLQZ9vlAxtpr4Q_Ue1qsLYK2W1I.jpg'
    ],
    description: 'Featuring the highest horsepower naturally aspirated V8 in any production car history.',
    features: ['LT6 Flat-Plane Crank V8', 'Z07 Performance Package', 'Carbon Fiber Aero Wing', 'Bose Performance Series Audio', 'Performance Data Recorder']
  },
  {
    id: 'vel-50',
    brand: 'Ford',
    model: 'Mustang Dark Horse',
    category: 'Sports',
    year: 2025,
    pricePerDay: 480,
    seats: 4,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 500,
    acceleration: '3.7s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/3ba6f870-8ba7-410f-afe5-a9747473b0bc/f0741fb5-8a05-463a-8a61-1298df1e7033/97-Xf5Xhb_es8nHJseIX9r3fkPI.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/3ba6f870-8ba7-410f-afe5-a9747473b0bc/f0741fb5-8a05-463a-8a61-1298df1e7033/YzW_hzLjuE7oo_Nj4JCGKWHUVlI.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/3ba6f870-8ba7-410f-afe5-a9747473b0bc/f0741fb5-8a05-463a-8a61-1298df1e7033/m-KS_dXO_W2fcJphMgsoceyWAhQ.jpg'
    ],
    description: 'The sinister peak of 5.0L naturally aspirated American V8 track capability.',
    features: ['MagneRide Damping System', 'Brembo 6-Piston Brakes', 'Electronic Drift Brake', 'Bang & Olufsen Sound System', 'Titanium Shift Knob']
  },
  {
    id: 'vel-51',
    brand: 'Jaguar',
    model: 'F-Type R 75',
    category: 'Convertible',
    year: 2024,
    pricePerDay: 580,
    seats: 2,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 575,
    acceleration: '3.5s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/137c8e65-16b0-595f-abac-0922f3699fac/b10fdca5-ef03-40b8-bfa8-a6dfa3ff4541/hQJIEPOh4k3kS7QO7IyAq79t1C8.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/137c8e65-16b0-595f-abac-0922f3699fac/b10fdca5-ef03-40b8-bfa8-a6dfa3ff4541/nupGQydXtye3IiGI41iBPhUu7eg.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/137c8e65-16b0-595f-abac-0922f3699fac/b10fdca5-ef03-40b8-bfa8-a6dfa3ff4541/vOcfwfrSqAKswVrp5vbWV78BX8M.jpg'
    ],
    description: 'The final celebration edition of Jaguar’s V8 supercharged combustion sports car lineage.',
    features: ['Quad Outboard Exhausts', 'Meridian Surround Audio', 'Monogram Stitching', 'Configurable Dynamics', 'Performance seats in Windsor Leather']
  },
  {
    id: 'vel-52',
    brand: 'Alfa Romeo',
    model: 'Giulia Quadrifoglio',
    category: 'Sports',
    year: 2023,
    pricePerDay: 550,
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 505,
    acceleration: '3.8s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/46d359cc-e7d3-574d-b384-265d81bc0fc7/658eb219-afca-416a-9ac5-81c0231996f1/yeculVAA5YpzLd0nV9upZOwurNI.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/46d359cc-e7d3-574d-b384-265d81bc0fc7/658eb219-afca-416a-9ac5-81c0231996f1/ag98U_1ZXmjNA2lW13uWKMec7mU.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/46d359cc-e7d3-574d-b384-265d81bc0fc7/658eb219-afca-416a-9ac5-81c0231996f1/rjAqhhfWIdpsQq5zOuWcWmA-aWY.jpg'
    ],
    description: 'Italian emotion engineered around a Ferrari-derived twin-turbo V6 engine balance.',
    features: ['Active Aero Front Splitter', 'Mechanical Limited-Slip Differential', 'Sparco Carbon Fiber Seats', 'Akrapovič Exhaust', 'Carbon Fiber Hood']
  },
  {
    id: 'vel-53',
    brand: 'Lexus',
    model: 'LFA Coupe',
    category: 'Sports',
    year: 2012,
    pricePerDay: 1700,
    seats: 2,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 563,
    acceleration: '3.6s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/8c553fad-2220-4a26-b92e-278e77b720f6/fe586c25-714f-42d1-b0fa-3344e97da4e4/-OlL8Enwj45CXA7QWEFLjYnfHs4.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/8c553fad-2220-4a26-b92e-278e77b720f6/fe586c25-714f-42d1-b0fa-3344e97da4e4/HC767JH1MUUHruQU4igADDK3jQg.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/8c553fad-2220-4a26-b92e-278e77b720f6/fe586c25-714f-42d1-b0fa-3344e97da4e4/Dz6ThcYxEJccNT-UnYrV_hQN2VE.jpg'
    ],
    description: 'Extremely rare V10 soundtrack masterpiece developed with Yamaha sound acoustics.',
    features: ['High-Rev V10 Engine (9000RPM)', 'Digital Instrument Cluster', 'Carbon Fiber Fixed Wing', 'Single-Clutch Automated Gearbox', 'Mark Levinson Audio']
  },
  {
    id: 'vel-54',
    brand: 'Nissan',
    model: 'GT-R Nismo',
    category: 'Sports',
    year: 2016,
    pricePerDay: 850,
    seats: 4,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 600,
    acceleration: '2.5s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/94ca39c7-ade2-5c96-bb7d-c6faad891eee/130b716b-5eb4-4daa-a2ec-1235a9baeb17/0oW1l5BSoUaySCtSbcfEhBr12aU.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/94ca39c7-ade2-5c96-bb7d-c6faad891eee/130b716b-5eb4-4daa-a2ec-1235a9baeb17/TYR2gzYgQfw0iroPhPEwKV64jYQ.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/94ca39c7-ade2-5c96-bb7d-c6faad891eee/130b716b-5eb4-4daa-a2ec-1235a9baeb17/ozTBUXNu0dj4VULxSX6TBDwycow.jpg'
    ],
    description: 'The ultimate Godzilla iteration featuring GT3-spec turbochargers and carbon aero bodywork.',
    features: ['GT3 Spec Turbos', 'Carbon Ceramic Brakes', 'Recaro Carbon Backed Seats', 'Bilmstein DampTronic Suspension', 'Titanium Exhaust']
  },
  {
    id: 'vel-55',
    brand: 'Lotus',
    model: 'Emira V6 First Edition',
    category: 'Sports',
    year: 2024,
    pricePerDay: 620,
    seats: 2,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 400,
    acceleration: '4.2s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/698259bf-a32b-5e00-9ec6-88b12278c4ad/dbacc013-aa3f-42be-abee-e6006caaddb9/x4psXdgJ_DiWpE9yGxypekf49aY.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/698259bf-a32b-5e00-9ec6-88b12278c4ad/dbacc013-aa3f-42be-abee-e6006caaddb9/XspENIqpVxOGKD3B48i3MnqmCM0.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/698259bf-a32b-5e00-9ec6-88b12278c4ad/dbacc013-aa3f-42be-abee-e6006caaddb9/UaTGQta_PXOeTEi4MPXVEDghCCw.jpg'
    ],
    description: 'The last petrol sports car from Lotus with pure hydraulic steering feel and exotic proportions.',
    features: ['Supercharged V6 Engine', 'Hydraulic Power Steering', 'KEF Uni-Q Premium Audio', 'Lotus Sports Chassis', 'Exposed Gear Linkage']
  },
  {
    id: 'vel-56',
    brand: 'Lotus',
    model: 'Eletre R',
    category: 'Electric',
    year: 2025,
    pricePerDay: 800,
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Electric',
    hp: 905,
    acceleration: '2.95s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/c981a956-43b4-48f8-86da-b5b598a3d04d/8f8b9a48-f5ff-49df-85b5-ab36db541d57/pkPg73AxBPA4qtJ_SyuHCmpXFn4.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/c981a956-43b4-48f8-86da-b5b598a3d04d/8f8b9a48-f5ff-49df-85b5-ab36db541d57/WMI446dIJ0NaRDzfFIClfIgKcO8.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/c981a956-43b4-48f8-86da-b5b598a3d04d/8f8b9a48-f5ff-49df-85b5-ab36db541d57/t_ZY3YLDd-86D1W475JiZ1vuY88.jpg'
    ],
    description: 'Hyper-SUV electric performance equipped with active aerodynamics and dual-speed transmission.',
    features: ['Deployable LIDAR Sensors', 'Active Front Grille', 'KEF Reference 23-speaker Audio', 'Air Suspension with CDC', 'Rear Axle Steering']
  },
  {
    id: 'vel-57',
    brand: 'Bugatti',
    model: 'Chiron Super Sport',
    category: 'Sports',
    year: 2023,
    pricePerDay: 2500,
    seats: 2,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 1578,
    acceleration: '2.2s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/912e46f7-708f-4717-a4d6-8cd688e693df/58a7f2fa-73b4-40b8-93aa-542236df4932/FApY8lVnsdhO8cx7yG7fm9b9S5M.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/912e46f7-708f-4717-a4d6-8cd688e693df/58a7f2fa-73b4-40b8-93aa-542236df4932/WkG4PkanLDfc9YbU8R2XmQxbiKg.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/912e46f7-708f-4717-a4d6-8cd688e693df/58a7f2fa-73b4-40b8-93aa-542236df4932/jXuyCp7fXx_mKfm-KB3MwPoRmGc.jpg'
    ],
    description: 'The absolute zenith of automotive engineering and hypercar velocity built around quad-turbo W16.',
    features: ['Quad-Turbo W16 Engine', 'Longtail Aerodynamic Body', 'Magnesium Wheels', 'Accuton Diamond Diaphragm Audio', '304 MPH Top Speed Capacity']
  },
  {
    id: 'vel-58',
    brand: 'Mercedes-Benz',
    model: 'GLE 450 4MATIC',
    category: 'SUV',
    year: 2023,
    pricePerDay: 900,
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 791,
    acceleration: '2.8s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/449c10ed-5ec4-4a40-954c-876ec8a2efe1/24ae8c12-03e8-46ac-a031-0f4ef1d4552d/u5p6a-B4ZinFpXj6L55o2Mq5PiQ.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/449c10ed-5ec4-4a40-954c-876ec8a2efe1/24ae8c12-03e8-46ac-a031-0f4ef1d4552d/pAiJ474gHXB0sE94cn-txlK6lNQ.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/449c10ed-5ec4-4a40-954c-876ec8a2efe1/24ae8c12-03e8-46ac-a031-0f4ef1d4552d/iw7dn_pBr6zfCAfZupl5GZ8VaAo.jpg'
    ],
    description: 'The 2026 Mercedes-Benz GLE 450 4MATIC combines luxury and performance.',
    features: ['4MATIC fully variable AWD', '48V mild-hybrid systems', '9G-TRONIC 9-speed automatic', 'Panoramic/sliding sunroof', '64-color ambient lighting']
  },
  {
    id: 'vel-59',
    brand: 'Koenigsegg',
    model: 'Jesko Attack',
    category: 'Sports',
    year: 2021,
    pricePerDay: 2450,
    seats: 2,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 1600,
    acceleration: '2.5s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/94ca39c7-ade2-5c96-bb7d-c6faad891eee/156d29cb-5ab6-4e11-a143-bcbe291bde3d/sYdW8zhomLDf2D2yNVCFr-NB9P8.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/94ca39c7-ade2-5c96-bb7d-c6faad891eee/156d29cb-5ab6-4e11-a143-bcbe291bde3d/MDQaQ3fXDuV3ecjr_AxtmLJDyfA.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/94ca39c7-ade2-5c96-bb7d-c6faad891eee/156d29cb-5ab6-4e11-a143-bcbe291bde3d/d1lHDsXzAJi97dGKXzzUrEJt_7s.jpg'
    ],
    description: 'Megacar track engineering with revolutionary Light Speed Transmission (LST) and extreme downforce.',
    features: ['Light Speed Transmission (9-speed)', 'Triplex Suspension', 'Dihedral Synchro-Helix Doors', 'Flat-Plane V8 Engine', 'Carbon Fiber Monocoque']
  },
  {
    id: 'vel-60',
    brand: 'BMW',
    model: '760i xDrive',
    category: 'Gasoline',
    year: 2026,
    pricePerDay: 1100,
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    hp: 1914,
    acceleration: '1.74s (0-60)',
    images: [
      'https://platform.cstatic-images.com/xxlarge/in/v2/01b3cad8-a181-586d-a39f-056ed6232899/63034671-ab04-450a-b7c2-5925c24d0cb1/oQwk-lS-P22tTTPX_QS70FyHpAs.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/01b3cad8-a181-586d-a39f-056ed6232899/63034671-ab04-450a-b7c2-5925c24d0cb1/5RhLuTZyE9J111ayQkPBgyhrjXg.jpg',
      'https://platform.cstatic-images.com/xxlarge/in/v2/01b3cad8-a181-586d-a39f-056ed6232899/63034671-ab04-450a-b7c2-5925c24d0cb1/gSXQvmBEGxtuVC0Yif26lTgIz0M.jpg'
    ],
    description: '2026 BMW 760i xDrive — Luxury sedan with a 536-hp twin-turbo V8, AWD, and premium technology.',
    features: ['4.4L Twin-Turbo V8 + 48V mild hybrid', 'xDrive all-wheel drive', '0–60 mph in 4.1 seconds', 'Panoramic glass roof', 'Rear-wheel steering']
  }
];

/* Helper: Calculate total days between 2 YYYY-MM-DD dates */
const calculateDays = (startStr, endStr) => {
  if (!startStr || !endStr) return 1;
  const start = new Date(startStr);
  const end = new Date(endStr);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 1;
};

/* Returns the calendar day immediately after the given date string (YYYY-MM-DD) */
const getNextDay = (dateStr) => {
  const d = dateStr ? new Date(dateStr) : new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

/* Returns today's date as YYYY-MM-DD */
const getTodayStr = () => new Date().toISOString().split('T')[0];

/* Returns the current time as HH:MM (24h), matching <input type="time"> format */
const getCurrentTimeStr = () => {
  const d = new Date();
  return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
};

/* ============================================================================
   2. MAIN APPLICATION COMPONENT
   ============================================================================ */

export default function App() {
  /* Language State */
  const [language, setLanguage] = useState('en');
  const t = (key) => (TRANSLATIONS[language] && TRANSLATIONS[language][key]) || TRANSLATIONS.en[key] || key;
  const toggleLanguage = () => setLanguage(prev => (prev === 'en' ? 'sq' : 'en'));

  /* Set browser tab title & favicon to the Velocita brand mark */
  useEffect(() => {
    document.title = 'Velocita';
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = VELOCITA_LOGO;
  }, []);

  /* Navigation State */
  const [currentView, setCurrentView] = useState('home'); /* 'home', 'fleet', 'detail', 'checkout' */
  const [selectedVehicleId, setSelectedVehicleId] = useState('vel-01');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  /* Search & Rental Parameters */
  const [bookingSearch, setBookingSearch] = useState({
    pickupLocation: LOCATIONS[0],
    dropoffLocation: LOCATIONS[0],
    pickupDate: new Date().toISOString().split('T')[0],
    pickupTime: '10:00',
    returnDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    returnTime: '10:00'
  });

  /* Selected Extras during checkout */
  const [selectedExtras, setSelectedExtras] = useState(['ext-insurance']);

  /* Checkout Step State (1: Vehicle, 2: Rental Details, 3: Extras, 4: Customer, 5: Payment, 6: Confirmation) */
  const [checkoutStep, setCheckoutStep] = useState(1);

  /* Checkout Form Data */
  const [customerData, setCustomerData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'United States'
  });

  const [paymentData, setPaymentData] = useState({
    cardName: '',
    cardNumber: '',
    expDate: '',
    cvv: '',
    billingZip: ''
  });

  /* Confirmed Booking Storage */
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  /* Filter & Sort States for Fleet View */
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterBrand, setFilterBrand] = useState('All');
  const [filterPrice, setFilterPrice] = useState(2500);
  const [sortBy, setSortBy] = useState('recommended');

  /* Load state from localStorage on mount */
  useEffect(() => {
    try {
      const savedBooking = localStorage.getItem('velocita_current_booking');
      if (savedBooking) {
        const parsed = JSON.parse(savedBooking);
        if (parsed.confirmedBooking) setConfirmedBooking(parsed.confirmedBooking);
      }
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, []);

  /* Save confirmed booking to localStorage */
  useEffect(() => {
    if (confirmedBooking) {
      localStorage.setItem('velocita_current_booking', JSON.stringify({ confirmedBooking }));
    }
  }, [confirmedBooking]);

  /* Toast Notification Trigger */
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  /* Derived Vehicle */
  const currentVehicle = useMemo(() => {
    return FLEET_DATA.find(v => v.id === selectedVehicleId) || FLEET_DATA[0];
  }, [selectedVehicleId]);

  /* Derived Pricing Calculations */
  const rentalDays = useMemo(() => {
    return calculateDays(bookingSearch.pickupDate, bookingSearch.returnDate);
  }, [bookingSearch.pickupDate, bookingSearch.returnDate]);

  const pricingBreakdown = useMemo(() => {
    const baseDaily = currentVehicle.pricePerDay;
    const subtotalVehicle = baseDaily * rentalDays;
    
    let extrasTotalDaily = 0;
    selectedExtras.forEach(extId => {
      const ext = EXTRAS_CATALOG.find(e => e.id === extId);
      if (ext) extrasTotalDaily += ext.price;
    });
    const subtotalExtras = extrasTotalDaily * rentalDays;
    
    const serviceFee = Math.round((subtotalVehicle + subtotalExtras) * 0.08); /* 8% fee */
    const taxes = Math.round((subtotalVehicle + subtotalExtras) * 0.07); /* 7% tax */
    const grandTotal = subtotalVehicle + subtotalExtras + serviceFee + taxes;

    return {
      dailyRate: baseDaily,
      subtotalVehicle,
      subtotalExtras,
      serviceFee,
      taxes,
      grandTotal
    };
  }, [currentVehicle, rentalDays, selectedExtras]);

  /* Filtered & Sorted Fleet */
  const filteredFleet = useMemo(() => {
    return FLEET_DATA.filter(vehicle => {
      const matchCat = filterCategory === 'All' || vehicle.category === filterCategory;
      const matchBrand = filterBrand === 'All' || vehicle.brand === filterBrand;
      const matchPrice = vehicle.pricePerDay <= filterPrice;
      return matchCat && matchBrand && matchPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.pricePerDay - b.pricePerDay;
      if (sortBy === 'price-high') return b.pricePerDay - a.pricePerDay;
      if (sortBy === 'luxury') return b.pricePerDay - a.pricePerDay;
      return 0; /* recommended */
    });
  }, [filterCategory, filterBrand, filterPrice, sortBy]);

  /* Navigation handlers */
  const navigateToVehicleDetails = (vId) => {
    setSelectedVehicleId(vId);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startCheckout = (vId) => {
    if (vId) setSelectedVehicleId(vId);
    setCheckoutStep(1);
    setCurrentView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleExtra = (id) => {
    setSelectedExtras(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleFinalBookingSubmit = (e) => {
    e.preventDefault();
    if (!customerData.email || !customerData.firstName || !paymentData.cardNumber) {
      triggerToast('Please complete all mandatory customer & payment fields.');
      return;
    }

    const newBooking = {
      bookingRef: 'VEL-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      vehicle: currentVehicle,
      searchParams: bookingSearch,
      extras: selectedExtras.map(id => EXTRAS_CATALOG.find(e => e.id === id)),
      pricing: pricingBreakdown,
      customer: customerData,
      rentalDays
    };

    setConfirmedBooking(newBooking);
    setCheckoutStep(6);
    triggerToast('Reservation confirmed! Confirmation details dispatched.');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
    <div className="min-h-screen bg-[#05080a] text-slate-100 font-sans selection:bg-teal-500/30 selection:text-teal-200">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-teal-500/40 text-slate-100 px-5 py-3 rounded-none shadow-2xl flex items-center gap-3 backdrop-blur-md animate-fade-in">
          <AlertCircle className="w-5 h-5 text-teal-400 shrink-0" />
          <span className="text-sm font-medium tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#05080a]/85 backdrop-blur-xl border-b border-slate-800/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <button 
            onClick={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <img 
              src={VELOCITA_LOGO} 
              alt="Velocita" 
              className="h-11 w-auto group-hover:scale-105 transition-transform"
            />
            <span className="text-xs uppercase tracking-[0.3em] text-slate-400 hidden sm:block font-semibold border-l border-slate-700 pl-3">{t('header_tagline')}</span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-slate-300">
            <button 
              onClick={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
              className={`hover:text-teal-400 transition-colors ${currentView === 'home' ? 'text-teal-400 border-b border-teal-400 pb-1' : ''}`}
            >
              {t('nav_home')}
            </button>
            <button 
              onClick={() => { setCurrentView('fleet'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
              className={`hover:text-teal-400 transition-colors ${currentView === 'fleet' ? 'text-teal-400 border-b border-teal-400 pb-1' : ''}`}
            >
              {t('nav_fleet')}
            </button>
            <button 
              onClick={() => triggerToast(t('toast_contact'))} 
              className="hover:text-teal-400 transition-colors"
            >
              {t('nav_contact')}
            </button>
          </nav>

          {/* Header Action */}
          <div className="hidden md:flex items-center gap-4">
            {confirmedBooking && (
              <button
                onClick={() => { setCurrentView('checkout'); setCheckoutStep(6); }}
                className="text-xs text-teal-400 hover:underline tracking-wider font-semibold mr-2"
              >
                {t('header_view_reservation')}
              </button>
            )}
            <button
              onClick={toggleLanguage}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-700 text-slate-300 hover:border-teal-400 hover:text-teal-400 text-[11px] font-bold uppercase tracking-wider transition-colors"
              aria-label="Switch Language"
              title="EN / SQ"
            >
              {language === 'en' ? 'SQ' : 'EN'}
            </button>
            <button
              onClick={() => { setCurrentView('fleet'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-slate-950 font-bold text-xs uppercase tracking-widest shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transition-all duration-300"
            >
              {t('header_reserve')}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleLanguage}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-700 text-slate-300 text-[10px] font-bold uppercase tracking-wider"
              aria-label="Switch Language"
            >
              {language === 'en' ? 'SQ' : 'EN'}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 px-6 py-6 space-y-4 animate-fade-in">
            <button 
              onClick={() => { setCurrentView('home'); setMobileMenuOpen(false); }}
              className="block w-full text-left text-sm uppercase tracking-widest text-slate-300 hover:text-teal-400 py-2"
            >
              {t('nav_home')}
            </button>
            <button 
              onClick={() => { setCurrentView('fleet'); setMobileMenuOpen(false); }}
              className="block w-full text-left text-sm uppercase tracking-widest text-slate-300 hover:text-teal-400 py-2"
            >
              {t('nav_fleet')}
            </button>
            <button 
              onClick={() => { triggerToast(t('toast_contact')); setMobileMenuOpen(false); }}
              className="block w-full text-left text-sm uppercase tracking-widest text-slate-300 hover:text-teal-400 py-2"
            >
              {t('nav_contact')}
            </button>
            <button 
              onClick={() => { setCurrentView('fleet'); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="block w-full text-center py-3 rounded-sm bg-teal-500 text-slate-950 font-bold text-xs uppercase tracking-widest"
            >
              {t('mobile_reserve')}
            </button>
          </div>
        )}
      </header>

      {/* VIEW ROUTER */}
      <main>
        {currentView === 'home' && (
          <HomeView 
            bookingSearch={bookingSearch}
            setBookingSearch={setBookingSearch}
            onSearchSubmit={() => setCurrentView('fleet')}
            onSelectVehicle={navigateToVehicleDetails}
            onReserveDirect={startCheckout}
          />
        )}

        {currentView === 'fleet' && (
          <FleetView 
            fleet={filteredFleet}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            filterBrand={filterBrand}
            setFilterBrand={setFilterBrand}
            filterPrice={filterPrice}
            setFilterPrice={setFilterPrice}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onSelectVehicle={navigateToVehicleDetails}
            onReserveDirect={startCheckout}
          />
        )}

        {currentView === 'detail' && (
          <VehicleDetailView 
            vehicle={currentVehicle}
            bookingSearch={bookingSearch}
            setBookingSearch={setBookingSearch}
            rentalDays={rentalDays}
            selectedExtras={selectedExtras}
            toggleExtra={toggleExtra}
            pricing={pricingBreakdown}
            onProceedCheckout={() => startCheckout(currentVehicle.id)}
            onBackToFleet={() => setCurrentView('fleet')}
          />
        )}

        {currentView === 'checkout' && (
          <CheckoutView 
            step={checkoutStep}
            setStep={setCheckoutStep}
            vehicle={currentVehicle}
            bookingSearch={bookingSearch}
            setBookingSearch={setBookingSearch}
            selectedExtras={selectedExtras}
            toggleExtra={toggleExtra}
            customerData={customerData}
            setCustomerData={setCustomerData}
            paymentData={paymentData}
            setPaymentData={setPaymentData}
            pricing={pricingBreakdown}
            rentalDays={rentalDays}
            confirmedBooking={confirmedBooking}
            onFinalSubmit={handleFinalBookingSubmit}
            onGoHome={() => setCurrentView('home')}
            onSelectVehicle={navigateToVehicleDetails}
          />
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
          
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <img src={VELOCITA_LOGO} alt="Velocita" className="h-8 w-auto" />
            </div>
            <p className="leading-relaxed text-slate-400">
              {t('footer_tagline')}
            </p>
            <div className="flex items-center gap-4 text-slate-400 pt-2">
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold uppercase tracking-widest mb-4">{t('footer_nav_heading')}</h4>
            <ul className="space-y-2.5">
              <li><button onClick={() => { setCurrentView('fleet'); window.scrollTo({top:0}); }} className="hover:text-teal-400">{t('footer_link_fleet')}</button></li>
              <li><button onClick={() => triggerToast(t('toast_locations'))} className="hover:text-teal-400">{t('footer_link_hubs')}</button></li>
              <li><button onClick={() => triggerToast(t('toast_membership'))} className="hover:text-teal-400">{t('footer_link_membership')}</button></li>
              <li><button onClick={() => triggerToast(t('toast_chauffeur'))} className="hover:text-teal-400">{t('footer_link_chauffeur')}</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold uppercase tracking-widest mb-4">{t('footer_contact_heading')}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-teal-400" /> +1 (800) 835-6248</li>
              <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-teal-400" /> concierge@velocita-rentals.com</li>
              <li className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-teal-400" /> {t('footer_client_services')}</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold uppercase tracking-widest mb-4">{t('footer_dispatch_heading')}</h4>
            <p className="mb-3 text-slate-400">{t('footer_dispatch_text')}</p>
            <form onSubmit={(e) => { e.preventDefault(); triggerToast(t('toast_newsletter')); }} className="space-y-2">
              <input 
                type="email" 
                placeholder={t('footer_email_placeholder')} 
                required
                className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-2 text-slate-200 focus:outline-none focus:border-teal-500/50"
              />
              <button type="submit" className="w-full bg-slate-800 hover:bg-slate-700 text-teal-400 font-semibold py-2 rounded transition-colors tracking-wider uppercase text-[10px]">
                {t('footer_subscribe')}
              </button>
            </form>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-900 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} {t('footer_copyright')}</p>
          <div className="flex gap-6">
            <span className="hover:underline cursor-pointer">{t('footer_privacy')}</span>
            <span className="hover:underline cursor-pointer">{t('footer_terms')}</span>
            <span className="hover:underline cursor-pointer">{t('footer_cookies')}</span>
          </div>
        </div>
      </footer>

    </div>
    </LanguageContext.Provider>
  );
}

/* ============================================================================
   3. HOME VIEW
   ============================================================================ */

function HomeView({ bookingSearch, setBookingSearch, onSearchSubmit, onSelectVehicle, onReserveDirect }) {
  const { t } = useLang();
  return (
    <div className="space-y-24 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Visual Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=2000&q=80" 
            alt="Hero Luxury Supercar" 
            className="w-full h-full object-cover object-center opacity-35 scale-105 filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05080a] via-[#05080a]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#05080a] via-transparent to-[#05080a]"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-teal-500/20 to-teal-500/5 border border-teal-400/40 backdrop-blur-md shadow-[0_0_25px_-5px] shadow-teal-500/30">
            <Shield className="w-3.5 h-3.5 text-teal-300" />
            <span className="text-xs uppercase tracking-widest text-teal-200 font-semibold">{t('hero_badge')}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-mono font-normal tracking-tight text-white leading-none">
            {t('hero_heading_pre')} <span className="italic font-light bg-gradient-to-r from-teal-300 via-cyan-300 to-teal-400 bg-clip-text text-transparent">{t('hero_heading_accent')}</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            {t('hero_subtitle')}
          </p>

          {/* SEARCH & BOOKING BAR */}
          <div className="bg-slate-900/60 border border-white/10 p-5 sm:p-8 rounded-[28px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] backdrop-blur-2xl text-left max-w-4xl mx-auto space-y-5 ring-1 ring-teal-500/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              
              {/* Pickup Location */}
              <div className="space-y-1.5 bg-slate-950/50 rounded-2xl p-3 border border-white/5">
                <label className="text-[10px] uppercase tracking-wider text-teal-300/90 font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-teal-400" /> {t('label_pickup_location')}
                </label>
                <select 
                  value={bookingSearch.pickupLocation}
                  onChange={(e) => setBookingSearch({...bookingSearch, pickupLocation: e.target.value})}
                  className="w-full bg-transparent border-0 border-b border-slate-700 focus:border-teal-400 rounded-none px-0 py-1.5 text-xs text-white focus:outline-none"
                >
                  {LOCATIONS.map(loc => <option key={loc} value={loc} className="bg-slate-900 text-white">{loc}</option>)}
                </select>
              </div>

              {/* Pickup Date & Time */}
              <div className="space-y-1.5 bg-slate-950/50 rounded-2xl p-3 border border-white/5">
                <label className="text-[10px] uppercase tracking-wider text-teal-300/90 font-semibold flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-teal-400" /> {t('label_pickup_datetime')}
                </label>
                <div className="flex gap-2">
                  <input 
                    type="date" 
                    value={bookingSearch.pickupDate}
                    onChange={(e) => setBookingSearch(prev => ({...prev, pickupDate: e.target.value}))}
                    onBlur={() => setBookingSearch(prev => { const today = getTodayStr(); const pd = prev.pickupDate < today ? today : prev.pickupDate; const rd = (!prev.returnDate || pd >= prev.returnDate) ? getNextDay(pd) : prev.returnDate; return {...prev, pickupDate: pd, returnDate: rd}; })}
                    min={getTodayStr()}
                    className="w-full bg-transparent border-0 border-b border-slate-700 focus:border-teal-400 rounded-none px-0 py-1.5 text-xs text-white focus:outline-none"
                  />
                  <input 
                    type="time" 
                    value={bookingSearch.pickupTime}
                    onChange={(e) => setBookingSearch({...bookingSearch, pickupTime: e.target.value})}
                    onBlur={() => setBookingSearch(prev => { if (prev.pickupDate === getTodayStr() && prev.pickupTime < getCurrentTimeStr()) return {...prev, pickupTime: getCurrentTimeStr()}; return prev; })}
                    className="w-20 bg-transparent border-0 border-b border-slate-700 focus:border-teal-400 rounded-none px-0 py-1.5 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Return Date & Time */}
              <div className="space-y-1.5 bg-slate-950/50 rounded-2xl p-3 border border-white/5">
                <label className="text-[10px] uppercase tracking-wider text-teal-300/90 font-semibold flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-teal-400" /> {t('label_return_datetime')}
                </label>
                <div className="flex gap-2">
                  <input 
                    type="date" 
                    value={bookingSearch.returnDate}
                    onChange={(e) => setBookingSearch(prev => ({...prev, returnDate: e.target.value}))}
                    min={getNextDay(bookingSearch.pickupDate)}
                    onBlur={() => setBookingSearch(prev => (prev.pickupDate && prev.returnDate > prev.pickupDate) ? prev : ({...prev, returnDate: getNextDay(prev.pickupDate)}))}
                    className="w-full bg-transparent border-0 border-b border-slate-700 focus:border-teal-400 rounded-none px-0 py-1.5 text-xs text-white focus:outline-none"
                  />
                  <input 
                    type="time" 
                    value={bookingSearch.returnTime}
                    onChange={(e) => setBookingSearch({...bookingSearch, returnTime: e.target.value})}
                    className="w-20 bg-transparent border-0 border-b border-slate-700 focus:border-teal-400 rounded-none px-0 py-1.5 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
              <div className="text-xs text-slate-400">
                {t('calculated_duration')} <span className="text-teal-300 font-semibold">{calculateDays(bookingSearch.pickupDate, bookingSearch.returnDate)} {t('days_suffix')}</span>
              </div>
              <button 
                onClick={onSearchSubmit}
                className="w-full sm:w-auto px-9 py-3.5 rounded-full bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-300 hover:to-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-[0_10px_30px_-8px] shadow-teal-400/50 hover:scale-[1.02]"
              >
                <Search className="w-4 h-4" /> {t('search_button')}
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* FEATURED VEHICLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-teal-400 font-semibold">{t('featured_label')}</span>
            <h2 className="text-2xl sm:text-3xl font-mono text-white mt-1">{t('featured_heading')}</h2>
          </div>
          <button 
            onClick={onSearchSubmit}
            className="text-xs uppercase tracking-widest text-slate-400 hover:text-teal-400 flex items-center gap-1 font-semibold transition-colors"
          >
            {t('explore_all')} <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FLEET_DATA.slice(0, 3).map((vehicle) => (
            <VehicleCard 
              key={vehicle.id} 
              vehicle={vehicle} 
              onSelect={onSelectVehicle}
              onReserve={onReserveDirect}
            />
          ))}
        </div>
      </section>

      {/* WHY CHOOSE VELOCITA */}
      <section className="bg-slate-950/60 border-y border-slate-800/80 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] text-teal-400 font-semibold">{t('diff_label')}</span>
            <h2 className="text-3xl font-mono text-white">{t('diff_heading')}</h2>
            <p className="text-slate-400 text-xs sm:text-sm">{t('diff_subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative bg-gradient-to-b from-slate-900/80 to-slate-900/20 border border-white/10 p-8 rounded-3xl space-y-4 overflow-hidden transition-all duration-300 hover:border-teal-400/40 hover:-translate-y-1 hover:shadow-[0_25px_50px_-20px] hover:shadow-teal-500/30">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl group-hover:bg-teal-400/20 transition-colors"></div>
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400/25 to-cyan-500/10 border border-teal-400/30 flex items-center justify-center text-teal-300 shadow-inner shadow-teal-500/10">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="relative text-lg font-mono text-white">{t('diff_card1_title')}</h3>
              <p className="relative text-xs text-slate-400 leading-relaxed">
                {t('diff_card1_desc')}
              </p>
            </div>

            <div className="group relative bg-gradient-to-b from-slate-900/80 to-slate-900/20 border border-white/10 p-8 rounded-3xl space-y-4 overflow-hidden transition-all duration-300 hover:border-teal-400/40 hover:-translate-y-1 hover:shadow-[0_25px_50px_-20px] hover:shadow-teal-500/30">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl group-hover:bg-teal-400/20 transition-colors"></div>
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400/25 to-cyan-500/10 border border-teal-400/30 flex items-center justify-center text-teal-300 shadow-inner shadow-teal-500/10">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="relative text-lg font-mono text-white">{t('diff_card2_title')}</h3>
              <p className="relative text-xs text-slate-400 leading-relaxed">
                {t('diff_card2_desc')}
              </p>
            </div>

            <div className="group relative bg-gradient-to-b from-slate-900/80 to-slate-900/20 border border-white/10 p-8 rounded-3xl space-y-4 overflow-hidden transition-all duration-300 hover:border-teal-400/40 hover:-translate-y-1 hover:shadow-[0_25px_50px_-20px] hover:shadow-teal-500/30">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl group-hover:bg-teal-400/20 transition-colors"></div>
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400/25 to-cyan-500/10 border border-teal-400/30 flex items-center justify-center text-teal-300 shadow-inner shadow-teal-500/10">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="relative text-lg font-mono text-white">{t('diff_card3_title')}</h3>
              <p className="relative text-xs text-slate-400 leading-relaxed">
                {t('diff_card3_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LUXURY EXPERIENCE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900">
          <img 
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80" 
            alt="Interior Experience" 
            className="w-full h-[400px] object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent flex items-center p-8 sm:p-16">
            <div className="max-w-xl space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] text-teal-400 font-semibold">{t('banner_label')}</span>
              <h2 className="text-3xl sm:text-4xl font-mono text-white leading-tight">
                {t('banner_heading')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t('banner_text')}
              </p>
              <button 
                onClick={onSearchSubmit}
                className="px-6 py-3 rounded-sm bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-widest transition-all inline-flex items-center gap-2"
              >
                {t('banner_button')} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

/* ============================================================================
   4. FLEET VIEW (CATALOG & FILTERING)
   ============================================================================ */

function FleetView({ 
  fleet, 
  filterCategory, 
  setFilterCategory, 
  filterBrand, 
  setFilterBrand, 
  filterPrice, 
  setFilterPrice, 
  sortBy, 
  setSortBy, 
  onSelectVehicle, 
  onReserveDirect 
}) {
  const { t } = useLang();
  const categories = ['All', 'Sports', 'Luxury', 'SUV', 'Convertible', 'Grand Tourer', 'Electric'];
  const brands = ['All', 'Porsche', 'Rolls-Royce', 'Mercedes-AMG', 'Ferrari', 'Bentley', 'Lamborghini', 'Aston Martin', 'Audi', 'Maserati', 'Range Rover', 'BMW', 'McLaren', 'Tesla', 'Lucid', 'Bugatti', 'Koenigsegg', 'Rimac'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Title */}
      <div className="space-y-2">
        <span className="text-xs uppercase tracking-[0.25em] text-teal-400 font-semibold">{t('fleet_label')}</span>
        <h1 className="text-3xl sm:text-4xl font-mono text-white">{t('fleet_heading')}</h1>
        <p className="text-slate-400 text-xs sm:text-sm">{t('fleet_subtitle')}</p>
      </div>

      {/* FILTER & CONTROL BAR */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-none space-y-6">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all ${
                filterCategory === cat 
                  ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20' 
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-800">
          
          {/* Brand Selector */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{t('label_brand')}</label>
            <select
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
            >
              {brands.map(b => <option key={b} value={b} className="bg-slate-900 text-white">{b}</option>)}
            </select>
          </div>

          {/* Max Price Range Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] uppercase tracking-wider font-semibold">
              <span className="text-slate-400">{t('label_max_rate')}</span>
              <span className="text-teal-400">${filterPrice} {t('per_day')}</span>
            </div>
            <input 
              type="range" 
              min="400" 
              max="2500" 
              step="50"
              value={filterPrice}
              onChange={(e) => setFilterPrice(Number(e.target.value))}
              className="w-full accent-teal-500 bg-slate-950 rounded cursor-pointer"
            />
          </div>

          {/* Sorting Dropdown */}
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{t('label_sort')}</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
            >
              <option value="recommended" className="bg-slate-900 text-white">{t('sort_recommended')}</option>
              <option value="price-low" className="bg-slate-900 text-white">{t('sort_price_low')}</option>
              <option value="price-high" className="bg-slate-900 text-white">{t('sort_price_high')}</option>
              <option value="luxury" className="bg-slate-900 text-white">{t('sort_luxury')}</option>
            </select>
          </div>

        </div>

      </div>

      {/* VEHICLES GRID */}
      {fleet.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/50 rounded-none border border-slate-800 space-y-4">
          <AlertCircle className="w-10 h-10 text-teal-400 mx-auto" />
          <h3 className="text-lg font-mono text-white">{t('no_match_heading')}</h3>
          <p className="text-xs text-slate-400">{t('no_match_text')}</p>
          <button 
            onClick={() => { setFilterCategory('All'); setFilterBrand('All'); setFilterPrice(2500); }}
            className="px-4 py-2 bg-slate-800 text-xs text-teal-400 font-semibold uppercase tracking-wider rounded-sm hover:bg-slate-700 transition-colors"
          >
            {t('reset_filters')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fleet.map((vehicle) => (
            <VehicleCard 
              key={vehicle.id} 
              vehicle={vehicle} 
              onSelect={onSelectVehicle}
              onReserve={onReserveDirect}
            />
          ))}
        </div>
      )}

    </div>
  );
}

/* ============================================================================
   5. VEHICLE CARD COMPONENT
   ============================================================================ */

function VehicleCard({ vehicle, onSelect, onReserve }) {
  const { t } = useLang();
  return (
    <div className="group bg-neutral-900/70 border border-neutral-800 rounded-2xl overflow-hidden hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between">
      
      <div>
        {/* Vehicle Image Container */}
        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950 cursor-pointer" onClick={() => onSelect(vehicle.id)}>
          <img 
            src={vehicle.images[0]} 
            alt={`${vehicle.brand} ${vehicle.model}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-indigo-300 font-semibold border border-neutral-800">
            {vehicle.category}
          </div>
          <div className="absolute bottom-3 right-3 bg-neutral-950/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-white border border-neutral-800">
            ${vehicle.pricePerDay} <span className="text-[10px] text-neutral-400 font-normal">{t('per_day')}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <div className="text-xs text-indigo-400 uppercase tracking-widest font-semibold">{vehicle.brand}</div>
            <h3 className="text-xl font-serif text-white font-medium group-hover:text-indigo-300 transition-colors">{vehicle.model}</h3>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-neutral-800/80 text-[11px] text-neutral-400">
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>{vehicle.hp} HP</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>{vehicle.seats} Seats</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Fuel className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>{vehicle.fuel}</span>
            </div>
          </div>

          <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed font-light">
            {vehicle.description}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 pt-0 grid grid-cols-2 gap-3">
        <button 
          onClick={() => onSelect(vehicle.id)}
          className="w-full py-2.5 rounded-lg border border-neutral-700 hover:border-indigo-400 text-neutral-200 hover:text-indigo-400 text-xs font-semibold uppercase tracking-wider transition-colors"
        >
          {t('btn_details')}
        </button>
        <button 
          onClick={() => onReserve(vehicle.id)}
          className="w-full py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors"
        >
          {t('btn_rent_now')}
        </button>
      </div>

    </div>
  );
}

/* ============================================================================
   6. VEHICLE DETAIL VIEW
   ============================================================================ */

function VehicleDetailView({ 
  vehicle, 
  bookingSearch, 
  setBookingSearch, 
  rentalDays, 
  selectedExtras, 
  toggleExtra, 
  pricing, 
  onProceedCheckout, 
  onBackToFleet 
}) {
  const { t } = useLang();
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Back Button */}
      <button 
        onClick={onBackToFleet}
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-slate-400 hover:text-teal-400 transition-colors font-semibold"
      >
        <ChevronLeft className="w-4 h-4" /> {t('back_to_fleet')}
      </button>

      {/* Top Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column: Gallery & Specifications */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Main Gallery Image */}
          <div className="space-y-4">
            <div className="relative aspect-[16/9] rounded-none overflow-hidden bg-slate-950 border border-slate-800">
              <img 
                src={vehicle.images[activeImage] || vehicle.images[0]} 
                alt={vehicle.model}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs text-teal-300 font-semibold uppercase tracking-wider">
                {vehicle.year} {t('model_year_suffix')}
              </div>
            </div>

            {/* Thumbnail selector */}
            <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-1 scrollbar-none">
              {vehicle.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative w-20 sm:w-24 aspect-[16/10] rounded-sm overflow-hidden border-2 transition-all shrink-0 ${
                    activeImage === idx ? 'border-teal-400 opacity-100' : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Description & Overview */}
          <div className="space-y-4 border-t border-slate-800 pt-6">
            <div className="text-xs uppercase tracking-widest text-teal-400 font-semibold">{vehicle.brand}</div>
            <h1 className="text-3xl sm:text-4xl font-mono text-white">{vehicle.model}</h1>
            <p className="text-sm text-slate-300 leading-relaxed font-light">{vehicle.description}</p>
          </div>

          {/* Key Specifications Grid */}
          <div className="space-y-4 border-t border-slate-800 pt-6">
            <h3 className="text-sm uppercase tracking-widest text-white font-semibold">{t('spec_heading')}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-none">
                <span className="text-[10px] uppercase text-slate-400 font-semibold block">{t('spec_horsepower')}</span>
                <span className="text-lg font-mono text-white">{vehicle.hp} HP</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-none">
                <span className="text-[10px] uppercase text-slate-400 font-semibold block">{t('spec_acceleration')}</span>
                <span className="text-lg font-mono text-white">{vehicle.acceleration}</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-none">
                <span className="text-[10px] uppercase text-slate-400 font-semibold block">{t('spec_transmission')}</span>
                <span className="text-lg font-mono text-white">{vehicle.transmission}</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-none">
                <span className="text-[10px] uppercase text-slate-400 font-semibold block">{t('spec_fuel')}</span>
                <span className="text-lg font-mono text-white">{vehicle.fuel}</span>
              </div>
            </div>
          </div>

          {/* Exclusive Features List */}
          <div className="space-y-4 border-t border-slate-800 pt-6">
            <h3 className="text-sm uppercase tracking-widest text-white font-semibold">{t('features_heading')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {vehicle.features.map((ft, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                  <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>{ft}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Reservation Sidebar */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-none space-y-6 sticky top-28">
            
            <div className="flex justify-between items-baseline border-b border-slate-800 pb-4">
              <div>
                <span className="text-2xl font-mono font-bold text-white">${vehicle.pricePerDay}</span>
                <span className="text-xs text-slate-400"> / day</span>
              </div>
              <div className="text-xs text-teal-400 font-semibold uppercase tracking-wider">
                {rentalDays} {t('day_rental_suffix')}
              </div>
            </div>

            {/* Quick Location & Schedule Config */}
            <div className="space-y-4 text-xs">
              
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{t('label_pickup_hub')}</label>
                <select 
                  value={bookingSearch.pickupLocation}
                  onChange={(e) => setBookingSearch({...bookingSearch, pickupLocation: e.target.value})}
                  className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3 py-2 text-white focus:outline-none focus:border-teal-500"
                >
                  {LOCATIONS.map(loc => <option key={loc} value={loc} className="bg-slate-900 text-white">{loc}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{t('label_start_date')}</label>
                  <input 
                    type="date" 
                    value={bookingSearch.pickupDate}
                    onChange={(e) => setBookingSearch(prev => ({...prev, pickupDate: e.target.value}))}
                    onBlur={() => setBookingSearch(prev => { const today = getTodayStr(); const pd = prev.pickupDate < today ? today : prev.pickupDate; const rd = (!prev.returnDate || pd >= prev.returnDate) ? getNextDay(pd) : prev.returnDate; return {...prev, pickupDate: pd, returnDate: rd}; })}
                    min={getTodayStr()}
                    className="w-full bg-slate-950 border border-slate-800 rounded-sm px-2.5 py-2 text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{t('label_return_date')}</label>
                  <input 
                    type="date" 
                    value={bookingSearch.returnDate}
                    onChange={(e) => setBookingSearch(prev => ({...prev, returnDate: e.target.value}))}
                    min={getNextDay(bookingSearch.pickupDate)}
                    onBlur={() => setBookingSearch(prev => (prev.pickupDate && prev.returnDate > prev.pickupDate) ? prev : ({...prev, returnDate: getNextDay(prev.pickupDate)}))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-sm px-2.5 py-2 text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

            </div>

            {/* Selectable Extras */}
            <div className="space-y-3 border-t border-slate-800 pt-4">
              <label className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">{t('label_extras')}</label>
              <div className="space-y-2">
                {EXTRAS_CATALOG.slice(0, 3).map(ext => {
                  const isChecked = selectedExtras.includes(ext.id);
                  return (
                    <div 
                      key={ext.id}
                      onClick={() => toggleExtra(ext.id)}
                      className={`p-2.5 rounded-sm border cursor-pointer transition-all flex items-center justify-between text-xs ${
                        isChecked ? 'bg-teal-500/10 border-teal-500/50 text-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${isChecked ? 'bg-teal-500 border-teal-500 text-slate-950' : 'border-slate-700'}`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="font-medium text-[11px]">{ext.name}</span>
                      </div>
                      <span className="text-teal-400 font-semibold text-[11px]">+${ext.price}/d</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Total Pricing Preview */}
            <div className="border-t border-slate-800 pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>{t('vehicle_subtotal')} ({rentalDays}d)</span>
                <span>${pricing.subtotalVehicle}</span>
              </div>
              {pricing.subtotalExtras > 0 && (
                <div className="flex justify-between text-slate-400">
                  <span>{t('selected_extras')}</span>
                  <span>${pricing.subtotalExtras}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400">
                <span>{t('estimated_fees')}</span>
                <span>${pricing.serviceFee + pricing.taxes}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white border-t border-slate-800/80 pt-2">
                <span>{t('total_due')}</span>
                <span className="text-teal-400">${pricing.grandTotal}</span>
              </div>
            </div>

            <button 
              onClick={onProceedCheckout}
              className="w-full py-3.5 rounded-sm bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-slate-950 font-bold text-xs uppercase tracking-widest shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-2"
            >
              {t('proceed_reserve')} <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 uppercase tracking-wider pt-1">
              <Shield className="w-3 h-3 text-teal-400" /> {t('free_cancellation')}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

/* ============================================================================
   7. CHECKOUT & RESERVATION VIEW (MULTI-STEP)
   ============================================================================ */

function CheckoutView({ 
  step, 
  setStep, 
  vehicle, 
  bookingSearch, 
  setBookingSearch, 
  selectedExtras, 
  toggleExtra, 
  customerData, 
  setCustomerData, 
  paymentData, 
  setPaymentData, 
  pricing, 
  rentalDays, 
  confirmedBooking, 
  onFinalSubmit, 
  onGoHome, 
  onSelectVehicle 
}) {
  const { t } = useLang();
  const stepsList = [
    { num: 1, title: t('step_label_vehicle') },
    { num: 2, title: t('step_label_details') },
    { num: 3, title: t('step_label_extras') },
    { num: 4, title: t('step_label_driver') },
    { num: 5, title: t('step_label_payment') }
  ];

  if (step === 6 && confirmedBooking) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 space-y-8 text-center">
        <div className="w-20 h-20 bg-teal-500/10 border border-teal-500/30 text-teal-400 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-teal-400 font-semibold">{t('reservation_confirmed')}</span>
          <h1 className="text-3xl sm:text-4xl font-mono text-white">{t('journey_awaits')}</h1>
          <p className="text-xs sm:text-sm text-slate-400">{t('reference_label')} <span className="text-teal-300 font-mono font-bold">{confirmedBooking.bookingRef}</span></p>
        </div>

        {/* Confirmed Summary Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-none p-6 text-left space-y-6">
          <div className="flex items-center gap-4 border-b border-slate-800 pb-4">
            <img src={confirmedBooking.vehicle.images[0]} alt="Vehicle" className="w-24 h-16 object-cover rounded-sm border border-slate-800" />
            <div>
              <span className="text-[10px] text-teal-400 uppercase tracking-widest block font-semibold">{confirmedBooking.vehicle.brand}</span>
              <h3 className="text-lg font-mono text-white">{confirmedBooking.vehicle.model}</h3>
              <span className="text-xs text-slate-400">{confirmedBooking.rentalDays} {t('days_rental_suffix')}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[10px] uppercase text-slate-400 font-semibold block">{t('label_pickup_location')}</span>
              <span className="text-slate-200 font-medium">{confirmedBooking.searchParams.pickupLocation}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-400 font-semibold block">{t('label_rental_dates')}</span>
              <span className="text-slate-200 font-medium">{confirmedBooking.searchParams.pickupDate} to {confirmedBooking.searchParams.returnDate}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-400 font-semibold block">{t('label_driver_name')}</span>
              <span className="text-slate-200 font-medium">{confirmedBooking.customer.firstName} {confirmedBooking.customer.lastName}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-slate-400 font-semibold block">{t('label_total_paid')}</span>
              <span className="text-teal-400 font-bold">${confirmedBooking.pricing.grandTotal}</span>
            </div>
          </div>

          {confirmedBooking.extras.length > 0 && (
            <div className="border-t border-slate-800 pt-4 space-y-1">
              <span className="text-[10px] uppercase text-slate-400 font-semibold block">{t('selected_extras')}</span>
              <ul className="text-xs text-slate-300 list-disc list-inside">
                {confirmedBooking.extras.map(e => <li key={e.id}>{e.name}</li>)}
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => window.print()} 
            className="px-6 py-3 rounded-sm border border-slate-700 hover:border-teal-400 text-xs uppercase tracking-wider font-semibold transition-colors w-full sm:w-auto"
          >
            {t('print_receipt')}
          </button>
          <button 
            onClick={onGoHome} 
            className="px-6 py-3 rounded-sm bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs uppercase tracking-wider font-bold transition-colors w-full sm:w-auto"
          >
            {t('return_home')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* STEPS INDICATOR */}
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between relative">
          {stepsList.map((s, idx) => (
            <div key={s.num} className="flex flex-col items-center z-10">
              <button
                onClick={() => s.num < step && setStep(s.num)}
                disabled={s.num > step}
                className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-[11px] sm:text-xs font-bold transition-all shrink-0 ${
                  step === s.num 
                    ? 'bg-teal-500 text-slate-950 shadow-lg shadow-teal-500/20' 
                    : step > s.num 
                    ? 'bg-teal-500/20 text-teal-400 border border-teal-500/40' 
                    : 'bg-slate-900 border border-slate-800 text-slate-400'
                }`}
              >
                {step > s.num ? <Check className="w-4 h-4" /> : s.num}
              </button>
              <span className={`hidden sm:block text-[10px] uppercase tracking-wider mt-2 font-semibold ${step === s.num ? 'text-teal-400' : 'text-slate-400'}`}>
                {s.title}
              </span>
            </div>
          ))}
          {/* Progress Line */}
          <div className="absolute top-4 left-0 right-0 h-[2px] bg-slate-800 z-0">
            <div 
              className="h-full bg-teal-500 transition-all duration-300"
              style={{ width: `${((step - 1) / (stepsList.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* MAIN STEP CONTENT AREA */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-none space-y-6">
          
          {/* STEP 1: VEHICLE SELECTION CONFIRMATION */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-mono text-white">{t('step1_title')}</h2>
                <p className="text-xs text-slate-400">{t('step1_desc')}</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 bg-slate-950 p-4 rounded-none border border-slate-800">
                <img src={vehicle.images[0]} alt={vehicle.model} className="w-full sm:w-48 aspect-[16/10] object-cover rounded-sm" />
                <div className="space-y-2 flex-1">
                  <span className="text-[10px] text-teal-400 uppercase tracking-widest font-semibold">{vehicle.brand}</span>
                  <h3 className="text-xl font-mono text-white">{vehicle.model}</h3>
                  <div className="flex gap-4 text-xs text-slate-400">
                    <span>{vehicle.hp} HP</span> • <span>{vehicle.seats} Seats</span> • <span>{vehicle.fuel}</span>
                  </div>
                  <p className="text-teal-400 font-bold text-sm pt-1">${vehicle.pricePerDay} / day</p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <button 
                  onClick={() => onSelectVehicle(vehicle.id)} 
                  className="text-xs uppercase tracking-wider text-slate-400 hover:text-teal-400 font-semibold"
                >
                  {t('view_specs_again')}
                </button>
                <button 
                  onClick={() => setStep(2)} 
                  className="px-6 py-2.5 rounded-sm bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-2"
                >
                  {t('continue_rental_details')} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: RENTAL DETAILS & SCHEDULE */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-mono text-white">{t('step2_title')}</h2>
                <p className="text-xs text-slate-400">{t('step2_desc')}</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{t('label_pickup_hub')}</label>
                    <select 
                      value={bookingSearch.pickupLocation}
                      onChange={(e) => setBookingSearch({...bookingSearch, pickupLocation: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                    >
                      {LOCATIONS.map(loc => <option key={loc} value={loc} className="bg-slate-900 text-white">{loc}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{t('label_return_hub')}</label>
                    <select 
                      value={bookingSearch.dropoffLocation}
                      onChange={(e) => setBookingSearch({...bookingSearch, dropoffLocation: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3 py-2.5 text-xs text-white focus:outline-none focus:border-teal-500"
                    >
                      {LOCATIONS.map(loc => <option key={loc} value={loc} className="bg-slate-900 text-white">{loc}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{t('label_pickup_datetime')}</label>
                    <div className="flex gap-2">
                      <input 
                        type="date" 
                        value={bookingSearch.pickupDate}
                        onChange={(e) => setBookingSearch(prev => ({...prev, pickupDate: e.target.value}))}
                        onBlur={() => setBookingSearch(prev => { const today = getTodayStr(); const pd = prev.pickupDate < today ? today : prev.pickupDate; const rd = (!prev.returnDate || pd >= prev.returnDate) ? getNextDay(pd) : prev.returnDate; return {...prev, pickupDate: pd, returnDate: rd}; })}
                        min={getTodayStr()}
                        className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3 py-2 text-xs text-white"
                      />
                      <input 
                        type="time" 
                        value={bookingSearch.pickupTime}
                        onChange={(e) => setBookingSearch({...bookingSearch, pickupTime: e.target.value})}
                        onBlur={() => setBookingSearch(prev => { if (prev.pickupDate === getTodayStr() && prev.pickupTime < getCurrentTimeStr()) return {...prev, pickupTime: getCurrentTimeStr()}; return prev; })}
                        className="w-24 bg-slate-950 border border-slate-800 rounded-sm px-2 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{t('label_return_datetime')}</label>
                    <div className="flex gap-2">
                      <input 
                        type="date" 
                        value={bookingSearch.returnDate}
                        onChange={(e) => setBookingSearch(prev => ({...prev, returnDate: e.target.value}))}
                        min={getNextDay(bookingSearch.pickupDate)}
                        onBlur={() => setBookingSearch(prev => (prev.pickupDate && prev.returnDate > prev.pickupDate) ? prev : ({...prev, returnDate: getNextDay(prev.pickupDate)}))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3 py-2 text-xs text-white"
                      />
                      <input 
                        type="time" 
                        value={bookingSearch.returnTime}
                        onChange={(e) => setBookingSearch({...bookingSearch, returnTime: e.target.value})}
                        className="w-24 bg-slate-950 border border-slate-800 rounded-sm px-2 py-2 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <button 
                  onClick={() => setStep(1)} 
                  className="text-xs uppercase tracking-wider text-slate-400 hover:text-teal-400 font-semibold"
                >
                  {t('btn_back')}
                </button>
                <button 
                  onClick={() => setStep(3)} 
                  className="px-6 py-2.5 rounded-sm bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-2"
                >
                  {t('continue_extras')} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: EXTRAS & ADD-ONS */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-mono text-white">{t('step3_title')}</h2>
                <p className="text-xs text-slate-400">{t('step3_desc')}</p>
              </div>

              <div className="space-y-3">
                {EXTRAS_CATALOG.map(ext => {
                  const isChecked = selectedExtras.includes(ext.id);
                  return (
                    <div 
                      key={ext.id}
                      onClick={() => toggleExtra(ext.id)}
                      className={`p-4 rounded-none border cursor-pointer transition-all flex items-start justify-between gap-4 ${
                        isChecked ? 'bg-teal-500/10 border-teal-500/50' : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center border shrink-0 ${isChecked ? 'bg-teal-500 border-teal-500 text-slate-950' : 'border-slate-700'}`}>
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white">{ext.name}</h4>
                          <p className="text-xs text-slate-400 mt-1">{ext.desc}</p>
                        </div>
                      </div>
                      <span className="text-teal-400 font-bold text-xs shrink-0">+${ext.price} / day</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <button 
                  onClick={() => setStep(2)} 
                  className="text-xs uppercase tracking-wider text-slate-400 hover:text-teal-400 font-semibold"
                >
                  {t('btn_back')}
                </button>
                <button 
                  onClick={() => setStep(4)} 
                  className="px-6 py-2.5 rounded-sm bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-2"
                >
                  {t('driver_info')} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: CUSTOMER DETAILS */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-mono text-white">{t('step4_title')}</h2>
                <p className="text-xs text-slate-400">{t('step4_desc')}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{t('label_first_name')}</label>
                  <input 
                    type="text" 
                    required
                    value={customerData.firstName}
                    onChange={(e) => setCustomerData({...customerData, firstName: e.target.value})}
                    placeholder="John"
                    className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{t('label_last_name')}</label>
                  <input 
                    type="text" 
                    required
                    value={customerData.lastName}
                    onChange={(e) => setCustomerData({...customerData, lastName: e.target.value})}
                    placeholder="Doe"
                    className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{t('label_email')}</label>
                  <input 
                    type="email" 
                    required
                    value={customerData.email}
                    onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                    placeholder="john@example.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{t('label_phone')}</label>
                  <input 
                    type="tel" 
                    required
                    value={customerData.phone}
                    onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <button 
                  onClick={() => setStep(3)} 
                  className="text-xs uppercase tracking-wider text-slate-400 hover:text-teal-400 font-semibold"
                >
                  {t('btn_back')}
                </button>
                <button 
                  onClick={() => setStep(5)} 
                  className="px-6 py-2.5 rounded-sm bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-widest transition-colors flex items-center gap-2"
                >
                  {t('payment_method')} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: PAYMENT & FINAL AUTHORIZATION */}
          {step === 5 && (
            <form onSubmit={onFinalSubmit} className="space-y-6">
              <div>
                <h2 className="text-xl font-mono text-white">{t('step5_title')}</h2>
                <p className="text-xs text-slate-400">{t('step5_desc')}</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{t('label_name_on_card')}</label>
                  <input 
                    type="text" 
                    required
                    value={paymentData.cardName}
                    onChange={(e) => setPaymentData({...paymentData, cardName: e.target.value})}
                    placeholder="JOHN DOE"
                    className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500 uppercase"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{t('label_card_number')}</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      required
                      value={paymentData.cardNumber}
                      onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                      placeholder="•••• •••• •••• ••••"
                      className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                    />
                    <Lock className="w-4 h-4 text-slate-500 absolute right-3 top-2.5" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{t('label_expiration')}</label>
                    <input 
                      type="text" 
                      required
                      placeholder="MM/YY"
                      value={paymentData.expDate}
                      onChange={(e) => setPaymentData({...paymentData, expDate: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">{t('label_cvv')}</label>
                    <input 
                      type="text" 
                      required
                      placeholder="123"
                      value={paymentData.cvv}
                      onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-sm px-3 py-2 text-xs text-white focus:outline-none focus:border-teal-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <button 
                  type="button"
                  onClick={() => setStep(4)} 
                  className="text-xs uppercase tracking-wider text-slate-400 hover:text-teal-400 font-semibold"
                >
                  {t('btn_back')}
                </button>
                <button 
                  type="submit"
                  className="px-8 py-3 rounded-sm bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-slate-950 font-bold text-xs uppercase tracking-widest shadow-lg shadow-teal-500/20 transition-all"
                >
                  {t('confirm_and_pay')} ${pricing.grandTotal}
                </button>
              </div>
            </form>
          )}

        </div>

        {/* ORDER SUMMARY SIDEBAR */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-none space-y-4 sticky top-28">
            <h3 className="text-sm font-mono uppercase tracking-widest text-white border-b border-slate-800 pb-3">{t('reservation_summary')}</h3>

            <div className="flex items-center gap-3">
              <img src={vehicle.images[0]} alt="Vehicle" className="w-20 h-14 object-cover rounded-sm border border-slate-800 shrink-0" />
              <div>
                <span className="text-[10px] text-teal-400 uppercase font-semibold block">{vehicle.brand}</span>
                <h4 className="text-sm font-mono text-white">{vehicle.model}</h4>
                <span className="text-xs text-slate-400">${vehicle.pricePerDay} {t('per_day')}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs border-t border-slate-800 pt-3">
              <div className="flex justify-between text-slate-400">
                <span>{t('duration_label')}</span>
                <span className="text-white font-medium">{rentalDays} {t('days_suffix')}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>{t('label_pickup_hub')}</span>
                <span className="text-white font-medium truncate max-w-[150px]">{bookingSearch.pickupLocation}</span>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-3 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>{t('vehicle_daily_total')}</span>
                <span>${pricing.subtotalVehicle}</span>
              </div>
              {pricing.subtotalExtras > 0 && (
                <div className="flex justify-between text-slate-400">
                  <span>{t('extras_subtotal')}</span>
                  <span>${pricing.subtotalExtras}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400">
                <span>{t('service_tax')}</span>
                <span>${pricing.serviceFee + pricing.taxes}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white border-t border-slate-800 pt-2">
                <span>{t('total_amount')}</span>
                <span className="text-teal-400">${pricing.grandTotal}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
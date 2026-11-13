# Adventure Escape SA – mobile app (Expo + TypeScript)

Built from the Xtreeme Challenge website (index, about, overview, fees, contact, login, payment, splash and the individual package pages).

## Run it
Needs Node.js and the Expo Go app on your phone.
1. `npm install`
2. `npx expo start` and scan the QR code with Expo Go
3. Optional type check: `npm run typecheck`

## Structure
- `App.tsx` – typed screen navigation (bottom tabs + Android back button)
- `src/types.ts` – `Adventure`, `Screen`, `FeeResult` and form-error types
- `src/data.ts` – the 7 packages/activities, venues, business info
- `src/utils.ts` – validation (name, email, SA phone, future date, card expiry) and `calculateFees` (array of ids -> subtotal, discount, 15% VAT, total)
- `src/context/QuoteContext.tsx` – shared quote and saved lists
- `src/components/` – Button, Field, AdventureCard, SimpleTable, Header, BottomNav
- `src/screens/` – SplashScreen, LoginScreen, HomeScreen, AboutScreen, OverviewScreen (search + filter), DetailScreen, FeesScreen, ContactScreen, PaymentScreen (all `.tsx`)

Discount rules: 1 booking 0%, 2 = 5%, 3 = 10%, more than 3 = 15%. Payment is a demo only.

import React, { useCallback, useEffect, useState } from 'react';
import { BackHandler, Platform, SafeAreaView, StatusBar, View, StyleSheet } from 'react-native';
import BottomNav from './src/components/BottomNav';
import Header from './src/components/Header';
import { QuoteProvider } from './src/context/QuoteContext';
import AboutScreen from './src/screens/AboutScreen';
import ContactScreen from './src/screens/ContactScreen';
import DetailScreen from './src/screens/DetailScreen';
import FeesScreen from './src/screens/FeesScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import OverviewScreen from './src/screens/OverviewScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import SplashScreen from './src/screens/SplashScreen';
import { Navigate, Screen } from './src/types';

function renderScreen(screen: Screen, go: Navigate): React.ReactElement {
  switch (screen.name) {
    case 'splash': return <SplashScreen go={go} />;
    case 'login': return <LoginScreen go={go} />;
    case 'home': return <HomeScreen go={go} />;
    case 'about': return <AboutScreen />;
    case 'overview': return <OverviewScreen go={go} initialQuery={screen.query} />;
    case 'detail': return <DetailScreen id={screen.id} go={go} />;
    case 'fees': return <FeesScreen go={go} />;
    case 'contact': return <ContactScreen packageId={screen.packageId} />;
    case 'payment': return <PaymentScreen go={go} />;
  }
}

export default function App() {
  const [history, setHistory] = useState<Screen[]>([{ name: 'splash' }]);
  const screen = history[history.length - 1];

  // Tab screens reset the history; detail, payment and "book now" contact push onto it.
  const go: Navigate = useCallback((next: Screen) => {
    const isTab = ['login', 'home', 'about', 'overview', 'fees', 'contact'].includes(next.name);
    const isBooking = next.name === 'contact' && next.packageId !== undefined;
    setHistory(h => (isTab && !isBooking ? [next] : [...h, next]));
  }, []);

  // Android back button steps back through the screen history
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (history.length > 1 && screen.name !== 'login') {
        setHistory(h => h.slice(0, -1));
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [history, screen.name]);

  const full = screen.name === 'splash' || screen.name === 'login';

  return (
    <QuoteProvider>
      <SafeAreaView style={styles.root}>
        <StatusBar barStyle={screen.name === 'splash' ? 'light-content' : 'dark-content'} />
        {!full && <Header />}
        <View style={{ flex: 1 }}>{renderScreen(screen, go)}</View>
        {!full && <BottomNav current={screen.name} go={go} />}
      </SafeAreaView>
    </QuoteProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
});

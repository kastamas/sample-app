import React from 'react';
import { ToastProvider } from 'react-native-toast-notifications';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';

import { store } from './store/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Navigation } from './navigation/navigation';

const App = () => {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ToastProvider offsetTop={60} offsetBottom={80}>
            <Provider store={store}>
              <Navigation />
            </Provider>
          </ToastProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default App;

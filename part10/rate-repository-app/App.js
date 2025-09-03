import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';

import Main from './src/components/Main';

const App = () => {
  return (
    <>
      <NativeRouter
        future={{
          v7_startTransition: true,      // 启用 startTransition 防止警告
          v7_relativeSplatPath: true,    // 启用新的相对路径解析
        }}
      >
        <Main />
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
};

export default App;
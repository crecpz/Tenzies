import './App.css';
import Main from './components/Main';

import {
  useWindowSize,
  useWindowWidth,
  useWindowHeight,
} from '@react-hook/window-size'



function App() {
  const [width, height] = useWindowSize()
  const onlyWidth = useWindowWidth()
  const onlyHeight = useWindowHeight()


  return (
    <Main />
  )
}

export default App;
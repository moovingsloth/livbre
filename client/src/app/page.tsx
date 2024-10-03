import Livbre from './components/Livbre'
import StoreProvider from './StoreProvider'

export default function Home() {
  return (
    <StoreProvider>
      <Livbre />
    </StoreProvider>
  )
}
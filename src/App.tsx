import './index.css';
import data from './data.json';
import DessertCard from './Components/DessertCard';
import Cart from './Components/Cart';
import { ShoppingCartProvider } from './context/ShoppingCartContext';

function App() {

  return (
    <ShoppingCartProvider>
      <div className="bg-slate-700 h-full md:flex">

        <div 
        className='w-full lg:w-2/3'
        >
          <h1 className='text-white text-2xl p-5 font-bold'>Desserts</h1>

          <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3'>
            {data.map((item) => (

              <DessertCard dessert={item} key={item.name} />

            ))}

          </div>
          {/* <DessertCard dessert={data[0]}/> */}

        </div>
        <div className='md:w-1/3'>
          <Cart />
        </div>
      </div>
    </ShoppingCartProvider>
  )
}

export default App

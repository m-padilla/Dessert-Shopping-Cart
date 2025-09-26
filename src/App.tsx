import './index.css';
import { useState } from "react";
import data from './data.json';
import DessertCard, { type DessertProps } from './Components/DessertCard';
import Cart from './Components/Cart';
import { ShoppingCartProvider } from './context/ShoppingCartContext.tsx';

function App() {

  const [selected, setSelected] = useState(data)

  const dessertCategories = new Set(data.map((item) => item.category))

  return (

    <ShoppingCartProvider>
      <div className="h-full w-full lg:p-10 bg-rose-50 md:flex ">
        <div
          className='w-full lg:w-2/3'
        >
          <div className='md:flex items-center'>
            <h1 className='text-rose-900 text-5xl p-5 font-bold'>Desserts</h1>
              <select
                onChange={(e) => {
                  const category = e.target.value;
                  const filtered = category === "All"
                    ? data
                    : data.filter(item => item.category === category);
                  setSelected(filtered);
                }}
                className='md:ml-auto ml-5 px-5 h-10 w-fit bg-white text-rose-900 rounded-lg border-2 border-red'
              >
                <option value="All"> Select Category</option>
                {Array.from(dessertCategories).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
          </div>

          <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3'>
            {selected.map((dessert) => (
              <DessertCard key={dessert.name} dessert={dessert} />
            ))}

          </div>

        </div>

        <div
          className='md:w-1/3'
        >
          <Cart />
        </div>
      </div>
    </ShoppingCartProvider>
  )
}

export default App

import './index.css';
import { useEffect, useState } from "react";
import DessertCard from './Components/DessertCard';
import type { Dessert } from './interfaces/Dessersts.interfaces.tsx';
import Cart from './Components/Cart';
import { getDesserts } from './services/api.ts';
import useFetch from './services/useFetch';
import { ShoppingCartProvider } from './context/ShoppingCartContext.tsx';

function App() {

  const {
    data: desserts = [],
    loading: dessertsLoading,
    error: dessertError
  } = useFetch<Dessert[]>(() => getDesserts({
    query: ''
  }))

  // 68daf42423a5691183198490


  const [selected, setSelected] = useState<Dessert[]>(desserts ?? []);

  useEffect(() => {
    setSelected(desserts ?? []);
  }, [desserts]);

  const dessertCategories: Set<string> = new Set(
    desserts && desserts.map((item: Dessert) => item.category)
  );


  return (
    <>
      <ShoppingCartProvider>
        <div className="h-full w-full lg:p-10 bg-rose-50 md:flex ">
          <div className='w-full lg:w-2/3'>
            <div className='md:flex items-center'>
              <h1 className='text-rose-900 text-5xl p-5 font-bold'>Desserts</h1>
              {dessertsLoading ? (
                <div className='md:ml-auto ml-5 px-5 h-10 w-fit  text-rose-900 rounded-lg'>Loading...</div>
              ) : dessertError ? (
                <div>{dessertError.message}</div>
              ) : (
                <select
                  onChange={(e) => {
                    const category = e.target.value;
                    const filtered = category === "All"
                      ? desserts && desserts
                      : desserts && desserts.filter(item => item.category === category);
                    setSelected(filtered ?? []);
                    // console.log("filtered: ",filtered);
                  }}
                  className='md:ml-auto ml-5 px-5 h-10 w-fit bg-white text-rose-900 rounded-lg border-2 border-red'
                >
                  <option value="All"> Select Category</option>
                  {/* You need to define dessertCategories */}
                  {Array.from(dessertCategories).map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              )}
            </div>
            {dessertsLoading ? (
              <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3'>
                {Array.from({ length: 3 }).map((_, i) => (
                  <LoadingPlaceholder key={i} />
                ))}
              </div>
            ) : dessertError ? (
              <div>{dessertError.message}</div>
            ) : (
              <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3'>
                {selected && selected.map((dessert) => (
                  <DessertCard key={dessert._id} dessert={dessert} />
                ))}
              </div>
            )}

          </div>
          <div className='md:w-1/3'>
            <Cart />
          </div>
        </div>
        <div className='text-center  text-rose-900 bg-rose-50 p-5'>
          Challenge by <a
            href="https://www.frontendmentor.io?ref=challenge"
            target='_blank'
            className='text-blue-700 underline hover:text-rose-800'
          >Frontend Mentor</a>.
          Coded by <a
            href="https://www.marcoapadilla.com/"
            target='_blank'
            className='text-blue-700 underline hover:text-rose-800'
          >Marco Padilla</a>
        </div>
      </ShoppingCartProvider>

    </>
  );
}

function LoadingPlaceholder() {
  return (
    <div className="p-3 ">
      {/* image and button */}

      <div className="w-full h-52 rounded-lg bg-slate-500 animate-pulse" />

      {/* text info of desserts */}
      <div className="py-7 space-y-2">

        {/* category */}
        <p className="max-w-24 h-4 bg-slate-500 animate-pulse"></p>

        {/* name */}
        <p className="max-w-60 h-4 bg-slate-500 animate-pulse"></p>

        {/* price */}
        <p className="max-w-20 h-4 bg-slate-500 animate-pulse"></p>

      </div>

    </div>
  )
}

export default App

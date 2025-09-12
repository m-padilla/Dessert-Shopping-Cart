import './index.css';
import data from './data.json';
import DessertCard from './Components/DessertCard';

function App() {

  return (
    <div className="bg-slate-700 h-full">

      <div>
        <h1 className='text-white text-xl p-5 font-bold'>Desserts</h1>

        <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1  gap-2 md:w-2/3'>
          {data.map((item) => (

            <DessertCard dessert={item} key={item.name} />

          ))}

        </div>
      </div>
    </div>
  )
}

export default App

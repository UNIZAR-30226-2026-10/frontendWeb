import React from 'react'

const sampleFriends = ['Ana', 'Pedro', 'Luis', 'María', 'Carla', 'José']

const BarraAmigos = () => {
  return (
    <div className='flex flex-col'>
      <h1 className='text-3xl text-center pt-4 text-white'> Amigos</h1>
      <div className='mt-4 flex justify-center pt-3'>
        <ul className='w-full max-w-sm bg-blue-700 rounded-lg shadow-md p-4 '>
          {sampleFriends.map((friend, index) => (
            <li key={index} className='text-white py-2 border-b border-blue-500 last:border-b-0'>
              {friend}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default BarraAmigos
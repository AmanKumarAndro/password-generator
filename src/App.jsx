import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [password, Setpassword] = useState("")
  const [numbers, Setnumbers] = useState(false)
  const [spchar, Setspchar] = useState(false)
  const [length, Setlength] = useState(8)
  const passwordGenrator = useCallback(() => {
    let pass = ""
    let temp_pass = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (numbers) { temp_pass += "0123456789" }
    if (spchar) { temp_pass += `!@#$%^&*()` }

    for (var i = 0; i < length; i++) {

      pass += temp_pass[Math.floor(Math.random() * temp_pass.length)]
    }
    Setpassword(pass)

  }, [numbers, spchar, length])

  useEffect(() => {
    passwordGenrator()
  }, [numbers, spchar, length]);

  const passref = useRef(null)
  return (
    <div className="space-y-12 bg-black text-white">


      <div className="flex justify-around items-center space-x-4 h-screen">
        <div className="bg-gray-900 rounded-lg shadow p-4 flex flex-col gap-4">
          <label htmlFor="pswd">Generated Password: </label>
          <input className='text-black' type="text" id="pswd" readOnly value={password} ref={passref} />
          <button className=' self-center w-1/2 bg-blue-900 px-5 py-3 rounded-lg' onClick={
            () => {
              passref.current?.select();
              navigator.clipboard.writeText(password); alert('Password Copied')
            }}>Copy</button>
          <button className='bg-gray-500 px-5 py-3 rounded-lg' onClick={passwordGenrator}>Generate New Password</button>
        </div>
        <div className="bg-gray-900 rounded-lg shadow p-4 flex flex-col gap-4">
          <div>
            <legend>Length of the Password : </legend>
            <label>Minimum Length is {length}</label><br />
            <input type="range" min={8} max={64} onChange={e => Setlength(Number(e.target.value))} />{length}
          </div>

          <div className="mt-4">
            <legend>Include Numbers? : </legend>
            <input type="checkbox" checked={numbers} onChange={() => Setnumbers(!numbers)} />Yes
          </div>

          <div className="mt-4">
            <legend>Include Special Characters ? : </legend>
            <input type="checkbox" checked={spchar} onChange={() => Setspchar(!spchar)} /> Yes
          </div>
        </div>
      </div>

    </div>

  )
}

export default App

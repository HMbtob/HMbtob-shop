export function Login() {
  return (
    <div className="flex flex-col bg-gray-100 h-auto min-h-screen w-scree">
      <div
        className="p-10 lg:p-24 text-center rounded bg-white flex flex-col items-center 
   m-auto w-11/12 lg:w-auto">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/interasiastock.appspot.com/o/assets%2Finterlogo-500.jpeg?alt=media&token=af2ec17d-dc0b-4147-9c7a-650ab2db870a"
          alt="logo"
          className="h-40 lg:h-96"
        />
        <div className="flex flex-col w-11/12 lg:w-80">
          <input type="email" placeholder="E-mail" className="p-3 border mt-3 rounded" />
          <input type="password" placeholder="Password" className="p-3 mt-3 border rounded" />
        </div>
        <button
          type="submit"
          className="text-lg font-semibold bg-gray-400 w-11/12 lg:w-80 p-2
       rounded mt-3 text-white">
          Sign In
        </button>
        <div className="text-right text-gray-800 w-11/12 mt-3 lg:w-80 text-xs cursor-pointer">
          forgot password?
        </div>
        <div className="flex flex-col lg:flex-row mt-5 w-80 justify-start">
          <div className="text-gray-700">{'New to INTERASIA ?  '}</div>
          <button className=" font-bold cursor-pointer text-gray-800" name="modal1">
            {' Sign Up with e-mail !'}
          </button>
        </div>
        <div className="mt-5 text-2xl font-semibold text-gray-600">or</div>
        <button
          className="mt-5 bg-gray-800 text-lg text-gray-50 px-2 lg:px-8 p-2 rounded
      w-11/12 lg:w-80">
          Sign in with Google
        </button>
      </div>
    </div>
  );
}



function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-base-200">
      <h1 className="text-4xl font-bold mb-4 text-primary">Login</h1>
      <form className="card bg-base-100 shadow-xl p-6 w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium">Username</label>
          <input type="text" id="username" className="mt-1 input input-bordered w-full" />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium">Password</label>
          <input type="password" id="password" className="mt-1 input input-bordered w-full" />
        </div>
        <button type="submit" className="btn btn-primary w-full">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
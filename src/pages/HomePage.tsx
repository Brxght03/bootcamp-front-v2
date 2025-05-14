
function HomePage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4 text-primary">Welcome to the Home Page</h1>
      <p className="mb-6 text-base-content">This is the main page of the application.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-base-200 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-accent">Feature One</h2>
            <p>Description of the first feature</p>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-primary">Learn More</button>
            </div>
          </div>
        </div>
        
        <div className="card bg-base-300 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-secondary">Feature Two</h2>
            <p>Description of the second feature</p>
            <div className="card-actions justify-end mt-4">
              <button className="btn btn-secondary">Explore</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
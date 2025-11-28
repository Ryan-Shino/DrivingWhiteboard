const Drills = () => {
  return (
    <div className="p-8 bg-gray-100 h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Drills & Reference</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Cockpit Drill */}
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
            <h2 className="text-xl font-bold text-indigo-600 mb-2">DSSSM (Cockpit Drill)</h2>
            <ul className="space-y-2 text-gray-600">
              <li><strong>D</strong>oors</li>
              <li><strong>S</strong>eat</li>
              <li><strong>S</strong>teering</li>
              <li><strong>S</strong>eatbelts</li>
              <li><strong>M</strong>irrors</li>
            </ul>
          </div>
          
          {/* Card 2: POM */}
          <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
             <h2 className="text-xl font-bold text-orange-600 mb-2">POM (Moving Off)</h2>
             <p className="text-gray-600">Prepare, Observe, Move</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drills;
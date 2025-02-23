import React, { useState } from 'react';

const CookingTracker = () => {
  const participants = ['Amir', 'Ravi', 'Sanskar', 'Vidya'];

  // State to keep track of credits
  const [credits, setCredits] = useState({
    Amir: 0,
    Ravi: 0,
    Sanskar: 0,
    Vidya: 0
  });

  // State for selected cook and eaters
  const [selectedCook, setSelectedCook] = useState(null);
  const [selectedEaters, setSelectedEaters] = useState([]);

  // State to keep track of cooking history
  const [history, setHistory] = useState([]);

  // Handle cook selection
  const handleCookSelect = (participant) => {
    setSelectedCook(participant);
    setSelectedEaters([]); // Reset eaters when cook is selected
  };

  // Handle eater selection
  const handleEaterToggle = (participant) => {
    if (participant === selectedCook) return; // Cook cannot be an eater
    if (selectedEaters.includes(participant)) {
      setSelectedEaters(selectedEaters.filter(eater => eater !== participant));
    } else {
      setSelectedEaters([...selectedEaters, participant]);
    }
  };

  // Handle cooking event submission
  const handleSubmit = () => {
    if (!selectedCook) {
      alert('Please select a cook.');
      return;
    }
    if (selectedEaters.length === 0) {
      alert('Please select at least one eater.');
      return;
    }

    // Update credits
    setCredits(prevCredits => {
      const newCredits = { ...prevCredits };
      newCredits[selectedCook] += selectedEaters.length;
      selectedEaters.forEach(eater => {
        newCredits[eater] -= 1;
      });
      return newCredits;
    });

    // Update history
    setHistory(prevHistory => [
      ...prevHistory,
      {
        cook: selectedCook,
        eaters: [...selectedEaters],
        date: new Date().toLocaleString()
      }
    ]);

    // Reset selections
    setSelectedCook(null);
    setSelectedEaters([]);
  };

  // Recommendation Logic: Get all participants with the lowest credit
  const getRecommendedCooks = () => {
    // Find the minimum credit value
    const minCredit = Math.min(...participants.map(p => credits[p]));
    // Get all participants with the minimum credit
    const recommended = participants.filter(p => credits[p] === minCredit);
    return recommended;
  };

  const recommendedCooks = getRecommendedCooks();

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Cooking Tracker</h1>
      
      {/* Recommended Cooks Section */}
      <h2>Recommended Cook{recommendedCooks.length > 1 ? 's' : ''}:</h2>
      {recommendedCooks.length > 0 ? (
        <ul>
          {recommendedCooks.map(cook => (
            <li key={cook}>{cook}</li>
          ))}
        </ul>
      ) : (
        <p>No recommendations available.</p>
      )}

      {/* Cook Selection */}
      <h2>Select Cook:</h2>
      <div>
        {participants.map(participant => (
          <button
            key={participant}
            onClick={() => handleCookSelect(participant)}
            style={{
              backgroundColor: selectedCook === participant ? 'green' : (recommendedCooks.includes(participant) ? '#4CAF50' : 'gray'),
              color: 'white',
              margin: '5px',
              padding: '10px 15px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              opacity: selectedCook === participant ? 1 : (recommendedCooks.includes(participant) ? 1 : 0.7)
            }}
          >
            {participant}
          </button>
        ))}
      </div>

      {/* Eater Selection */}
      <h2>Select Eaters:</h2>
      <div>
        {participants.map(participant => (
          <button
            key={participant}
            onClick={() => handleEaterToggle(participant)}
            disabled={!selectedCook || participant === selectedCook}
            style={{
              backgroundColor: selectedEaters.includes(participant) ? 'blue' : 'gray',
              color: 'white',
              margin: '5px',
              padding: '10px 15px',
              border: 'none',
              borderRadius: '4px',
              cursor: participant === selectedCook ? 'not-allowed' : 'pointer',
              opacity: participant === selectedCook ? 0.5 : (selectedEaters.includes(participant) ? 1 : 0.7)
            }}
          >
            {participant}
          </button>
        ))}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!selectedCook || selectedEaters.length === 0}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: (!selectedCook || selectedEaters.length === 0) ? 'lightgray' : 'purple',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: (!selectedCook || selectedEaters.length === 0) ? 'not-allowed' : 'pointer'
        }}
      >
        Submit Cooking Event
      </button>

      {/* Credits Display */}
      <h2>Credits:</h2>
      <ul>
        {participants.map(participant => (
          <li key={participant}>
            {participant}: {credits[participant]}
          </li>
        ))}
      </ul>

      {/* Cooking History */}
      <h2>Cooking History:</h2>
      {history.length > 0 ? (
        <ul>
          {history.map((event, index) => (
            <li key={index}>
              {event.date}: <strong>{event.cook}</strong> cooked for {event.eaters.join(', ')}
            </li>
          ))}
        </ul>
      ) : (
        <p>No cooking events recorded yet.</p>
      )}
    </div>
  );
};

export default CookingTracker;

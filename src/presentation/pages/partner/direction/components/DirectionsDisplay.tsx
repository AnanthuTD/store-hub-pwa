import React, { useEffect } from 'react';

// Define a type for props
interface DirectionsDisplayProps {
  directions: any;
  currentWaypointIndex: number | null;
  highlightedInstructionIndex: number | null; // Define as nullable for clarity
}

// Function to handle text-to-speech
const speakText = (text: string) => {
  const speech = new SpeechSynthesisUtterance();
  speech.text = text;
  speech.rate = 1; // Adjust the rate of speech
  speech.pitch = 1; // Adjust the pitch of the voice
  speech.volume = 1; // Adjust the volume
  window.speechSynthesis.speak(speech);
};

const DirectionsDisplay: React.FC<DirectionsDisplayProps> = ({
  directions,
  currentWaypointIndex,
  highlightedInstructionIndex,
}) => {
  const currentLeg = directions.routes[0].legs[currentWaypointIndex];

  useEffect(() => {
    if (highlightedInstructionIndex !== null && currentLeg?.steps[highlightedInstructionIndex]) {
      const instruction =
        currentLeg.steps[highlightedInstructionIndex].navigationInstruction.instructions;
      speakText(instruction);
    }
  }, [highlightedInstructionIndex, currentLeg]);

  if (!directions || currentWaypointIndex === null) return null;

  return (
    <div>
      <h3>Directions to Waypoint {currentWaypointIndex + 1}</h3>
      <ul>
        {currentLeg?.steps.map((step: any, index: number) => (
          <li
            key={index}
            style={{
              backgroundColor: highlightedInstructionIndex === index ? '#FFD700' : 'transparent', // Highlight if current
              transition: 'background-color 0.3s ease', // Smooth transition for highlight
            }}
          >
            <strong>{step.navigationInstruction.instructions}</strong>
            <p>
              <strong>Distance:</strong> {step.distanceMeters} meters
            </p>
            <p>
              <strong>Estimated Duration:</strong> {step.staticDuration}
            </p>
          </li>
        ))}
      </ul>
      <p>
        <strong>Total Distance:</strong> {currentLeg?.localizedValues.distance.text}
      </p>
      <p>
        <strong>Estimated Duration:</strong> {currentLeg?.localizedValues.duration.text}
      </p>
    </div>
  );
};

export default DirectionsDisplay;

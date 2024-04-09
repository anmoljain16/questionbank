import React, { useState } from 'react';

function ToneOptions() {
    const [selectedTone, setSelectedTone] = useState('Professional');

    const tones = ['Professional', 'Casual', 'Enthusiastic', 'Informational', 'Funny'];
    const [customTone, setCustomTone] = useState('');

    const handleToneChange = (tone) => {
        setSelectedTone(tone);
        // Log the selected tone to the console
        console.log('Selected tone:', tone);
    };

    const handleCustomToneChange = (event) => {
        setCustomTone(event.target.value);
    };

    const handleAddCustomTone = () => {
        if (customTone.trim() !== '') {
            setSelectedTone(customTone);
            // Log the selected tone to the console
            console.log('Selected tone:', customTone);
            // Clear the input field after adding custom tone
            tones.push(customTone)
            console.log(tones)
        }
    };

    return (
        <div className="tone-options tags" role="radiogroup">
            {tones.map((tone, index) => (
                <div
                    key={index}
                    role="radio"
                    className={`tone-option tag ${selectedTone === tone ? 'selected' : ''}`}
                    aria-checked={selectedTone === tone ? 'true' : 'false'}
                    aria-label={tone}
                    tabIndex="0"
                    onClick={() => handleToneChange(tone)}
                >
                    <span>{tone}</span>
                </div>
            ))}
            {/* Custom tone input */}
            <div className="custom-tone-input">
                <input
                    type="text"
                    placeholder="Enter custom tone"
                    value={customTone}
                    onChange={handleCustomToneChange}
                />
                <button onClick={handleAddCustomTone}>Add Custom Tone</button>
            </div>
        </div>
    );
}

export default ToneOptions;

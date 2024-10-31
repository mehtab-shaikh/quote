import React, { useState } from 'react';
import { uploadMedia, createQuote } from '../api/api';
import { getToken } from '../utils/auth';
import '../App.css';

const CreateQuote = () => {
    const [text, setText] = useState('');
    const [file, setFile] = useState(null);

    const handleCreateQuote = async () => {
        try {
            const mediaResponse = await uploadMedia(file);
            const mediaUrl = mediaResponse.url; // Extract the URL string

            await createQuote(getToken(), text, mediaUrl);
            alert('Quote created successfully');
        } catch (error) {
            console.error('Error creating quote:', error);
            alert('Failed to create quote');
        }
    };

    return (
        <div className="container">
            <h2>Create Quote</h2>
            <textarea
                placeholder="Quote Text"
                onChange={(e) => setText(e.target.value)}
                value={text}
            />
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleCreateQuote}>Create Quote</button>
        </div>
    );
};

export default CreateQuote;

import React, { useState, useEffect } from 'react';
import { fetchQuotes } from '../api/api';
import { getToken } from '../utils/auth';
import '../App.css';

const QuoteList = () => {
    const [quotes, setQuotes] = useState([]);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const loadQuotes = async () => {
            const response = await fetchQuotes(getToken(), 12, offset); // Load 12 quotes initially
            if (response.data && response.data.length) {
                setQuotes((prevQuotes) => [...prevQuotes, ...response.data]);
            }
        };
        loadQuotes();
    }, [offset]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Quotes</h2>
            <div style={styles.grid}>
                {quotes.map((quote) => (
                    <div key={quote.id} style={styles.quoteCard}>
                        {quote.mediaUrl ? (
                            <img src={quote.mediaUrl} alt="Quote" style={styles.quoteImage} />
                        ) : (
                            <div style={styles.noImage}>No Image Available</div>
                        )}
                        <div style={styles.quoteText}>{quote.text}</div>
                        <div style={styles.quoteInfo}>By: {quote.username}</div>
                        <div style={styles.quoteInfo}>Date: {formatDate(quote.createdAt)}</div>
                    </div>
                ))}
            </div>
            <button style={styles.loadMoreButton} onClick={() => setOffset(offset + 12)}>
                Load More
            </button>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    heading: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '20px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        width: '100%',
    },
    quoteCard: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        textAlign: 'center',
    },
    quoteImage: {
        width: '100%',
        aspectRatio: '1 / 1', // Ensures a 1:1 aspect ratio
        objectFit: 'cover',
        borderRadius: '5px',
        marginBottom: '10px',
    },
    noImage: {
        width: '100%',
        padding: '40px 0',
        backgroundColor: '#f0f0f0',
        color: '#888',
        borderRadius: '5px',
        fontSize: '14px',
        textAlign: 'center',
        marginBottom: '10px',
    },
    quoteText: {
        fontSize: '18px',
        color: '#333',
        margin: '10px 0',
    },
    quoteInfo: {
        fontSize: '14px',
        color: '#777',
        marginBottom: '5px',
    },
    loadMoreButton: {
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#4caf50',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        marginTop: '20px',
    },
    loadMoreButtonHover: {
        backgroundColor: '#45a049',
    },
};

export default QuoteList;

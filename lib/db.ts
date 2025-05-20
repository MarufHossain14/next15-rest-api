import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 *
 * - If already connected (`readyState === 1`), logs a message and returns.
 * - If currently connecting (`readyState === 2`), logs a message and returns.
 * - Otherwise, attempts to connect using the provided `MONGODB_URI` and options.
 * - Logs the connection status and throws an error if the connection fails.
 *
 * @throws {Error} If the connection to MongoDB fails.
 * @returns {Promise<void>} Resolves when the connection is established or already active.
 */
const connect = async () => {
    const connectionState = mongoose.connection.readyState;
    if (connectionState === 1) {
        console.log('Already connected to MongoDB');
        return;
    } 
    if (connectionState === 2) {
        console.log('Connecting to MongoDB...');
        return;
    }

    try {
        mongoose.connect(MONGODB_URI!, {
            dbName: 'next15restapi',
            bufferCommands: true
        });
        console.log('Connected to MongoDB');
    } catch (error: any) {
        console.error('Error connecting to MongoDB:', error);
        throw new Error('Failed to connect to MongoDB', error);
    }
}

export default connect;
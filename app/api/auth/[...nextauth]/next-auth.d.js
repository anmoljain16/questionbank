import { DefaultSession } from 'next-auth';

// Define the ExtendedUser interface
const ExtendedUser = {
    id: ''
};

// Extend the Session interface provided by next-auth
const Session = {
    user: ExtendedUser
};

// Update the Session interface provided by next-auth
module.exports = {
    Session: Session
};

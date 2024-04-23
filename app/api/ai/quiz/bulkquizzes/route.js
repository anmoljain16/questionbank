// import fs from 'fs';
//
// // Function to read user data from the JSON file
// function readUsersFromFile() {
//     try {
//         const data = fs.readFileSync('users.json');
//         return JSON.parse(data);
//     } catch (err) {
//         console.error("Error reading users from file:", err);
//         return [];
//     }
// }
//
// // Function to write user data to the JSON file
// function writeUsersToFile(users) {
//     try {
//         fs.writeFileSync('users.json', JSON.stringify(users, null, 4));
//         console.log("User data has been updated.");
//     } catch (err) {
//         console.error("Error writing users to file:", err);
//     }
// }
//
export async function handler(req) {
//     let users = readUsersFromFile();
//
//     // Function to insert value between two users based on average floatIndexing
//     function insertValue(after, before, value) {
//         const afterIndex = users.findIndex(user => user.id === after);
//         const beforeIndex = users.findIndex(user => user.id === before);
//
//         if (afterIndex === -1 || beforeIndex === -1) {
//             return "Invalid 'after' or 'before' user ID";
//         }
//
//         const afterFloatIndex = users[afterIndex].floatIndexing;
//         const beforeFloatIndex = users[beforeIndex].floatIndexing;
//         const average = (afterFloatIndex + beforeFloatIndex) / 2;
//
//         const newUser = {
//             id: users.length + 1, // Assign a proper ID
//             name: value,
//             floatIndexing: average
//         };
//
//         users.push(newUser);
//         users.sort((a, b) => a.floatIndexing - b.floatIndexing);
//         writeUsersToFile(users); // Write updated user data to file
//         return newUser; // Return the newly inserted user
//     }
//
//     const insertedUser = insertValue(1, 2, "newindex");
//     if (typeof insertedUser === "string") {
//         // Handle error
//         console.error(insertedUser);
//     }
//
    return Response.json({
        user: "users"
    })
}

//
export {handler as GET};

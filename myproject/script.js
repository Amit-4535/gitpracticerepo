let contactNumber = ""; // Initialize variable to hold the contact number

// Function to prompt for the contact number
document.getElementById('contactBtn').addEventListener('click', function() {
    contactNumber = prompt("Please enter your mobile number:");
    // Validate the contact number input
    if (!contactNumber) {
        alert("Contact number is required!");
        contactNumber = ""; // Reset if no number entered
    } else {
        alert(`Contact number ${contactNumber} saved!`); // Notify user of saved contact
    }
});

document.getElementById('bookingForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const name = document.getElementById('name').value;
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const roomType = document.getElementById('roomType').value;
    const roomCondition = document.getElementById('roomCondition').value; // New variable for room condition

    // Ensure that contact number has been entered before proceeding
    if (!contactNumber) {
        alert("Please enter your contact number before booking.");
        return;
    }

    // Calculate charges based on room type
    let charges = 0;
    if (roomType === 'single') {
        charges = 1000; // Charge for single room
    } else if (roomType === 'double') {
        charges = 1500; // Charge for double room
    }

    // Create a booking object
    const booking = {
        name: name,
        checkIn: checkIn,
        checkOut: checkOut,
        roomType: roomType,
        roomCondition: roomCondition, // Add room condition to booking
        contactNumber: contactNumber, // Add contact number to booking
        charges: charges // Add charges to booking
    };

    // Store the booking in local storage
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    alert(`Booking confirmed for ${name}!\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nRoom Type: ${roomType}\nRoom Condition: ${roomCondition}\nContact Number: ${contactNumber}\nCharges: ₹${charges}`);
});

// Function to update charges based on room type
function updateCharges() {
    const roomType = document.getElementById('roomType').value;
    const chargesDiv = document.getElementById('charges');
    let charges = 0;

    if (roomType === 'single') {
        charges = 3000; // Charge for single room
    } else if (roomType === 'double') {
        charges = 5000; // Charge for double room
    }

    chargesDiv.innerHTML = `Charges: ₹${charges}`;
}

// Add event listener for room type change
document.getElementById('roomType').addEventListener('change', updateCharges);

// Initialize charges on page load
updateCharges();

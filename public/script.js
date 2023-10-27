// Get the elements from the HTML document
const handle = document.getElementById('handle');
const message = document.getElementById('message');
const send = document.getElementById('send');
const messages = document.getElementById('messages');
const feedback = document.querySelector('.feedback');

// Create a socket.io client instance and connect to the server
const socket = io.connect();

// Add a click event listener to the send button
send.addEventListener('click', () => {
  // Get the values of the handle and message inputs
  const handleValue = handle.value.trim();
  const messageValue = message.value.trim();

  // Check if the inputs are not empty
  if (handleValue && messageValue) {
    // Emit a chat event to the server with the handle and message values
    socket.emit('chat', {
      handle: handleValue,
      message: messageValue
    });

    // Clear the message input and focus on it
    message.value = '';
    message.focus();
  }
});

// Add a keypress event listener to the message input
message.addEventListener('keypress', () => {
  // Get the value of the handle input
  const handleValue = handle.value.trim();

  // Check if the handle input is not empty
  if (handleValue) {
    // Emit a typing event to the server with the handle value
    socket.emit('typing', handleValue);
  }
});

// Listen for chat events from the server
socket.on('chat', (data) => {
  // Clear the feedback element
  feedback.innerHTML = '';

  // Create a new list item element
  const li = document.createElement('li');

  // Check if the handle value is equal to the current user's handle value
  if (data.handle === handle.value.trim()) {
    // Add a class of current-user to the list item element
    li.classList.add('current-user');
  } else {
    // Add a class of other-user to the list item element
    li.classList.add('other-user');
  }

  // Set the inner HTML of the list item element with the handle and message values
  li.innerHTML = `<strong>${data.handle}</strong>: ${data.message}`;

  // Append the list item element to the messages list element
  messages.appendChild(li);

  // Scroll to the bottom of the chat window element
  messages.scrollTop = messages.scrollHeight;
});

// Listen for typing events from the server
socket.on('typing', (data) => {
   // Set the inner HTML of the feedback element with the handle value
   feedback.innerHTML = `<p>${data} is typing...</p>`;
});

// Get the form element from the HTML document
const form = document.querySelector('form');

// Add a submit event listener to the form element
form.addEventListener('submit', (e) => {
  // Prevent the default behavior of the form submission, which is to reload the page
  e.preventDefault();

  // Call the click event handler of the send button
  send.click();
});

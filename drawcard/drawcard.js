// Global variables
const app = {
  drawButton: document.querySelector('#drawcard'),
  mainArea: document.querySelector('main'),
  cardDiv: document.querySelector('#cardDiv'),
  drawCardAPI: new URL("https://deckofcardsapi.com/api/deck/new/draw/?count=1"),
  cardImgWidth: 226,
  cardImgHeight: 314,
  cardImg: null
}

// First thing to do is make an appropriate amount of space for the card
function setupCardArea() {
  app.mainArea.style.gridTemplateRows = `${app.cardImgHeight}px`;
  app.cardDiv.style.width = `${app.cardImgWidth}px`;
}
setupCardArea()

// Set up the image element to be used
function setupImg() {
  if (app.cardImg !== null) return
  app.cardImg = document.createElement('img')
  app.cardImg.setAttribute('width', app.cardImgWidth)
  app.cardImg.setAttribute('height', app.cardImgHeight)
}
setupImg()

// What to run when the API call is successful
function onSuccess(response) {
  // Extract the image URL and a description of the card
  const card = response.cards[0]
  const imageURL = card.image
  const cardDesc = `${card.value} of ${card.suit.toLowerCase()}`
  // See if the img element is actually in the target div
  // Since appendChild moves nodes, the if statement is technically unnecessary?
  // Same applies to classList.remove; it does nothing if the class is missing
  if (!app.cardDiv.contains(app.cardImg)) {
    app.cardDiv.appendChild(app.cardImg)
    app.cardDiv.classList.remove('blank')
  }
  // Set the attributes of the img element
  app.cardImg.setAttribute('src', imageURL)
  app.cardImg.setAttribute('alt', cardDesc)
}

// What to do when the API call fails
function onFailure(error) {
  alert(`Error encountered with deck of cards API: ${error}`)
  console.log(error)
}

// Full function to call the draw card API
function drawCard() {
  fetch(app.drawCardAPI)
    .then(res => res.json())
    .then(onSuccess)
    .catch(onFailure)
}

// Attach the full function to the button
app.drawButton.addEventListener('click', drawCard)

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

// Get the link to the image from the API response
function getImageLink(response) {
  return response.cards[0].image
}

// Set the image in the card's div
function insertImage(imageURL) {
  // Make sure the img tag is actually in the div
  if (!app.cardDiv.contains(app.cardImg)) {
    app.cardDiv.appendChild(app.cardImg)
  }
  app.cardDiv.classList.remove('blank')
  app.cardImg.setAttribute('src', imageURL)
}

// What to run when the API call is successful
function onSuccess(response) {
  const imageURL = getImageLink(response)
  insertImage(imageURL)
}

// What to do when the API call fails
function onFailure(error) {
  alert(`Error encountered with deck of cards API: ${error}`)
  console.log(error)
}

// Full function to call the draw card API
function drawCard() {
  fetch(app.drawCardAPI).then(res => res.json()).then(onSuccess).catch(onFailure)
}

// Attach the full function to the button
app.drawButton.addEventListener('click', drawCard)

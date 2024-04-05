// Global variables
const app = {
    drawButton: document.getElementById('drawcard'),
    cardDiv: document.getElementById('cardDiv'),
    drawCardAPI: new URL("https://deckofcardsapi.com/api/deck/new/draw/?count=1"),
    cardImgWidth: 226,
    cardImgHeight: 314
}

// Get the link to the image from the API response
function getImageLink(response) {
    return response.cards[0].image
}

// Insert an image into the card's div
function insertImage(imageURL) {
    // Create the image html
    const img = document.createElement('img')
    img.setAttribute('src', imageURL)
    img.setAttribute('width', app.cardImgWidth)
    img.setAttribute('height', app.cardImgHeight)
    app.cardDiv.appendChild(img)
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

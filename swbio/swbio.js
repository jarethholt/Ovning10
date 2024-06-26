// Global variables
const app = {
  inputField: document.querySelector('#inputField'),
  inputButton: document.querySelector('#inputButton'),
  outputArea: document.querySelector('#outputArea'),
  baseSWURL: new URL("https://www.swapi.tech/api/people/"),
}

// Read the search contents when the button is pressed
function readInput() {
  const result = app.inputField.value
  // Convert the result into a URL with search params
  const params = new URLSearchParams({ name: result })
  const searchURL = new URL(app.baseSWURL.toString() + '?' + params.toString())
  return searchURL
}

// Convert a person record into a string
function stringifyPerson(person) {
  const props = person.properties
  const result =
      `${props.name}: Height ${props.height}, mass ${props.mass}, `
    + `gender ${props.gender}, hair color ${props.hair_color}`
  return result
}

// Determine what to do if the API fails
function onFailure(error) {
  alert(`Error encountered while searching: ${error}`)
  console.error(error)
}

// Determine what to do if the API succeeds
function onSuccess(response) {
  const result = response.result
  const personStrings = []
  for (const person of result) {
    personStrings.push(stringifyPerson(person))
  }
  app.outputArea.innerHTML = personStrings.join('\n')
}

// Compose the functions together
// Should this be an async function since it uses fetch?
function runSearch() {
  const searchURL = readInput()
  fetch(searchURL).then(res => res.json()).then(onSuccess).catch(onFailure)
}

// Attach the primary function to the search button/field
app.inputButton.addEventListener('click', runSearch)
app.inputField.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') runSearch()
})

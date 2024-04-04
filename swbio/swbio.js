// Constants
const inputField = document.getElementById('inputField')
const inputButton = document.getElementById('inputButton')
const outputArea = document.getElementById('outputArea')
const baseSWURL = new URL("https://www.swapi.tech/api/people/")

// Read the search contents when the button is pressed
function readInput() {
    let result = inputField.value
    // Convert the result into a URL with search params
    let params = new URLSearchParams({name: result})
    let searchURL = new URL(baseSWURL.toString() + '?' + params.toString())
    return searchURL
}

// Convert a person record into a string
function stringifyPerson(person) {
    let props = person.properties
    let result = `${props.name}: `
    result += `Height ${props.height}, `
    result += `mass ${props.mass}, `
    result += `gender ${props.gender}, `
    result += `hair color ${props.hair_color}`
    return result
}

// Determine what to do if the API fails
function onFailure(error) {
    alert(`Error encountered while searching: ${error}`)
    console.error(error)
    return ''
}

// Determine what to do if the API succeeds
function onSuccess(response) {
    let result = response.result
    let personStrings = []
    for (const person of result) {
        personStrings.push(stringifyPerson(person))
    }
    return personStrings.join('\n')
}

// Compose the functions together
async function runSearch() {
    let searchURL = readInput()
    let response = await fetch(searchURL).then(res => res.json()).catch(onFailure)
    let text = onSuccess(response)
    outputArea.innerHTML = text
}

inputButton.addEventListener('click', runSearch)
inputField.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') runSearch()
})

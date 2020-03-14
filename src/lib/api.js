async function getAllCharacters() {
    const response = await fetch('https://rickandmortyapi.com/api/character/')
    const parsedJson = await response.json();
    return parsedJson.results
}

async function getCharactersById(id){
    const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
    const parsedJson = await response.json();
    return parsedJson
}

export default{
    getAllCharacters,
    getCharactersById
}

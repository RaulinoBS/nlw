function sendData(nameInput,event) {
    const inputToChange = document.querySelector(`input[name=${nameInput}]`)
    const indexOfSelected = event.target.selectedIndex
    inputToChange.value = event.target.options[indexOfSelected].text
}
function readAPI(url, htmlSelect) {

  fetch(url)
    .then(res => res.json())
    .then(names => {

      const listNames = new Array()
      const objSelect = new Object()
      for (const name of names) {
        listNames.push(name.nome)
        const keyName = name.nome
        objSelect[keyName] = name.id
      }
      listNames.sort()
      for (name of listNames) {
        htmlSelect.innerHTML += `<option value="${objSelect[name]}">${name}</option>`

      }
      htmlSelect.disabled = false
    })
}


const ufSelect = document.querySelector("select[name=uf]")
readAPI(
  "https://servicodados.ibge.gov.br/api/v1/localidades/estados",
  ufSelect)



function getCities(event) {
  const citiesSelect = document.querySelector("select[name=city]")
  citiesSelect.innerHTML = "<option value>Selecione a Cidade</option>"


  const ufValue = event.target.value

  sendData("state",event)
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
  readAPI(url, citiesSelect)
  citiesSelect.disabled = false


}


document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)

function sendCity(event){sendData("city2",event)}

document
  .querySelector("select[name=city]")
  .addEventListener("change", sendCity)

//------------------------------------------------------//

const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event){
  const itemLi = event.target
  itemLi.classList.toggle("selected")

  const itemId = itemLi.dataset.id
  const alreadySelected = selectedItems.findIndex(item=>{
    return item == itemId
  })
  if (alreadySelected>=0){
    selectedItems = selectedItems.filter(item => {
      return item != itemId
    })
  }
  else{
    selectedItems.push(itemId)
  }
  collectedItems.value = selectedItems
}


const itemsToCollect = document.querySelectorAll(".items-grid li")
for (const item of itemsToCollect){
  item.addEventListener("click", handleSelectedItem)
}
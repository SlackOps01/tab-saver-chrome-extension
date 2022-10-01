let myLeads = []
let oldLeads = []
const inputEl = document.getElementById("input-el")
const ulEl = document.getElementById("ul-el")
const inputBtn = document.getElementById("input-button")
const deleteBtn = document.getElementById("delete-btn")
const saveBtn = document.getElementById("save-btn")

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads")) 

if (leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

inputBtn.addEventListener("click", function(){

    myLeads.push(inputEl.value)
    console.log(myLeads)
    render(myLeads)
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
})

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads =  []
    render(myLeads)
})
saveBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

function render(leads){
    let listItems = ""
    for (i = 0; i < leads.length; i++){
        listItems += `
        <li>
        <a target="_blank" href="${leads[i]}">
        ${leads[i]}
        </a>
        `
    }
    ulEl.innerHTML = listItems
}

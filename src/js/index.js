import UI from './views/UI.js';
import Adresses from './models/Adresses.js';


let ui=new UI();

let state={};  //state object to store values


window.state=state;   

// localStorage.clear();
window.addEventListener("load", e=>{  //added event listener on load where
	state.contacts=new Adresses();		//a ne state.contact instance is created
	state.contacts.getFromLocalStorage();  //state.contacts gets the values from local storage(if there are any)
	console.log(state.contacts.list);
	ui.renderContacts(state.contacts.list); //render the contacts in the DOM

})


document.querySelector(".post-submit").addEventListener("click", e=>{ //clicking the add new contact
	e.preventDefault();
	const data=ui.getInputData(); //getting the values from the input fields using the getInputData func
	console.log(data);
	if(data.firstName!=="" && data.lastName!=="" && data.email!=="" && data.phoneNumber!=="" && data.description!==""){
	let newContact=state.contacts.addContact(data.firstName,data.lastName,data.email,data.phoneNumber,data.description);
	ui.renderSingleContact(newContact);
	ui.addMessage("success","You successfully added a new contact");
	ui.clearInputData();   //storing the added contact in the newContact variable because the addContact returns the contact
		}else{
				ui.addMessage("danger","Please fill all fields");

		}
})                          //then rendering the new added contact on the dom displaying a message and clearing the input fields

document.querySelector("#contacts").addEventListener("click", e=>{  //event listener on the contacts div
	const id=e.target.closest(`.post1`).dataset.id;  //finding the id based on thje closest div with class post1

	e.preventDefault();
	if(e.target.matches(`.delete, .delete *`)){ //if that target matches delete calling the controlDelete
		controlDelete(id);
	}else if(e.target.matches(`.edit, .edit *`)){//if target matches edit calling the controlEdit
		controlEdit(e);
		
	}
})


function controlDelete(id){  //controlDelete function passing the id calling the deleteContact func
		state.contacts.deleteContact(id);
		ui.removeContactFromDOM(id);		//remove from the DOM
		topFunction();  //focus to the topp
		ui.addMessage("danger","You successfully removed the contact"); //adding a message
}

function controlEdit(e) {  //control edit
	const id=e.target.closest(`.post1`).dataset.id; //finding the id the same way
	state.currentContact=state.contacts.findCurrent(id);  //setting the currentContact to be the contact that was clicked to be edited
	console.log(state.currentContact);
	topFunction();
	ui.changeState("edit");  //changing the state to be for edit(removing the add btn and adding the cancel and update)
	ui.fillForm(state.currentContact); //filliong the form with the data from the current contact(data to be edited);
}

function controlUpdate(){  //update contact
	const data=ui.getInputData();  //getting the data from the input fields
	state.contacts.updateContact(state.currentContact,data); //updating the contact values 
	ui.renderContacts(state.contacts.list);  //then rendering to the dom the changed values
	ui.changeState("add");   //returning the state back to add 
	ui.addMessage("success","You successfully updated the contact"); //adding a message
	ui.clearInputData();  //clearing the input values
}

function topFunction() {   //function to get the focus on the page at the top
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

document.querySelector(".card-form").addEventListener("click", e=>{  
	if(e.target.matches(`.post-cancel`)){  //when cancel is clicked change the state back to add
		ui.changeState("add");
		ui.clearInputData();	
	}else if(e.target.matches(".post-update")){  //else update is clicked then call control update
		controlUpdate();	
	}
})


document.querySelector(".filterContacts").addEventListener("input", e=>{  //filter contacts
	state.searchText=e.target.value;   //set a state value to the input value of the filter contact input
	ui.renderContacts(state.contacts.list,state.searchText); //render the contacts once again that include the values inserted in the input field
})
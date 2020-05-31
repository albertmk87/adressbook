var ID = function () {
  return '_' + Math.random().toString(36).substr(2, 9);   // function for random id
};

export default class Adresses {
	constructor(){       //a list where we save all contact objects
		this.list=[];
	}

	addContact(firstName,lastName,email,phoneNumber,description){  //adding new contact creating newContact object
		let newContact={
			id:ID(),
			firstName,
			lastName,
			email,
			phoneNumber,
			description
		}
		this.list.push(newContact); //pushing to the array
		this.saveToLocalStorage();  //saving to local storage
		return newContact;			
	}

	deleteContact(id){
		const findIndex=this.list.findIndex(el=>el.id===id);  //finding the index of the contact that has the id
		this.list.splice(findIndex,1);  //removing from the list
		this.saveToLocalStorage();  //saving to local storage
	}

	updateContact(contactToUpdate,data){    //updating contanct passing the contact to update and the data
											//that is stored in data(the input values)
			contactToUpdate.firstName=data.firstName;
			contactToUpdate.lastName=data.lastName;
			contactToUpdate.email=data.email;
			contactToUpdate.phoneNumber=data.phoneNumber;
			contactToUpdate.description=data.description;
			this.saveToLocalStorage();
	}

	findCurrent(id){    //finding the current contact to edit and returning that object
		const find=this.list.find(el=>el.id===id);
		return find;
		}

	getFromLocalStorage(){   //using localstrage to get the data from local storage
		let storage=JSON.parse(localStorage.getItem("contacts"));
		if(storage){
			this.list=storage;
		}
	}


	saveToLocalStorage() {   //saving to local storage
	localStorage.setItem("contacts", JSON.stringify(this.list));
	}


}
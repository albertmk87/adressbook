

export default class UI {
	constructor(){    //selecting all elements from the dom
		this.firstName=document.querySelector("#firstName");
		this.lastName=document.querySelector("#lastName");
		this.email=document.querySelector("#email");
		this.phone_number=document.querySelector("#phone_num");
		this.description=document.querySelector("#description");
		this.contactsDOM=document.querySelector("#contacts");
		this.alertsDOM=document.querySelector(".alerts");
		this.contactSubmitBtn=document.querySelector(".post-submit");
		this.form=document.querySelector(".card-form");
	}

	getInputData(){  //getting the values from the input fields
		return {
			firstName:this.firstName.value,
			lastName:this.lastName.value,
			email:this.email.value,
			phoneNumber:this.phone_number.value,
			description:this.description.value
		}
	}

	clearInputData(){   //clearing the values from the input fields
		this.firstName.value="";
		this.lastName.value="";
		this.email.value="";
		this.phone_number.value="";
		this.description.value="";
	}

	clearAlert() {    //removing the alert if an alert exists
		const alert=document.querySelector(".alert");
		if(alert){
			alert.remove();
		}
	}


	addMessage(type,message){   //creating an alert message depanding on the arguments passed 
		this.clearAlert();
		const div=`
        <div class="alert alert-${type==="success" ? "success" : "danger"}">
          <p> ${message} </p>
         </div>
     	 `
     	 this.alertsDOM.insertAdjacentHTML("beforeend", div);
     	 setTimeout(()=>{        //setting a timeout for the alert to dissapear after 3 seconds
     	 	this.clearAlert();
     	 },3000)
	}

	renderSingleContact(contact) {    //rendering a single contact passing the contact to render
		const markUP=`<div class="post1 card mb-3" data-id=${contact.id}> 
        <div class="card-body"> 
          <h4 class="card-title">Name: ${contact.firstName} ${contact.lastName} </h4>
            <h5 class="card-title">Email: ${contact.email} </h5>
             <h5 class="card-title">Phone number: ${contact.phoneNumber} </h5>
          <p class="card-text">About: ${contact.description}</p>
          <a href="#" class="edit card-link" data-id=${contact.id}><i class="fa fa-pencil"></i></a>
          <a href="#" class="delete card-link" data-id=${contact.id}><i class="fa fa-remove" ></i></a>
         </div>
      </div>`
      this.contactsDOM.insertAdjacentHTML("beforeend", markUP);
	}

	renderContacts(contacts,searchText="") {  //render all contact and filtering the contacts if there is 
												//a value in the search field it will check for contacts
												//that includes those letters
		this.contactsDOM.innerHTML="";

		const filteredContacts=contacts.filter(contact=> contact.firstName.toLowerCase().includes(searchText.toLowerCase()) || contact.lastName.toLowerCase().includes(searchText.toLowerCase()) || contact.email.toLowerCase().includes(searchText.toLowerCase()) || contact.phoneNumber.toLowerCase().includes(searchText.toLowerCase()) || contact.description.toLowerCase().includes(searchText.toLowerCase()));
		filteredContacts.forEach(contact=>{
			this.renderSingleContact(contact);		//using the render single contact
		})
	}

	removeContactFromDOM(id){   //removing a contact from the DOM passing the id then selecting the el then 
								//removing from the dom
		const elToBeDeleted=document.querySelector(`[data-id="${id}"]`);
		elToBeDeleted.parentElement.removeChild(elToBeDeleted);
	}

	fillForm(contact){   //filling the form with the values of the clicked contact to be edited
		this.firstName.value=contact.firstName;
		this.lastName.value=contact.lastName;
		this.email.value=contact.email;
		this.phone_number.value=contact.phoneNumber;
		this.description.value=contact.description;	
	}
	
	changeState(type){  //changing the state of the dom if edit is clicked the add contact btn is removed
						//and two new buttons are added
		if(type==="edit"){
			this.contactSubmitBtn.style.visibility="hidden";
			const btns=`
				<button class="post-update btn btn-secondary btn-block">Update contact</button>
				<button class="post-cancel btn btn-danger btn-block">Cancel</button>
			`
			this.form.insertAdjacentHTML("beforeend", btns);
		}else if(type==="add"){
			this.contactSubmitBtn.style.visibility="visible";
			const btn=document.querySelector(".post-update");
			const btn2=document.querySelector(".post-cancel");
				if(btn){
			btn.remove();
		}
		if(btn2){
			btn2.remove();
		}
		}
	
	}
}
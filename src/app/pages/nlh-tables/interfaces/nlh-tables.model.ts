export class Player {
  id:number;
  name:string;
  nlhTable_address:string;
  email:string;
  phone:string;
  contact_person:string;
  is_active:string;

  constructor(nlhTable) {
    this.id = nlhTable.id;
    this.name=nlhTable.name ? nlhTable.name : "";
    this.nlhTable_address=nlhTable.nlhTable_addresses ? nlhTable.nlhTable_addresses[0].address.address : "";
    this.email=nlhTable.email ? nlhTable.email : "";
    this.phone=nlhTable.phone ? nlhTable.phone : "";
    this.contact_person=nlhTable.contact_person ? nlhTable.contact_person : "";
    if(nlhTable.is_active == 1) {
    	this.is_active = "Active"
    }
    if(nlhTable.is_active == 0) {
    	this.is_active = "Inactive"
    }
    if(nlhTable.is_active == "") {
    	this.is_active = ""
    }
  }


}

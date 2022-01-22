
export class UtilityFunctions {

  transformDate(value: any, arg1?: any,arg2?:any): any {
    var local_date=null;
    if (value) {            
        local_date=new Date(value);
        if (arg1) {
          if (arg1=="date") {
            local_date=this.appendLeadingZeroes(local_date.getDate()) + "-" + this.appendLeadingZeroes((local_date.getMonth() + 1)) + "-" + local_date.getFullYear();
          }
          else if (arg1=="time"){
            local_date=this.appendLeadingZeroes(local_date.getHours()) + ":" + this.appendLeadingZeroes(local_date.getMinutes());
          }
            else if (arg1=="datetime"){
                local_date=this.appendLeadingZeroes(local_date.getDate()) + "-" + this.appendLeadingZeroes((local_date.getMonth() + 1)) + "-" + local_date.getFullYear() + " " + this.appendLeadingZeroes(local_date.getHours()) + ":" + this.appendLeadingZeroes(local_date.getMinutes()) + ":" + this.appendLeadingZeroes(local_date.getSeconds());
            }
        }
        else{
          local_date=this.appendLeadingZeroes(local_date.getDate()) + "-" + this.appendLeadingZeroes((local_date.getMonth() + 1)) + "-" + local_date.getFullYear();
        }
        
    }
    return local_date;
  }

  appendLeadingZeroes(n){
    if(n <= 9){
      return "0" + n;
    }
    return n
  }

  transformAddress(value: any, args?: any): any {
    var formatted_address="";
    if (value) {            
      if (value.address) {
          formatted_address=value.address;
      }
      if (value.street_address) {
          formatted_address=formatted_address+(formatted_address.length>0?',':'')+value.street_address;
      }
      if (value.region && value.region.name.length>0) {
          formatted_address=formatted_address+(formatted_address.length>0?"\n ":'')+value.region.name;
      }
      if (value.city && value.city.name.length>0) {
          formatted_address=formatted_address+(formatted_address.length>0?' - ':'')+value.city.name;
      }
      if (value.area && value.area.name.length>0) {
          formatted_address=formatted_address+(formatted_address.length>0?' - ':'')+value.area.name;
      }
      if (value.pincode && value.pincode.length>0) {
          formatted_address=formatted_address+(formatted_address.length>0?' - ':'')+value.pincode;
      }
    }
    return formatted_address;
  }

  convertChronicDiseasesToString(value: any, args?: any): any {

    let chronic_diseases_string = "";  
    if(value) {
      if(value.length > 0) {
        value.forEach(function(item){
          chronic_diseases_string=chronic_diseases_string+(chronic_diseases_string==""?"":",")+((!item.chronic_disease)?'':item.chronic_disease.name);
        });
      } else {
        chronic_diseases_string = "";
      }
    } else {
      chronic_diseases_string = "";
    }
    return chronic_diseases_string;
  }

  transformApplicationStatus(value: any, type?: any): any {
    var status=value;
    if (type && type=='payment') {
        if (value=='pending') {
            status="Payment Due";
        }
        else if (value=='success') {
            status="Paid";
        }
        else if (value=='failed') {
            status="Payment Failed";
        }
        else if (value=='cencelled' || value=='canceled') {
            status="Payment Cancelled";
        }
    }
    else{
        if (value=='submitted' || value=='submited') {            
            status='Submitted';
        }
        else if (value=='waiting_for_payment') {
            status="Waiting for payment";
        }
        else if (value=='order_processed') {
            status="Order processed";
        }
        else if (value=='sent') {
            status="Sent";
        }
        else if (value=='unsent') {
            status="Unsent";
        }
        else if (value=='pending') {
            status="Pending";
        }
        else if (value=='Waiting_for_sample_collect') {
            status="Waiting for sample collect";
        }
        else if (value=='Waiting_for_diagnosis') {
            status="Waiting for diagnosis";
        }
        else if (value=='Waiting_for_report') {
            status="Waiting for report";
        }
        else if (value=='Report_delivered') {
            status="Report delivered";
        }
        else if (value=='waiting_for_confirmation') {
            status="Waiting for confirmation";
        }
        else if (value=='patient_not_come') {
            status="Patient not came";
        }
        else if (value=='complete') {
            status="Completed";
        }
        else if (value=='delivered') {
            status="Delivered";
        }
        else if (value=='follow_up') {
            status="Follow up";
        }
        else if (value=='shipped') {
            status="Shipped";
        }
        else if (value=='packed') {
            status="Packed";
        }
        else if (value=='ordered') {
            status="Ordered";
        }
        else if (value=='cash_on_delivery') {
            status="Cash On Delivery";
        }
        else if (value=='online_payment') {
            status="Online Payment";
        }
        else if (value=='medicine_purchases') {
            status="Medicine Purchase";
        }
        else if (value=='appointment' || value=='appointments') {
            status="Appointment";
        }
        else if (value=='rejected') {
            status="Rejected";
        }
        else if (value=='cencelled' || value=='canceled' || value=='cancelled') {
            status="Cancelled";
        }
        else if (value=='approved' || value=='aproved') {
            status="Approved";
        }
    }
    return status;
  }

  transformToCapitalLetter(value: any, type?: any): any {
    var status=value;
    if (value=='single') {
      status="Single";
    }
    else if (value=='married') {
      status="Married";
    }
    else if (value=='divorced') {
      status="Divorced";
    }
    else if (value=='male') {
      status="Male";
    }
    else if (value=='female') {
      status="Female";
    }
    else if (value=='others') {
      status="Others";
    }
    else if (value=='free') {
      status="Free";
    }
    else if (value=='paid') {
      status="Paid";
    }
    else if (value=='active') {
      status="Active";
    }
    else if (value=='inactive') {
      status="Inactive";
    }
    else if (value=='manual') {
      status="Manual";
    }
    else if (value=='facebook') {
      status="Facebook";
    }
    else if (value=='google') {
      status="Google";
    }
    else if (value=='available') {
      status="Available";
    }
    else if (value=='not_available') {
      status="Not Available";
    }

    return status;
  }


}
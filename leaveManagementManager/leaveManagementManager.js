import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getLeaves from '@salesforce/apex/LeaveManagementHandler.getLeaves';

export default class LeaveManagementManager extends LightningElement {
    @track dataList = [];
    @track columnsList = [
        { label: 'User', fieldName: 'userName' },
        { label: 'Type of Leave', fieldName: 'Type_of_Leave__c' },
        { label: 'From date', fieldName: 'From_date__c' },
        { label: 'To date', fieldName: 'To_date__c' },
        { label: 'Reason', fieldName: 'Reason__c' },
        { label: 'No of days', fieldName: 'No_of_days__c' },
        {
            label: 'Status', fieldName: 'Status__c', cellAttributes: {
                class: {
                    fieldName: 'statuscss'
                }
            }
        },
        {
            type: 'button',
            typeAttributes: {
                label: 'Edit',
                //disabled: { fieldName: 'isEditdisable' }
            }
        }
    ];
    @track isEdit = false;
    connectedCallback() {
        this.handleLoad();
    }
    handleLoad() {
        getLeaves()
            .then((result) => {
                this.dataList = result.map(a => {
                    return {
                        ...a, userName: a.User__r != undefined ? a.User__r.Name : '',
                        //isEditdisable: a.Status__c != 'Pending',
                        statuscss: a.Status__c == 'Approved' ? 'slds-theme_success' : a.Status__c == 'Rejected' ? 'slds-theme_error' : 'slds-theme_warning'

                    }
                });
            }).catch((error) => {

            });
    }
    handleRowAction(event) {
        this.isEdit = true;
        this.recordId = event.detail.row.Id;
    }
    handleClose(event) {
        this.isEdit = false;
    }
    handleSave(event) {
        const eve = new ShowToastEvent({
            title: 'Success',
            message: 'Record Created successfully : Id =' + event.detail.Id,
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(eve);
        this.isEdit = false;
        window.location.reload();
    }
}
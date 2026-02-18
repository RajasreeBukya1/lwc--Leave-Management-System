import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getPendingLeaves from '@salesforce/apex/LeaveManagementHandler.getPendingLeaves';
import getLeavesHistory from '@salesforce/apex/LeaveManagementHandler.getLeavesHistory';
export default class LeaveManagementEmployee extends LightningElement {
    @track isButtonClicked = true;
    @track labelHideShow = 'Hide';
    @track isApplyLeave = false;
    @track isPendingLeave = false;
    @track isLeaveHistory = false;
    @track isEdit = false;
    @track recordId;
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
                disabled: { fieldName: 'isEditdisable' }
            }
        }
    ]

    handleClickButton() {
        this.isButtonClicked = !this.isButtonClicked;
        this.labelHideShow = this.isButtonClicked ? 'Hide' : 'Show';
    }
    handleApplyLeave() {
        this.isApplyLeave = true;
        this.isPendingLeave = false;
        this.isLeaveHistory = false;
    }
    handleClose() {
        this.isApplyLeave = false;
        this.isEdit = false;
    }
    handleSave(event) {
        const evt = new ShowToastEvent({
            title:'success',
            message:'Record Created successfully : Id =' + event.detail.Id,
            variant:'success',
            mode:'dismissable'
        });
        this.dispatchEvent(evt);
        this.isApplyLeave = false;
        this.isEdit = false;
        this.isPendingLeave = false;
        this.isLeaveHistory = false;
    }
    handlePendingLeave() {
        this.isPendingLeave = true;
        this.isApplyLeave = false;
        this.isLeaveHistory = false;
        getPendingLeaves()
            .then((result) => {
                console.log('result ==', JSON.stringify(result));
                this.dataList = result.map(a => {
                    return {
                        ...a, userName: a.User__r != undefined ? a.User__r.Name : '',
                        isEditdisable: a.Status__c != 'Pending',
                        statuscss: a.Status__c == 'Approved' ? 'slds-theme_success' : a.Status__c == 'Rejected' ? 'slds-theme_error' : 'slds-theme_warning'
                    }
                });
            }).catch((error) => {

            });
    }
    handleLeaveHistory() {
        this.isLeaveHistory = true;
        this.isPendingLeave = false;
        this.isApplyLeave = false;
        getLeavesHistory()
            .then((result) => {
                this.dataList = result.map(a => {
                    return {
                        ...a, userName: a.User__r != undefined ? a.User__r.Name : '',
                        isEditdisable: a.Status__c != 'Pending',
                        statuscss: a.Status__c == 'Approved' ? 'slds-theme_success' : a.Status__c == 'Rejected' ? 'slds-theme_error' : 'slds-theme_warning'

                    }
                });
            }).catch((error) => {

            });
    }
    handleRowAction(event) {
        this.isEdit = true;
        this.recordId = event.detail.row.Id;
        console.log('this.recordId', this.recordId);
    }

}
public class LeaveManagementHandler {
	@AuraEnabled
    public static List<Leave_Management__c> getPendingLeaves(){
        List<Leave_Management__c> pendingLeaves = new List<Leave_Management__c>();
        pendingLeaves =[SELECT Id, Name, Type_of_Leave__c, From_date__c, To_date__c, Reason__c, User__c,User__r.Name,Status__c, No_of_days__c FROM Leave_Management__c WHERE Status__c='Pending' AND User__c =: userInfo.getUserId()];
        system.debug('pendingLeaves=='+pendingLeaves);
        return pendingLeaves;
    }
    @AuraEnabled
    public static List<Leave_Management__c> getLeavesHistory(){
        List<Leave_Management__c> LeavesHistory = new List<Leave_Management__c>();
        LeavesHistory =[SELECT Id, Name, Type_of_Leave__c, From_date__c, To_date__c, Reason__c, User__c,User__r.Name,Status__c, No_of_days__c FROM Leave_Management__c];
        system.debug('LeavesHistory=='+LeavesHistory);
        return LeavesHistory;
    }
      @AuraEnabled
    public static List<Leave_Management__c> getLeaves(){
        List<Leave_Management__c> leaves = new List<Leave_Management__c>();
        leaves =[SELECT Id, Name, Type_of_Leave__c, From_date__c, To_date__c, Reason__c, User__c,User__r.Name,Status__c, No_of_days__c FROM Leave_Management__c WHERE User__r.ManagerId =: userInfo.getUserId()];
        system.debug('leaves=='+leaves);
        return leaves;
    }
}
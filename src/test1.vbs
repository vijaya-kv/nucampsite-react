' Hey VJ,

 

' Can you help me?  
' I need to create a vb script to check if an email was sent to my outlook inbox with the subject “Test Notification”. 
'  I have this script so far but I need to modify the unread email to check for the subject.

 

 

' Thanks,

' Van

' ‘============= Script that needs modification =====================

Dim olFolderInbox, iTotalMails, sSubject
olFolderInbox = 6 : sSubject = ""
 
Set objOutlook = CreateObject("Outlook.Application")
Set objNamespace = objOutlook.GetNamespace("MAPI")
 
'Create reference to Inbox Folder
Set oInbox = objNamespace.GetDefaultFolder(olFolderInbox)
 
'Find all items in the Inbox Folder
Set oAllMails = oInbox.Items
iTotalMails = oAllMails.Count
 Print "iTotalMails= "&iTotalMails
'Loop through the mail items
For i=1 to iTotalMails
  'Check if the mail is UnRead or not
  If oAllMails(i).UnRead = True Then
     sSubject = sSubject & oAllMails(i).Subject & vbCrLf
  End If
Next
 
'Display the results
'msgbox sSubject
Print sSubject


 
 
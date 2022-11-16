@secure()
param provisionParameters object

var identityName = provisionParameters.userAssignedIdentityName

// user assigned identity will be used to access other Azure resources
resource managedIdentity 'Microsoft.ManagedIdentity/userAssignedIdentities@2018-11-30' = {
  name: identityName
  location: provisionParameters.userAssignedIdentityLocation
}

output identityName string = identityName
output identityClientId string = managedIdentity.properties.clientId
output identityResourceId string = managedIdentity.id
output identityPrincipalId string = managedIdentity.properties.principalId

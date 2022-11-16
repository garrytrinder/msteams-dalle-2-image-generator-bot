@secure()
param provisionParameters object

resource stdalleimagegenerator 'Microsoft.Storage/storageAccounts@2022-05-01' = {
  sku: {
    name: 'Standard_RAGRS'
  }
  kind: 'StorageV2'
  name: provisionParameters.storageAccountName
  location: provisionParameters.storageAccountLocation
  tags: {
  }
  properties: {
    dnsEndpointType: 'Standard'
    defaultToOAuthAuthentication: false
    publicNetworkAccess: 'Enabled'
    allowCrossTenantReplication: true
    minimumTlsVersion: 'TLS1_2'
    allowBlobPublicAccess: true
    allowSharedKeyAccess: true
    networkAcls: {
      bypass: 'AzureServices'
      virtualNetworkRules: []
      ipRules: []
      defaultAction: 'Allow'
    }
    supportsHttpsTrafficOnly: true
    encryption: {
      requireInfrastructureEncryption: false
      services: {
        file: {
          keyType: 'Account'
          enabled: true
        }
        blob: {
          keyType: 'Account'
          enabled: true
        }
      }
      keySource: 'Microsoft.Storage'
    }
    accessTier: 'Hot'
  }
}

resource blobService 'Microsoft.Storage/storageAccounts/blobServices@2021-06-01' = {
  name: '${stdalleimagegenerator.name}/default'
}

resource stateContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2022-05-01' = {
  name: provisionParameters.blobContainerName
  parent: blobService
  properties: {
    metadata: {}
    publicAccess: 'None'
  }
}

var blobConnectionString = 'DefaultEndpointsProtocol=https;AccountName=${stdalleimagegenerator.name};EndpointSuffix=${environment().suffixes.storage};AccountKey=${listKeys(stdalleimagegenerator.id, stdalleimagegenerator.apiVersion).keys[0].value}'

output blobConnectionString string = blobConnectionString

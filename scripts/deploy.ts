const hook =
  'https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/d9df8822-b663-49c6-9fd3-ed4d81300163'

fetch(hook, {
  method: 'POST',
})

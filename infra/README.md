# Infra for Morning

```bash
terraform apply
```

On the first run, I had to:

- approve Cloud Resource Manager API
- approve App Engine Admin API
- connect Cloud Build to Github via https://console.cloud.google.com/cloud-build/triggers/connect?project=<some-id>
- approve Cloud Build

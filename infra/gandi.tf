provider "gandi" {
  version = "2.0.0-rc3"
  key     = var.gandi_api_key
}

resource "gandi_livedns_record" "morning_live_dns" {
  zone   = var.domain_name
  name   = google_app_engine_domain_mapping.domain_mapping.resource_records.0.name
  type   = google_app_engine_domain_mapping.domain_mapping.resource_records.0.type
  ttl    = 10800
  values = [google_app_engine_domain_mapping.domain_mapping.resource_records.0.rrdata]
}

output "domain_mapping_records" {
  value = google_app_engine_domain_mapping.domain_mapping.resource_records
}

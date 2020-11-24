provider "google-beta" {
  version = "~>3.48.0"

  # The id here is set arbitrarily. I guess it has to be unique
  # for the organization, not for GCP
  project = var.project

  region = "europe-west"
  zone   = "europe-west-1"
}

resource "google_project" "morning" {
  name            = "morning"
  project_id      = var.project
  billing_account = var.billing_account
}

resource "google_project_service" "service" {
  for_each = toset([
    "cloudresourcemanager.googleapis.com",
    "appengine.googleapis.com",
    "cloudbuild.googleapis.com",
  ])

  service = each.key

  project            = google_project.morning.project_id
  disable_on_destroy = false
}

resource "google_app_engine_application" "app" {
  project     = google_project.morning.project_id
  location_id = "europe-west"
}

resource "google_cloudbuild_trigger" "build-trigger" {
  project = google_project.morning.project_id

  filename = "infra/cloud-build.yaml"

  github {
    owner = "bobinette"
    name  = "morning"
    push {
      branch = "^main$"
    }
  }
}

resource "google_project_service_identity" "service_identity" {
  project = google_project.morning.project_id
  service = "cloudbuild.googleapis.com"
}

resource "google_project_iam_member" "cloud_build_iam_policy" {
  for_each = toset([
    # The App Engine admin persmission is a bit too broad, have a look at this link
    # if you want to restrict them:
    # https://cloud.google.com/appengine/docs/flexible/nodejs/roles#recommended_role_for_application_deployment
    "roles/appengine.appAdmin",
    "roles/iam.serviceAccountUser",
  ])

  project = google_project.morning.project_id
  role    = each.key
  member  = "serviceAccount:${google_project_service_identity.service_identity.email}"
}

resource "google_app_engine_domain_mapping" "domain_mapping" {
  project     = google_project.morning.project_id
  domain_name = var.full_domain_name

  # This one did not seem to work, I still had to remove the domain from
  # the previous test with:
  #   gcloud config set project <previous project>
  #   gcloud app domain-mappings delete <domain>
  override_strategy = "OVERRIDE"

  ssl_settings {
    ssl_management_type = "AUTOMATIC"
  }
}

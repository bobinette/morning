terraform {
  required_providers {
    google = {
      source = "hashicorp/google-beta" # beta required to use the Github cloud build
    }
  }
}

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
    "cloudresourcemanager.googleapis.com",
    "appengine.googleapis.com",
    "cloudbuild.googleapis.com",
  ])

  project = google_project.morning.project_id
  role    = each.key
  member  = "serviceAccount:${google_project_service_identity.service_identity.email}"
}

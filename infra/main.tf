terraform {
  required_providers {
    google = {
      source = "hashicorp/google-beta" # beta required to use the Github cloud build
    }
  }
}

provider "google" {
  version = "3.5.0"

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

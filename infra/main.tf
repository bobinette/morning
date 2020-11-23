terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
    }
  }
}

provider "google" {
  version = "3.5.0"

  region = "europe-west"
  zone   = "europe-west-1"
}

resource "google_project" "morning" {
  name = "morning"

  # The id here is set arbitrarily. I guess it has to be unique
  # for the organization, not for GCP
  project_id = "morning-123"
}

resource "google_app_engine_application" "app" {
  project     = google_project.morning.project_id
  location_id = "europe-west"
}

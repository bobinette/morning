terraform {
  required_providers {
    gandi = {
      source = "psychopenguin/gandi"
    }

    google = {
      source = "hashicorp/google-beta" # beta required to use the Github cloud build
    }
  }
}

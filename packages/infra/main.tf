terraform {
  backend "s3" {
    bucket                      = "terraform-barriere-me"
    key                         = "barriere.me"
    region                      = "auto"
    skip_credentials_validation = true
    skip_metadata_api_check     = true
    skip_region_validation      = true
    skip_requesting_account_id  = true
    skip_s3_checksum            = true
    use_path_style              = true
  }
  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~>4"
    }
  }
}

provider "cloudflare" {
  api_token = var.CLOUDFLARE_API_TOKEN
}

resource "cloudflare_workers_script" "barriere-me-worker" {
  account_id          = var.CLOUDFLARE_ACCOUNT_ID
  content             = file("../../apps/api/dist/index.js")
  name                = "barriere-me"
  compatibility_date  = "2024-09-25"
  compatibility_flags = ["nodejs_compat"]
  module              = true

  secret_text_binding {
    name = "SUPABASE_URL"
    text = var.SUPABASE_URL
  }
  secret_text_binding {
    name = "SUPABASE_ANON_KEY"
    text = var.SUPABASE_ANON_KEY
  }

  secret_text_binding {
    name = "ENVIRONMENT"
    text = var.ENVIRONMENT
  }
}

resource "cloudflare_workers_domain" "barriere-me-worker-domain" {
  account_id = var.CLOUDFLARE_ACCOUNT_ID
  hostname   = "api.${var.HOSTNAME}"
  service    = cloudflare_workers_script.barriere-me-worker.name
  zone_id    = var.CLOUDFLARE_ZONE_ID
}

resource "cloudflare_pages_project" "barriere-me-frontend" {
  account_id        = var.CLOUDFLARE_ACCOUNT_ID
  name              = "barriere-me-frontend"
  production_branch = "main"

  deployment_configs {
    production {
      compatibility_date  = "2024-09-26"
      compatibility_flags = ["nodejs_compat"]

      environment_variables = {
        ENVIRONMENT = var.ENVIRONMENT
        API_URL     = "https://api.${var.HOSTNAME}/api"
      }
    }
  }
}

resource "cloudflare_record" "barriere-me-frontend_domain_zone" {
  zone_id = var.CLOUDFLARE_ZONE_ID
  name    = var.HOSTNAME
  content = cloudflare_pages_project.barriere-me-frontend.domains[0]
  type    = "CNAME"
  proxied = true
}

resource "cloudflare_pages_domain" "barriere-me-frontend-domain" {
  account_id   = var.CLOUDFLARE_ACCOUNT_ID
  domain       = var.HOSTNAME
  project_name = cloudflare_pages_project.barriere-me-frontend.name
}

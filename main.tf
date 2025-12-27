# 1. Definimos el proveedor (donde queremos el servidor)
provider "digitalocean" {
  token = var.do_token
}

# 2. "Programamos" el servidor
resource "digitalocean_droplet" "servidor_navidad" {
  image  = "ubuntu-22-04-x64"
  name   = "santa-big-data-v2025"
  region = "nyc1"
  size   = "s-1vcpu-1gb" # El más barato/gratis
  ssh_keys = [var.ssh_fingerprint]

  # 3. Script de provisión (Adiós configuración manual)
  user_data = <<-EOF
              #!/bin/bash
              apt-get update
              apt-get install -y nodejs npm git
              git clone https://github.com/tu-usuario/mi-proyecto-glass.git
              cd mi-proyecto-glass
              npm install
              npm run build
              EOF
}
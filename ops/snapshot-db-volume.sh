#give it a date and hash
gsutil -o "Credentials:gs_service_key_file=$3" cp -r /var/lib/docker/volumes/balendar_database-data/ gs://$1$2
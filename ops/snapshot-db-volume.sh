printf -v date '%(%Y-%m-%d)T\n' -1
echo $date

gsutil -o "Credentials:gs_service_key_file=$1" cp -r /var/lib/docker/volumes/balendar_database-data/ gs://$2/databases/docker-volumes/$date
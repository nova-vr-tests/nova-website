heroku pg:backups:capture -a safe-hamlet-16715
heroku pg:backups:download -a safe-hamlet-16715
mkdir -p db_backups
now=`date +%Y-%m-%d.%H:%M:%S`
name="$now.dump"
mv latest.dump db_backups/$name

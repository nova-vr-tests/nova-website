npm install
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
deactivate

python manage.py makemigrations
python manage.py migrate

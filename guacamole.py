import mysql.connector as mariadb
import webbrowser
from flask import Flask
app = Flask(__name__)

@app.route("/<hostname>")
def getid(hostname):
  mariadb_connection = mariadb.connect(host='52.188.75.187', port=3306,user='guacadm', password='Soti@2019', database='guac_db')
  cursor = mariadb_connection.cursor()
  cursor.execute("SELECT connection_id FROM guacamole_connection WHERE connection_name=%s", (hostname,))
  guacid = cursor.fetchone()

  webbrowser.get().name
  webbrowser.open('https://guacamole.mobicontrol.cloud/#/client/%s' % guacid)
  return 

if __name__ == '__main__':
  app.run(host='')
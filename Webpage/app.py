from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask import Flask, jsonify
from sqlalchemy.ext.automap import automap_base
import psycopg2

from flask_cors import CORS, cross_origin
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app = Flask(__name__)

rds_connection_string = "postgres:postgres@localhost:5432/Project_2"
engine = create_engine(f'postgresql://{rds_connection_string}')
Base = automap_base()

Base.prepare(engine, reflect=True)
temper = Base.classes.temperament


@app.route("/")
def welcome():
    return(
        f"Welcome to the doggo apis!"
        f"If you are here without using the doggo page, shame, shame!!"
        f"Here are the apis available:"
        f"    /temperaments returns only the temperaments"
        f"    /perfectPupper returns pups that contain specific temperaments"
    )


@app.route("/temperaments")
def temperaments():
    session = Session(engine)
    all_temps = []
    results = session.query(temper.temperament_id, temper.temperament_name).all()
    for id, name in results:
        temps = {}
        temps["name"] = name
        temps["id"] = id
        all_temps.append(temps)
    # Can be used to return only the name or name and id
    session.close()
    return jsonify(all_temps)


@app.route("/perfectpupper/<temp1>/<temp2>/<temp3>")
def perfectpup(temp1, temp2, temp3):
    conn = psycopg2.connect(
        host="localhost",
        database="Project_2",
        user="postgres",
        password="postgres")

    cur = conn.cursor()
    cur.execute(
        "select breed_name, min_height, max_height, min_weight, max_weight, min_life, max_life, group_name "
        "from breed b "
        "inner join breed_temperament bt on b.breed_id = bt.breed_id "
        "inner join temperament t on t.temperament_id = bt.temperament_id "
        "inner join groups g on b.group = g.group_id "
        f"where temperament_name in ('{temp1}', '{temp2}','{temp3}')")
    query_results = cur.fetchall()
    breed_results = []
    for name, minh, maxh, minw, maxw, minl, maxl, gname in query_results:
        temps = {}
        temps["name"] = name
        temps["minh"] = minh
        temps["maxh"] = maxh
        temps["minw"] = minw
        temps["maxw"] = maxw
        temps["min1"] = minl
        temps["maxl"] = maxl
        temps["gname"] = gname
        breed_results.append(temps)

    return jsonify(breed_results)

@app.route('/dog_breed_info')

def dog_breed_info():
    conn = psycopg2.connect(
        host="localhost",
        database="Project_2",
        user="postgres",
        password="postgres")

    drop_down_dog_breed = 'Alaskan Malamute'
    
    cur = conn.cursor()
    cur.execute(
        "SELECT * FROM breed"
        f"    WHERE breed.breed_name = '{drop_down_dog_breed}'"
    )
    dog_breed_selected = cur.fetchall()
    return jsonify(dog_breed_selected)
 

if __name__ == "__main__":
    app.run(debug=True)

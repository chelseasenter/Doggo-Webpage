from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from sqlalchemy.ext.automap import automap_base
import psycopg2

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

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
        "select breed_name, max_height, max_weight, group_name,\"Reference Image ID\" "
        "from dog_breed dog "
	"inner join breed b on dog.\"Breed_id\" = b.breed_id "
        "inner join breed_temperament bt on b.breed_id = bt.breed_id "
        "inner join temperament t on t.temperament_id = bt.temperament_id "
        "inner join groups g on b.group = g.group_id "
        f"where temperament_name in ('{temp1}', '{temp2}','{temp3}') "
	"and max_weight is not NULL and max_height is not null")
    query_results = cur.fetchall()
    breed_results = []
    for name, maxh, maxw, gname, image in query_results:
        temps = {}
        temps["name"] = name
        temps["maxh"] = maxh
        temps["maxw"] = maxw
        temps["gname"] = gname
        temps["image"] = image
        breed_results.append(temps)

    return jsonify(breed_results)

@app.route('/dog_breed_info/<breedSelection>')

def dog_breed_info(breedSelection):
    conn = psycopg2.connect(
        host="localhost",
        database="Project_2",
        user="postgres",
        password="postgres")
    
    cur = conn.cursor()
    cur.execute(
        "SELECT breed_name, max_height, max_weight, max_lifespan FROM breed"
        f"    WHERE breed.breed_name = '{breedSelection}'"
    )
    dog_breed_selected = cur.fetchall()
    breed_results = []
    for breedn, mheight, mweight, mlifespan in dog_breed_selected:
        temp = {}
        temp['name'] = breedn
        temp['mheight'] = mheight
        temp['mweight'] = mweight
        temp['mlifespan'] = mlifespan
        breed_results.append(temp)

    return jsonify(breed_results)
 

if __name__ == "__main__":
    app.run(debug=True)

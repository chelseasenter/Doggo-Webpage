from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from flask import Flask, jsonify
from sqlalchemy.ext.automap import automap_base

app = Flask(__name__)

rds_connection_string = "postgres:postgres@localhost:5432/Project_2"
engine = create_engine(f'postgresql://{rds_connection_string}')
Base = automap_base()

Base.prepare(engine, reflect=True)
temper = Base.classes.temperament
breed_temper = Base.classes.breed_temperament

@app.routs("/")
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
    temper_name = session.query(temper.temperament_name).all()
    for id, name in results:
        temps = {}
        temps["name"] = name
        temps["id"] = id
        all_temps.append(temps)
    # Can be used to return only the name or name and id
    session.close()
    return jsonify(temper_name)

@app.route("/perfectPupper")
def searchpups():
    session = Session(engine)
    puppers = session.query(breed_temper.breed).filter(breed_temper.temperament.in_([0,1,2,3]))
    return jsonify(puppers)



if __name__ == "__main__":
    app.run(debug=True)

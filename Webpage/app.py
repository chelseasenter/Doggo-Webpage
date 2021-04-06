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


@app.route("/")
def welcome():
    session = Session(engine)
    all_temps = []
    results = session.query(temper.temperament_id, temper.temperament_name).all()
    temper_name = session.query(temper.temperament_name).all()
    for id, name in results:
        temps = {}
        temps["name"] = name
        temps["id"] = id
        all_temps.append(temps)

    return jsonify(temper_name)

if __name__ == "__main__":
    app.run(debug=True)

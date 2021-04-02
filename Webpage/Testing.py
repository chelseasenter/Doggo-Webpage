from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine


rds_connection_string = "postgres:postgres@localhost:5432/Project_2"
engine = create_engine(f'postgresql://{rds_connection_string}')
session = Session(engine)
print(engine.table_names())

Base = automap_base()
Base.prepare(engine, reflect=True)
temper = Base.classes.temperament
results = session.query(temper.temperament_name).all()
print(results)


from flask import Flask, request, jsonify
from flask_cors import CORS
from sqlalchemy import Select, and_, desc, distinct, func, select
from models import db, Driver, Constructor, Circuit, Race, Result, Seasons, DriverStandings, ConstructorStandings, ConstructorResults  # Import additional tables as needed
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import event
from sqlalchemy.orm import sessionmaker
from flask import jsonify
from models import Driver, Result, Constructor, DriverStandings
from sqlalchemy import func, union_all
from sqlalchemy import literal_column
from sqlalchemy import func, over, desc

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:9963@localhost:3306/iit_db_10'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)

db.init_app(app)

with app.app_context():
    db.create_all()

# Create a new driver
@app.route('/driver', methods=['POST'])
def add_driver():
    data = request.get_json()
    new_driver = Driver(driverid=data['driverid'],name=data['name'], nationality=data['nationality'],drivercode=data['drivercode'],phonenumber=data['phonenumber'],email=data['email'], DOB=data['DOB'], constructorid = data['constructorid'], image = data['image'])
    db.session.add(new_driver)
    db.session.commit()
    return jsonify({'message': 'Driver added'}), 201

@app.route('/constructor', methods=['POST'])
def add_constructor():
    data = request.get_json()
    new_constructor = Constructor(constructorid=data['constructorid'],name=data['name'], nationality=data.get('nationality', ''), constructorref=data.get('constructorref', ''))
    db.session.add(new_constructor)
    db.session.commit()
    return jsonify({'message': 'Construtor added'}), 201

@app.route('/circuit', methods=['POST'])
def add_circuit():
    data = request.get_json()
    new_circuit = Circuit(circuitid=data['circuitid'],circuitname=data['circuitname'], location=data['location'], length=data['length'], country=data['country'], circuitref=data['circuitref'])
    db.session.add(new_circuit)
    db.session.commit()
    return jsonify({'message': 'Circuit added'}), 201

@app.route('/race', methods=['POST'])
def add_race():
    data = request.get_json()
    new_race = Race(raceid=data['raceid'],date=data['date'], year=data['year'], time=data['time'], lap=data['lap'], circuitid=data['circuitid'])
    db.session.add(new_race)
    db.session.commit()
    return jsonify({'message': 'Race added'}), 201

@app.route('/result', methods=['POST'])
def add_result():
    data = request.get_json()
    new_result = Result(resultsid=data['resultsid'],race_id=data['race_id'], driver_id=data['driver_id'], constructor_id=data['constructor_id'], points=data['points'], grid=data['grid'], RankR=data['RankR'], positionorder=data['positionorder'], position=data['position'])
    db.session.add(new_result)
    db.session.commit()
    return jsonify({'message': 'Result added'}), 201

@app.route('/season', methods=['POST'])
def add_season():
    data = request.get_json()
    new_season = Seasons(seasonid=data['seasonid'],Year=data['Year'])
    db.session.add(new_season)
    db.session.commit()
    return jsonify({'message': 'Seasons added'}), 201

@app.route('/driverstandings', methods=['POST'])
def add_driverstandings():
    data = request.get_json()
    new_driverstandings = DriverStandings(driverstandingsId=data['driverstandingsId'],raceid=data['raceid'], driverid=data['driverid'], wins=data['wins'], positions=data['positions'], points=data['points'])
    db.session.add(new_driverstandings)
    db.session.commit()
    return jsonify({'message': 'DriverStandings added'}), 201

@app.route('/constructorstandings', methods=['POST'])
def add_constructorstandings():
    data = request.get_json()
    new_constructorstandings = ConstructorStandings(ConstructorstandingsID=data['ConstructorstandingsID'],raceid=data['raceid'], constructorid=data['constructorid'], position=data['position'], points=data['points'], wins=data['wins'])
    db.session.add(new_constructorstandings)
    db.session.commit()
    return jsonify({'message': 'ConstructorStandings added'}), 201

@app.route('/constructoresults', methods=['POST'])
def add_constructorresults():
    data = request.get_json()
    new_constructorresults = ConstructorResults(customerResultsid=data['customerResultsid'],raceid=data['raceid'], Constructorid=data['Constructorid'], points=data['points'])
    db.session.add(new_constructorresults)
    db.session.commit()
    return jsonify({'message': 'ConstructorResults added'}), 201
#==========================================================
# Get all drivers
@app.route('/drivers', methods=['GET'])
def get_drivers():
    drivers = Driver.query.all()
    return jsonify([{'driverid': driver.driverid,'name': driver.name, 'nationality': driver.nationality, 'drivercode': driver.drivercode, 'phonenumber': driver.phonenumber, 'email': driver.email, 'DOB': driver.DOB, 'constructor_name': driver.constructor.name, 'image': driver.image} for driver in drivers]), 200

@app.route('/constructors', methods=['GET'])
def get_constructors():
    constructors = Constructor.query.all()
    return jsonify([{'constructorid': constructor.constructorid,'name': constructor.name, 'nationality': constructor.nationality, 'constructorref': constructor.constructorref, 'image': constructor.image} for constructor in constructors]), 200

@app.route('/circuits', methods=['GET'])
def get_circuit():
    circuits = Circuit.query.all()
    return jsonify([{'circuitid': circuit.circuitid,'circuitname': circuit.circuitname, 'location': circuit.location, 'length': circuit.length, 'country': circuit.country, 'circuitref': circuit.circuitref} for circuit in circuits]), 200

@app.route('/races', methods=['GET'])
def get_races():
    races = Race.query.all()
    return jsonify([{'raceid': race.raceid,'date': race.date, 'year': race.year, 'time': race.time, 'lap': race.lap, 'circuitid': race.circuitid} for race in races]), 200

@app.route('/results', methods=['GET'])
def get_results():
    results = Result.query.all()
    return jsonify([{'resultsid': result.resultsid,'race_id': result.race_id, 'driver_id': result.driver_id, 'constructor_id': result.constructor_id, 'points': result.points, 'grid': result.grid, 'RankR': result.RankR, 'positionorder': result.positionorder, 'position': result.position} for result in results]), 200

@app.route('/seasons', methods=['GET'])
def get_seasons():
    seasons = Seasons.query.all()
    return jsonify([{'seasonid': season.seasonid,'Year': season.Year} for season in seasons]), 200

@app.route('/driverstandings', methods=['GET'])
def get_driverstandings():
    driverstandings = DriverStandings.query.all()
    return jsonify([{'driverstandingsId': driverstanding.driverstandingsId,'raceid': driverstanding.raceid, 'driverid': driverstanding.driverid, 'wins': driverstanding.wins, 'positions': driverstanding.positions, 'points': driverstanding.points} for driverstanding in driverstandings]), 200

@app.route('/constructorstandings', methods=['GET'])
def get_constructorstandings():
    constructorstandings = ConstructorStandings.query.all()
    return jsonify([{'ConstructorstandingsID': constructorstanding.ConstructorstandingsID,'raceid': constructorstanding.raceid, 'constructorid': constructorstanding.constructorid, 'position': constructorstanding.position, 'points': constructorstanding.points, 'wins': constructorstanding.wins} for constructorstanding in constructorstandings]), 200

@app.route('/constructorresults', methods=['GET'])
def get_constructorresults():
    constructorresults = ConstructorResults.query.all()
    return jsonify([{'customerResultsid': constructorresult.customerResultsid,'raceid': constructorresult.raceid, 'Constructorid': constructorresult.Constructorid, 'points': constructorresult.points} for constructorresult in constructorresults]), 200

#......................................................................................................
#Set operations

@app.route('/race-and-pole-winners', methods=['GET'])
def get_race_and_pole_winners():
    race_winners = db.session.query(Result.driver_id).filter(Result.position == 1).subquery()
    pole_position_winners = db.session.query(Result.driver_id).filter(Result.grid == 1).subquery()
    
    combined_winners = db.session.query(Driver.name).filter(
        Driver.driverid.in_(race_winners) | 
        Driver.driverid.in_(pole_position_winners)
    ).group_by(Driver.driverid).all()

    winners_list = [{'driver_name': winner.name} for winner in combined_winners]
    return jsonify(winners_list)

#set membership

@app.route('/top-finishes/<string:driver_name>', methods=['GET'])
def get_top_finishes(driver_name):
    top_finishes_subquery = db.session.query(Result.race_id).join(Driver).filter(
        Driver.name == driver_name,
        Result.position.in_([1, 2, 3])
    ).subquery()

    top_finishes = db.session.query(Race).filter(
        Race.raceid.in_(top_finishes_subquery)
    ).all()

    races_list = [{'raceid': race.raceid, 'date': race.date, 'year': race.year} for race in top_finishes]
    return jsonify(races_list)

#SetComparision

@app.route('/drivers-never-won', methods=['GET'])
def get_drivers_never_won():
    winners_subquery = db.session.query(Result.driver_id).filter(Result.position == 1).subquery()
    
    non_winners = db.session.query(Driver).filter(
        ~Driver.driverid.in_(winners_subquery)
    ).all()

    drivers_list = [{'driver_name': driver.name} for driver in non_winners]
    return jsonify(drivers_list)

#WITH Clause

@app.route('/consistent-top-performers', methods=['GET'])
def get_consistent_top_performers():
    # CTE to calculate average finishing position for each driver
    avg_finishing_positions_cte = db.session.query(
        Result.driver_id,
        func.avg(Result.position).label('avg_position')
    ).group_by(Result.driver_id).cte('avg_finishing_positions')

    # Main query to find drivers whose average finishing position is below a certain threshold, e.g., 5
    top_performers = db.session.query(
        Driver.name,
        avg_finishing_positions_cte.c.avg_position
    ).join(avg_finishing_positions_cte, Driver.driverid == avg_finishing_positions_cte.c.driver_id)\
    .filter(avg_finishing_positions_cte.c.avg_position <= 5)\
    .order_by(avg_finishing_positions_cte.c.avg_position).all()

    performers_list = [{'driver_name': performer.name, 'avg_position': performer.avg_position} for performer in top_performers]
    return jsonify(performers_list)


#Roll up Driver and Constructor Performance Analysis

@app.route('/driver-constructor-performance', methods=['GET'])
def driver_constructor_performance():
    # First level of aggregation - Group by both Driver_Nationality and Constructor_Name
    first_level = db.session.query(
        Driver.nationality.label('Driver_Nationality'),
        Constructor.name.label('Constructor_Name'),
        func.sum(Result.points).label('Total_Points'),
        func.count(distinct(Result.driver_id)).label('Total_Drivers'),
        func.max(DriverStandings.wins).label('Total_Wins')
    ).join(Result, Driver.driverid == Result.driver_id) \
    .join(Constructor, Result.constructor_id == Constructor.constructorid) \
    .outerjoin(DriverStandings, (Result.race_id == DriverStandings.raceid) & (Result.driver_id == DriverStandings.driverid)) \
    .group_by(Driver.nationality, Constructor.name)
    
    second_level = db.session.query(
        Driver.nationality.label('Driver_Nationality'),
        literal_column('NULL').label('Constructor_Name'),  # Corrected usage of NULL
        func.sum(Result.points).label('Total_Points'),
        func.count(func.distinct(Result.driver_id)).label('Total_Drivers'),
        func.max(DriverStandings.wins).label('Total_Wins')
    ).join(Result, Driver.driverid == Result.driver_id) \
    .join(Constructor, Result.constructor_id == Constructor.constructorid) \
    .outerjoin(DriverStandings, (Result.race_id == DriverStandings.raceid) & (Result.driver_id == DriverStandings.driverid)) \
    .group_by(Driver.nationality)
    combined_query = union_all(first_level, second_level).alias()

    # Final query from the combined subqueries
    final_query = db.session.query(
        combined_query.c.Driver_Nationality,
        combined_query.c.Constructor_Name,
        combined_query.c.Total_Points,
        combined_query.c.Total_Drivers,
        combined_query.c.Total_Wins
    ).order_by(combined_query.c.Driver_Nationality, combined_query.c.Constructor_Name).all()

    return jsonify([{
        'Driver_Nationality': r.Driver_Nationality,
        'Constructor_Name': r.Constructor_Name or 'No Constructor',  # Replace NULL with 'Total'
        'Total_Points': r.Total_Points,
        'Total_Drivers': r.Total_Drivers,
        'Total_Wins': r.Total_Wins
    } for r in final_query])
    
#Podium for racers
@app.route('/frequent_podium_finishers', methods=['GET'])
def get_frequent_podium_finishers():
    frequent_podium_finishers = db.session.query(
        Driver.name, 
        func.count(Result.resultsid)
    ).join(Result, Driver.driverid == Result.driver_id)\
     .filter(Result.position <= 3)\
     .group_by(Driver.driverid)\
     .order_by(func.count(Result.resultsid).desc())\
     .limit(10)\
     .all()
    
    podium_finishers_list = [
        {'driver_name': name, 'podium_finishes_count': count}
        for name, count in frequent_podium_finishers
    ]
    
    return jsonify(podium_finishers_list)

#Consistent drivers
@app.route('/consistent-drivers', methods=['GET'])
def consistent_drivers():
    result = db.session.query(
        Driver.name.label('Driver_Name'),
        func.variance(Result.positionorder).label('Finishing_Position_Variance')
    ).join(Result, Driver.driverid == Result.driver_id) \
    .filter(Result.positionorder != None) \
    .group_by(Driver.name) \
    .order_by('Finishing_Position_Variance') \
    .all()

    return jsonify([r._asdict() for r in result])

from sqlalchemy import select

@app.route('/winnerswin', methods=['GET'])
def get_winners_with_1win():
    # Define a subquery to select driver IDs with more than 0 wins.
    subquery = select(DriverStandings.driverid).where(DriverStandings.wins > 0).subquery()

    # Define the main query to select driver names where the driver ID is in the subquery.
    query = select(Driver.name).where(Driver.driverid.in_(subquery))

    # Execute the query and fetch all results.
    results = db.session.execute(query).fetchall()

    # Return the list of names.
    return jsonify([row[0] for row in results])


#wINDOW fUCNTION
@app.route('/driver-points-over-season', methods=['GET'])
def driver_points_over_season():
    running_total_points = db.session.query(
        Driver.driverid,
        Driver.name.label('driver_name'),
        Race.year,
        Race.raceid,
        Result.points,
        func.sum(Result.points).over(
            partition_by=Driver.driverid,
            order_by=Race.date
        ).label('running_total')
    ).join(Result, Driver.driverid == Result.driver_id)\
    .join(Race, Result.race_id == Race.raceid)\
    .order_by(Race.year)\
    .all()

    # Serialize the data
    serialized_data = []
    for item in running_total_points:
        serialized_data.append({
            'driver_id': item.driverid,
            'driver_name': item.driver_name,
            'year': item.year,
            'race_id': item.raceid,
            'points': item.points,
            'running_total': item.running_total
        })

    return jsonify(serialized_data)

# aVERAGE POINTS FOR EACH DRIVER
@app.route('/driver-performance-analysis/<int:year>')
def driver_performance_analysis(year):
    results = db.session.query(
        Constructor.name.label('constructor'),
        Driver.name.label('driver'),
        Circuit.location.label('circuit_location'),
        func.avg(Result.points).label('avg_points')
    ).join(Result, Constructor.constructorid == Result.constructor_id)\
     .join(Driver, Result.driver_id == Driver.driverid)\
     .join(Race, Result.race_id == Race.raceid)\
     .join(Circuit, Race.circuitid == Circuit.circuitid)\
     .filter(Race.year == year)\
     .group_by(Constructor.name, Driver.name, Circuit.location)\
     .order_by(desc(func.avg(Result.points)))\
     .all()

    result_list = [{'constructor': row.constructor, 'driver': row.driver, 'circuit_location': row.circuit_location, 'avg_points': row.avg_points} for row in results]

    return jsonify(result_list)

@app.route('/driver-standings/<int:year>')
def driver_standings(year):
    query_results = db.session.query(Driver.name, func.sum(Result.points).label('total_points'))\
                              .join(Result, Driver.driverid == Result.driver_id)\
                              .join(Race, Result.race_id == Race.raceid)\
                              .join(Seasons, Race.year == Seasons.Year)\
                              .filter(Seasons.Year == year)\
                              .group_by(Driver.name)\
                              .order_by(desc('total_points'))\
                              .all()

    # Transform the query results into a list of dictionaries
    results = [{'name': row[0], 'total_points': row[1]} for row in query_results]

    return jsonify(results)
#................................................................................................................
@app.route('/drivers_with_points')
def get_drivers_with_points():
    # Group and sum the points for drivers with the same driverid
    results = (
        db.session.query(
            Driver.driverid,
            Driver.name,
            func.sum(DriverStandings.points).label('total_points'),
            Constructor.name.label('constructor_name'),
            Driver.nationality,
            Driver.image
        )
        .join(DriverStandings, Driver.driverid == DriverStandings.driverid)
        .join(Constructor, Driver.constructorid == Constructor.constructorid)
        .group_by(Driver.driverid, Driver.name, Constructor.name, Driver.nationality)
        .order_by(func.sum(DriverStandings.points).desc())
        .all()
    )

    formatted_results = []
    for driver_id, driver_name, total_points, constructor_name, driver_nationality, image in results:
        driver_data = {
            "driver_id": driver_id,
            "driver_name": driver_name,
            "points": total_points,
            "constructor_name": constructor_name,
            "driver_nationality": driver_nationality,
            "image": image,
        }
        formatted_results.append(driver_data)

    return jsonify(formatted_results)

@app.route('/constructors_with_drivers')
def get_constructors_with_drivers():
    # Your existing query code here...
    results = (
        db.session.query(
            Constructor.constructorid,  # Include constructorid
            Constructor.name,
            func.group_concat(Driver.name).label('drivers_list'),
            ConstructorStandings.points
        )
        .outerjoin(Driver, Constructor.constructorid == Driver.constructorid)
        .outerjoin(ConstructorStandings, Constructor.constructorid == ConstructorStandings.constructorid)
        .group_by(Constructor.constructorid, Constructor.name, ConstructorStandings.points)  # Include constructorid
        .order_by(desc(ConstructorStandings.points))
        .all()
    )

    constructor_points = {}  # Dictionary to store total points for each constructor

    for r in results:
        constructor_id = r[0]
        constructor_name = r[1]
        drivers = r[2].split(",") if r[2] else []
        points = r[3]

        if constructor_id not in constructor_points:
            constructor_points[constructor_id] = 0

        constructor_points[constructor_id] += points

    data = [{
        'constructorid': constructor_id,
        'constructor_name': constructor_name,
        'drivers': drivers,
        'points': points,
        'total_points': constructor_points[constructor_id]  # Add total points
    } for constructor_id, constructor_name, drivers, points in results]

    return jsonify(data)

@app.route('/constructors_with_points')
def get_constructors_with_points():
    # Group and sum the points for constructors with the same constructorid
    results = (
        db.session.query(
            Constructor.constructorid,
            Constructor.name,
            func.sum(ConstructorStandings.points).label('total_points')
        )
        .join(ConstructorStandings, Constructor.constructorid == ConstructorStandings.constructorid)
        .group_by(Constructor.constructorid, Constructor.name)
        .all()
    )

    data = [{
        'constructorid': r[0],
        'constructor_name': r[1],
        'total_points': r[2]
    } for r in results]

    return jsonify(data)

@app.route('/races1', methods=['GET'])
def get_race_data():
    # Get the selected year from the query parameters
    selected_year = request.args.get('year')

    if not selected_year:
        return jsonify({'error': 'Year parameter is missing'}), 400

    try:
        # Query race data for the selected year, including driver and constructor standings, and order by raceid
        race_data = (
            Race.query.filter_by(year=selected_year)
            .join(DriverStandings, Race.raceid == DriverStandings.raceid)
            .join(Driver, DriverStandings.driverid == Driver.driverid)
            .join(ConstructorStandings, and_(Race.raceid == ConstructorStandings.raceid,
                                             DriverStandings.constructorid == ConstructorStandings.constructorid))
            .join(Constructor, ConstructorStandings.constructorid == Constructor.constructorid)
            .with_entities(
                Race.raceid,
                Driver.name.label('driver_name'),
                DriverStandings.points.label('driver_points'),
                Constructor.name.label('constructor_name'),
                ConstructorStandings.points.label('constructor_points'),
            )
            .order_by(Race.raceid)  # Sort by raceid
            .all()
        )

        # Convert the query result into a list of dictionaries
        race_data_dict = [
            {
                'raceid': race.raceid,
                'driver_name': race.driver_name,
                'driver_points': race.driver_points,
                'constructor_name': race.constructor_name,
                'constructor_points': race.constructor_points,
            }
            for race in race_data
        ]

        return jsonify(race_data_dict)

    except Exception as e:
        return jsonify({'error': 'An error occurred while fetching race data'}), 500
    
@app.route('/results1', methods=['GET'])
def get_results_by_year():
    # Get the year from the query parameter
    year = request.args.get('year')

    if not year:
        return jsonify({"error": "Year is required"}), 400

    try:
        # Convert year to integer for comparison
        year_int = int(year)
    except ValueError:
        return jsonify({"error": "Year must be an integer"}), 400

    # Query for results that match the given year and include related driver and constructor names
    results = (db.session.query(Result, Driver.name.label('driver_name'), Constructor.name.label('constructor_name'))
               .join(Race)
               .join(Driver)
               .join(Constructor)
               .filter(Race.year == year_int)
               .order_by(Result.race_id)  # Sorting by race_id
               .all())

    # Serialize the results data
    results_data = []
    for result, driver_name, constructor_name in results:
        result_dict = {
            'resultsid': result.resultsid,
            'race_id': result.race_id,
            'driver_id': result.driver_id,
            'driver_name': driver_name,
            'constructor_id': result.constructor_id,
            'constructor_name': constructor_name,
            'points': result.points,
            'grid': result.grid,
            'position': result.position,
            # Add more fields from the Result model as needed
        }
        results_data.append(result_dict)

    # Return the JSON response
    return jsonify(results_data), 200

#============================================================================================================

# Update a driver
@app.route('/driver/<int:id>', methods=['PUT'])
def update_driver(id):
    driver = Driver.query.get_or_404(id)
    data = request.get_json()
    driver.name = data.get('name', driver.name)
    driver.nationality = data.get('nationality', driver.nationality)
    db.session.commit()
    return jsonify({'message': 'Driver updated'}), 200

def update_standings(target):
    # Start a session 
    Session = sessionmaker(bind=db.engine)
    session = Session()

    # Update DriverStandings
    driver_standing = session.query(DriverStandings).filter_by(driverid=target.driver_id, raceid=target.race_id).first()
    if driver_standing:
        driver_standing.points += target.points
        driver_standing.positions = target.positionorder  # Assuming you want to update this
        # Handle wins and other fields as necessary
    else:
        # Create a new DriverStandings record if one does not exist
        new_driver_standing = DriverStandings(
            driverid=target.driver_id,
            raceid=target.race_id,
            points=target.points,
            positions=target.positionorder,
            wins=1 if target.position == 1 else 0,   
            # Set wins and other fields as necessary
        )
        session.add(new_driver_standing)

    # Update ConstructorStandings
    constructor_standing = session.query(ConstructorStandings).filter_by(constructorid=target.constructor_id, raceid=target.race_id).first()
    if constructor_standing:
        constructor_standing.points += target.points
        constructor_standing.position = target.positionorder  # Assuming you want to update this
        # Handle wins and other fields as necessary
    else:
        # Create a new ConstructorStandings record if one does not exist
        new_constructor_standing = ConstructorStandings(
            constructorid=target.constructor_id,
            raceid=target.race_id,
            points=target.points,
            position=target.positionorder,
            # Set wins and other fields as necessary
        )
        session.add(new_constructor_standing)

    # Commit the changes
    try:
        session.commit()
    except Exception as e:
        session.rollback()
        raise e
    finally:
        session.close()

# Event listeners for insert and update on Result table
def result_insert_listener(mapper, connection, target):
    update_standings(target)

def result_update_listener(mapper, connection, target):
    update_standings(target)

# Listen for insert and update events
event.listen(Result, 'after_insert', result_insert_listener)
# event.listen(Result, 'after_update', result_update_listener)

#=================================================================================================
# Delete a driver
@app.route('/driver/<int:id>', methods=['DELETE'])
def delete_driver(id):
    driver = Driver.query.get_or_404(id)
    db.session.delete(driver)
    db.session.commit()
    return jsonify({'message': 'Driver deleted'}), 200

# You can add similar routes for Team, Circuit, Race, Result

if __name__ == '__main__':
    app.run(debug=True)
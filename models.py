from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Driver(db.Model):
    __tablename__ = 'drivers'
    driverid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    nationality = db.Column(db.String(100))
    drivercode = db.Column(db.Integer)
    phonenumber = db.Column(db.Integer)
    email = db.Column(db.String(100))
    DOB = db.Column(db.Integer)
    constructorid = db.Column(db.Integer, db.ForeignKey('constructors.constructorid'))
    image = db.Column(db.String(255))
    constructor = db.relationship('Constructor', backref=db.backref('drivers',lazy=True))
    
class Constructor(db.Model):
    __tablename__ = 'constructors'
    constructorid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    nationality = db.Column(db.String(100))
    constructorref = db.Column(db.String(100))
    image = db.Column(db.String(255))

class Circuit(db.Model):
    __tablename__ = 'circuits'
    circuitid = db.Column(db.Integer, primary_key=True)
    circuitname = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100))
    length = db.Column(db.Integer)
    country = db.Column(db.String(100))
    circuitref = db.Column(db.String(100))

class Race(db.Model):
    __tablename__ = 'races'
    raceid = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date)
    year = db.Column(db.Integer)
    time = db.Column(db.String)
    lap = db.Column(db.Integer)
    circuitid = db.Column(db.Integer, db.ForeignKey('circuits.circuitid'))
    circuit = db.relationship('Circuit', backref=db.backref('races', lazy=True))

class Result(db.Model):
    __tablename__ = 'results'
    resultsid = db.Column(db.Integer, primary_key=True)
    race_id = db.Column(db.Integer, db.ForeignKey('races.raceid'))
    driver_id = db.Column(db.Integer, db.ForeignKey('drivers.driverid'))
    constructor_id = db.Column(db.Integer, db.ForeignKey('constructors.constructorid'))
    points = db.Column(db.Integer)
    grid = db.Column(db.Integer)
    RankR = db.Column(db.Integer)
    positionorder = db.Column(db.Integer)
    position = db.Column(db.Integer)
    race = db.relationship('Race', backref=db.backref('results', lazy=True))
    driver = db.relationship('Driver', backref=db.backref('results', lazy=True))
    constructor = db.relationship('Constructor', backref=db.backref('results', lazy=True))
    
class Seasons(db.Model):
    __tablename__ = 'seasons'
    seasonid = db.Column(db.Integer, primary_key=True)
    Year = db.Column(db.Integer)
    
class DriverStandings(db.Model):
    __tablename__ = 'driverstandings'
    driverstandingsId = db.Column(db.Integer, primary_key=True)
    raceid = db.Column(db.Integer, db.ForeignKey('races.raceid'))
    driverid = db.Column(db.Integer, db.ForeignKey('drivers.driverid'))
    wins = db.Column(db.Integer)
    positions = db.Column(db.Integer)
    points = db.Column(db.Integer)
    race = db.relationship('Race', backref=db.backref('driverstandings', lazy=True))
    driver = db.relationship('Driver', backref=db.backref('driverstandings', lazy=True))
    
class ConstructorStandings(db.Model):
    __tablename__ = 'constructorstandings'
    ConstructorstandingsID = db.Column(db.Integer, primary_key=True)
    raceid = db.Column(db.Integer, db.ForeignKey('races.raceid'))
    constructorid = db.Column(db.Integer, db.ForeignKey('constructors.constructorid'))
    position = db.Column(db.Integer)
    points = db.Column(db.Integer)
    wins = db.Column(db.Integer)
    race = db.relationship('Race', backref=db.backref('constructorstandings', lazy=True))
    constructor = db.relationship('Constructor', backref=db.backref('constructorstandings', lazy=True))
    
class ConstructorResults(db.Model):
    __tablename__ = 'constructorresults'
    customerResultsid = db.Column(db.Integer, primary_key=True)
    raceid = db.Column(db.Integer, db.ForeignKey('races.raceid'))
    Constructorid = db.Column(db.Integer, db.ForeignKey('constructors.constructorid'))
    points = db.Column(db.Integer)
    race = db.relationship('Race', backref=db.backref('constructorresults', lazy=True))
    constructor = db.relationship('Constructor', backref=db.backref('constructorresults', lazy=True))

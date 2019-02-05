""""
Creating the apis for all routes of the politico project
"""
from flask import Flask, jsonify, request

app = Flask(__name__)
app.config["DEBUG"] = True

# creating political parties
POLITICAL_PARTIES = [
    {
        'id': 1,
        'full_name': 'Amani National Coalition',
        'code': 'ANC',
        'slogan': 'Amani kwa wote',
        'logo': 'amani.png'
    },
    {
        'id': 2,
        'full_name': 'National Super Alliance',
        'code': 'NASA',
        'slogan': 'Tuko mbele pamoja',
        'logo': 'nasa.png'
    },
    {
        'id': 3,
        'full_name': 'Jubilee Party',
        'code': 'Jubilee',
        'slogan': 'Tuko pamoja',
        'logo': 'jubilee.png'
    },
    {
        'id': 4,
        'full_name': 'Kenya African National Union',
        'code': 'KANU',
        'slogan': 'KANU fresh',
        'logo': 'kanu.png'
    }
]

# Creating political offices
POLITICAL_OFFICES = [
    {
        'id': 1,
        'name': 'President',
        'level': 'National'
    },
    {
        'id': 2,
        'name': 'Governor',
        'level': 'County'
    },
    {
        'id': 3,
        'name': 'Senator',
        'level': 'County'
    },
    {
        'id': 4,
        'name': 'Women Representative',
        'level': 'County'
    }
]

###################### -----POLITICAL PARTIES ROUTES ----- ##################


@app.route('/api/v1/political_parties/all', methods=['GET'])
def parties_all():
    """function to retrieve all political parties"""
    return jsonify(POLITICAL_PARTIES)


@app.route('/api/v1/political_parties', methods=['GET'])
def parties_id():
    """function to retrieve a specific political party"""
    # Check if an ID was provided as part of the URL.
    # If ID is provided, assign it to a variable.
    # If no ID is provided, display an error in the browser.
    if 'id' in request.args:
        id = int(request.args['id'])
    else:
        return "Error: No id field provided. Please specify an id."

    # Create an empty list for our results
    results = []

    # Loop through the data and match results that fit the requested ID.
    # IDs are unique, but other fields might return many results
    for party in POLITICAL_PARTIES:
        if party['id'] == id:
            results.append(party)

    # Use the jsonify function from Flask to convert our list of
    # Python dictionaries to the JSON format.
    return jsonify(results)


@app.route('/api/v1/political_parties', methods=['POST'])
def create_party():
    """ Creating a political party"""
    party = {'code': request.json['code'],
             'full_name': request.json['full_name'],
             'id': len(POLITICAL_PARTIES) + 1,
             'logo': request.json['logo'],
             'slogan': request.json['slogan']}
    POLITICAL_PARTIES.append(party)
    return jsonify(POLITICAL_PARTIES)
    # return make_response(jsonify({"status": "OK", "message": "I am {}".format(full_name)}))
    # msg = "the name is " + full_name
    # return msg


@app.route('/api/v1/political_parties', methods=['PUT'])
def edit_party():
    """ Editing a political party"""
    if 'id' in request.args:
        id = int(request.args['id'])
    else:
        return "Error: No id field provided. Please specify an id."
    for party in POLITICAL_PARTIES:
        if party['id'] == id:
            if request.json['code']:
                party['code'] = request.json['code']
            elif request.json['full_name']:
                party['full_name'] = request.json['full_name']
            elif request.json['logo']:
                party['logo'] = request.json['logo']
            elif request.json['slogan']:
                party['slogan'] = request.json['slogan']

    # political_parties.append(party)
    return jsonify(POLITICAL_PARTIES)


@app.route('/api/v1/political_parties', methods=['DELETE'])
def delete_party():
    """ Deleting a political party"""
    if 'id' in request.args:
        id = int(request.args['id'])
    else:
        return "Error: No id field provided. Please specify an id."
    for party in POLITICAL_PARTIES:
        if party['id'] == id:
            POLITICAL_PARTIES.remove(party)

    # political_parties.append(party)
    return jsonify(POLITICAL_PARTIES)


###################### -----POLITICAL OFFICES ROUTES ----- ##################


@app.route('/api/v1/political_offices/all', methods=['GET'])
def offices_all():
    """function to retrieve all political offices"""
    return jsonify(POLITICAL_OFFICES)


@app.route('/api/v1/political_offices', methods=['GET'])
def offices_id():
    """ Getting office by id"""
    # Check if an ID was provided as part of the URL.
    # If ID is provided, assign it to a variable.
    # If no ID is provided, display an error in the browser.
    if 'id' in request.args:
        id = int(request.args['id'])
    else:
        return "Error: No id field provided. Please specify an id."

    # Create an empty list for our results
    results = []

    # Loop through the data and match results that fit the requested ID.
    # IDs are unique, but other fields might return many results
    for office in POLITICAL_OFFICES:
        if office['id'] == id:
            results.append(office)

    # Use the jsonify function from Flask to convert our list of
    # Python dictionaries to the JSON format.
    return jsonify(results)


@app.route('/api/v1/political_offices', methods=['POST'])
def create_office():
    """ Creating a political office"""
    office = {'id': len(POLITICAL_OFFICES) + 1,
              'level': request.json['level'],
              'name': request.json['name']
              }
    POLITICAL_OFFICES.append(office)
    return jsonify(POLITICAL_OFFICES)


app.run()

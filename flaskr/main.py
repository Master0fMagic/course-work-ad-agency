from flask import Flask, request, abort, jsonify
from flask_cors import CORS

from setup import init_app
from clientService import ClientService
from orderService import OrderService
from agencyService import AgencyService
from flask_login import login_user, logout_user, login_required, current_user
import error
import dto

app = Flask(__name__)
cors = CORS(app, resources={r"*": {"origins": "*", "supports_credentials": "true"}})
init_app(app)


@app.route('/api/login', methods=['POST'])
def login():
    """
    takes json: {
    "login":"user_email_or_phone_number",
    "password":"user_password"
    }

    creates user session
    :return: success or error
    """
    userdata = request.json['login']
    password = request.json['password']

    if not (userdata and password):
        abort(400, 'required field empty')

    cs = ClientService()
    try:
        user = cs.login(userdata, password)
        login_user(user)
    except (error.UseNotFoundException, error.WrongPasswordException) as er:
        abort(401, er.description)

    return jsonify(success=True)


@app.route('/api/logout')
@login_required
def logout():
    """
       ends user session
       :return: 200 ok
    """
    logout_user()
    return jsonify(success=True)


@app.route('/api/sing-up', methods=['POST'])
def sing_up():
    """
       takes json: {
       "email":"",  //field does not required
       "password":"",
       "repeated_password":"",
       "first_name":"",
       "last_name":"",
       "phone":"",
       }

       create new user and login him
       :return: success or error
       """
    email = request.json.get('email')
    password = request.json.get('password')
    repeated_password = request.json.get('repeated_password')
    first_name = request.json.get('first_name')
    last_name = request.json.get('last_name')
    phone = request.json.get('phone')

    print(email)

    if not (password and repeated_password and first_name and last_name and phone):
        abort(400, 'missing required fields')

    if password != repeated_password:
        abort(400, 'passwords does not match')

    cs = ClientService()
    client = cs.register_new_user(first_name, last_name, phone, password, email)
    login_user(client)
    return jsonify(success=True)


@app.route('/api/order/agency')
def get_agency_list():
    """
        returns list of agencies to order advertising
       :return:  json: {
        "places": [
            {
            "address": "",
            "id": 1,
            "name": ""
            }
        ]
       }
    """
    fs = AgencyService()
    return {
        'places': [place.to_dict() for place in fs.get_agency_list()]
    }


@app.route('/api/order/service/<int:agency_id>')
def get_service_by_place(agency_id: int):
    """
   :return:  json: {
    "data": [
        {
            "description": "",
            "id": 1,
            "name": "",
            "price": 125.0
        }
    ]
   }
    """

    fs = AgencyService()
    return {
        'data': [menu.to_dict() for menu in fs.get_product_list_by_agency(agency_id)]
    }


@app.route('/api/order/create', methods=['POST'])
@login_required
def create_order():
    """
       takes json: {
       "agency_id":<id of food place>,
       "items": [
            {
            "service_id": <id of service item>,
            "count": <count>
            }
       ]
       }
    """

    os = OrderService()
    order_items = [
        dto.OrderItem(dto.Service(product_id=item['service_id'], name='', description='', price=0), amount=item['count'])
        for item in request.json['items']]

    if not order_items:
        abort(400, 'Empty order received')

    agency = request.json['agency_id']
    if not agency:
        abort(400, 'agency is required')

    os.create_new_order(current_user.id, agency, order_items)
    return jsonify(success=True)


@app.route('/api/order/history')
@login_required
def get_order_history():
    """
    :return: json: {
    "history": [
        {
            "created_time": 1655148281,
            "id": 6,
            "agency": "",
            "sum": 827.0
        }
    ]
    }
    """
    os = OrderService()
    return {
        'history': [item.to_dict() for item in os.get_short_orders_by_user(current_user.id)]
    }


@app.route('/api/order/history/<int:order_id>')
@login_required
def get_order_details(order_id: int):
    """
    :param order_id:

    :return: json: {
    "items":[
       {
        "amount": 2,
        "service": "",
        "service_price": 125.0
        }
    ]
    }
    """
    os = OrderService()
    return {
        'details': [item.to_dict() for item in os.get_full_order(order_id)]
    }


app.run()

from flask_login import UserMixin


class Client(UserMixin):
    def __init__(self, client_id=-1, firstname="", lastname="", email="", phone_number="", password=""):
        self._firstname = firstname
        self._lastname = lastname
        self._password = password
        self._email = email
        self._phone_number = phone_number
        self._id = client_id

    @property
    def firstname(self) -> str:
        return self._firstname

    @property
    def id(self) -> int:
        return self._id

    @property
    def lastname(self) -> str:
        return self._lastname

    @property
    def password(self) -> str:
        return self._password

    @property
    def email(self) -> str:
        return self._email

    @property
    def phone_number(self) -> str:
        return self._phone_number


class FoodPlace:
    def __init__(self, place_id: int, name: str, address: str):
        self._id = place_id
        self._name = name
        self._address = address

    @property
    def id(self) -> int:
        return self._id

    @property
    def name(self) -> str:
        return self._name

    @property
    def address(self) -> str:
        return self._address

    def to_dict(self):
        return {
            'id': self._id,
            'name': self._name,
            'address': self._address
        }


class Product:
    def __init__(self, product_id: int, name: str, description, price: float):
        self._id = product_id
        self._name = name
        self._description = description
        self._price = price

    @property
    def id(self) -> int:
        return self._id

    @property
    def name(self) -> str:
        return self._name

    @property
    def description(self) -> str:
        return self._description

    @property
    def price(self) -> float:
        return self._price

    def to_dict(self) -> dict:
        return {
            'id': self._id,
            'name': self._name,
            'description': self._description,
            'price': self._price
        }


class OrderItem:
    def __init__(self, product: Product, amount: int):
        self._product = product
        self._amount = amount

    @property
    def product(self) -> Product:
        return self._product

    @property
    def amount(self) -> int:
        return self._amount

    def to_dict(self):
        return {
            "product": self._product.name,
            "amount": self._amount,
            "product_price": self._product.price
        }


class Order:
    def __init__(self, order_id: int, created_time: int, is_delivered: bool, client_id: int, place: int,
                 order_sum: float):
        self._id = order_id
        self._created_time = created_time
        self._is_delivered = bool(is_delivered)
        self._client_id = client_id
        self._place = place
        self._sum = order_sum

    @property
    def id(self) -> int:
        return self._id

    @property
    def created_time(self) -> int:
        return self._created_time

    @property
    def is_delivered(self) -> bool:
        return self._is_delivered

    @property
    def client_id(self) -> int:
        return self._client_id

    @property
    def place(self) -> int:
        return self._place

    @property
    def sum(self) -> float:
        return self._sum

    def to_dict(self):
        return {
            'id': self._id,
            'created_time': self._created_time,
            'is_delivered': self._is_delivered,
            'place': self._place,
            'sum': self._sum
        }

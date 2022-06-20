from abc import ABC, abstractmethod
import dto
import provider


class AbstractOrderService(ABC):
    _provider: provider.AbstractOrderProvider

    @abstractmethod
    def get_full_order(self, order_id) -> dto.Order:
        pass

    @abstractmethod
    def get_short_orders_by_user(self, client_id: int) -> list[dto.Order]:
        pass

    @abstractmethod
    def create_new_order(self, client_id: int, food_place_id: int, order_items: list[dto.OrderItem]):
        pass

    @abstractmethod
    def complete(self, order_id: id) -> None:
        pass


class OrderService(AbstractOrderService):
    def __init__(self):
        self._provider = provider.SqliteDataProvider.get_provider()

    def get_full_order(self, order_id) -> list[dto.OrderItem]:
        return self._provider.get_order_items(order_id)

    def get_short_orders_by_user(self, client_id: int) -> list[dto.Order]:
        return self._provider.get_short_order_info_by_client(client_id)

    def create_new_order(self, client_id: int, food_place_id: int, order_items: list[dto.OrderItem]):
        if client_id == '' \
                or food_place_id < 0 \
                or not order_items:
            raise ValueError('Input params must not be empty')
        self._provider.create_order(client_id, food_place_id, order_items)

    def complete(self, order_id: id) -> None:
        self._provider.complete_order(order_id)

from abc import ABC, abstractmethod
import provider
import dto


class AbstractFoodService(ABC):
    _provider: provider.AbstractFoodProvider

    @abstractmethod
    def get_food_place_list(self) -> list[dto.FoodPlace]:
        pass

    @abstractmethod
    def get_product_list_by_food_place(self, place_id: int) -> list[dto.Product]:
        pass


class FoodService(AbstractFoodService):
    def __init__(self):
        self._provider = provider.SqliteDataProvider.get_provider()

    def get_food_place_list(self) -> list[dto.FoodPlace]:
        return self._provider.get_food_place_list()

    def get_product_list_by_food_place(self, place_id: int) -> list[dto.Product]:
        return self._provider.get_product_by_food_place(place_id)

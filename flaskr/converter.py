from abc import ABC, abstractmethod
import dto


class AbstractConverter(ABC):
    @abstractmethod
    def convert(self, **kwargs):
        pass


class DbResponseToClientConverter(AbstractConverter):

    def convert(self, **kwargs):
        """
        kwargs:
            data: list|set|tuple with db result
        """

        if 'data' not in kwargs:
            raise KeyError('"data" is not present in kwargs')

        return dto.Client(*kwargs['data'])


class DbResponseToOrderConverter(AbstractConverter):
    def convert(self, **kwargs):
        """
        kwargs:
            data: list|set|tuple with db result
        """

        if 'data' not in kwargs:
            raise KeyError('"data" is not present in kwargs')

        return dto.Order(*kwargs['data'])


class DbResponseToProductConverter(AbstractConverter):
    def convert(self, **kwargs):
        """
        kwargs:
            data: list|set|tuple with db result
        """

        if 'data' not in kwargs:
            raise KeyError('"data" is not present in kwargs')

        return dto.Product(*kwargs['data'])


class DbResponseToOrderItemConverter(AbstractConverter):
    def convert(self, **kwargs):
        """
        kwargs:
            data: list|set|tuple with db result
        """

        if 'data' not in kwargs:
            raise KeyError('"data" is not present in kwargs')

        product = DbResponseToProductConverter().convert(data=kwargs['data'][1:])
        return dto.OrderItem(product, kwargs['data'][0])


class DbResponseToFoodPlaceConverter(AbstractConverter):
    def convert(self, **kwargs):
        """
        kwargs:
            data: list|set|tuple with db result
        """

        if 'data' not in kwargs:
            raise KeyError('"data" is not present in kwargs')

        return dto.FoodPlace(*kwargs['data'])

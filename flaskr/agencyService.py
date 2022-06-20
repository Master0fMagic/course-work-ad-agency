from abc import ABC, abstractmethod
import provider
import dto


class AbstractAgencyService(ABC):
    _provider: provider.AbstractAgencyProvider

    @abstractmethod
    def get_agency_list(self) -> list[dto.Agency]:
        pass

    @abstractmethod
    def get_product_list_by_agency(self, place_id: int) -> list[dto.Service]:
        pass


class AgencyService(AbstractAgencyService):
    def __init__(self):
        self._provider = provider.SqliteDataProvider.get_provider()

    def get_agency_list(self) -> list[dto.Agency]:
        return self._provider.get_agency_list()

    def get_product_list_by_agency(self, agency_id: int) -> list[dto.Service]:
        return self._provider.get_product_by_agency(agency_id)
